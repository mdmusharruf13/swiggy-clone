import { act, useEffect, useRef, useState } from "react";

export default function Filters({
  filterData,
  filterNames,
  setFilterNames,
  setLastFilterAdded,
  setLastFilterRemoved,
}) {
  const [nonFiltered, setNonFiltered] = useState([]);
  const [allData, setAllData] = useState(null);

  useEffect(() => {
    let newData = filterData.map((item, i) => ({
      ...item,
      ["index"]: i,
    }));
    setAllData(newData);
    setNonFiltered(newData);
  }, [filterData]);

  useEffect(() => {
    console.log("filterNames: ", filterNames);
  }, [filterNames]);

  useEffect(() => {
    console.log("nonFiltered: ", nonFiltered);
  }, [nonFiltered]);

  // useEffect(() => {
  //   if (data) {
  //     let newData = [];
  //     data.forEach((item) => {
  //       item.facetInfo.length === 3
  //         ? newData.push({
  //             ...item,
  //             facetInfo: item.facetInfo.slice(0, 1),
  //           }) && newData.push({ ...item, facetInfo: item.facetInfo.slice(2) })
  //         : item.facetInfo.length <= 2 &&
  //           newData.push({ ...item, facetInfo: item.facetInfo.slice(0, 1) });
  //     });
  //     setFilter(newData);
  //     console.log("setFilter data");
  //   }
  // }, [data]);
  // console.log("filter rendered");
  return (
    <>
      <div className="flex gap-4 text-sm text-gray-600 ">
        <div className="border border-gray-400 rounded-full cursor-pointer shadow-md py-1.5 px-3 min-w-fit">
          <div className="flex gap-2 items-center">
            {filterNames && Object.keys(filterNames).length ? (
              <span className="bg-orange-500 rounded-full w-5 text-center text-white font-bold">
                {Object.keys(filterNames).length}
              </span>
            ) : null}
            <span>Filter</span>
            <i className="fi fi-rs-settings-sliders flex"></i>
          </div>
        </div>
        <div className="border border-gray-400 rounded-full cursor-pointer shadow-md py-1.5 px-3 min-w-fit">
          <div className="flex items-center gap-2">
            Sort By <i className="fi fi-sr-angle-small-down flex"></i>
          </div>
        </div>

        {(filterNames
          ? [...filterNames, ...nonFiltered]
          : allData
          ? allData
          : []
        ).map(
          (item) =>
            item.facetInfo.length <= 3 && (
              <div
                key={item.id}
                className="flex items-center min-w-fit border border-gray-400 rounded-full cursor-pointer shadow-md"
              >
                <FilterBtn
                  btnData={item}
                  setFilterNames={setFilterNames}
                  setLastFilterAdded={setLastFilterAdded}
                  setLastFilterRemoved={setLastFilterRemoved}
                  setNonFiltered={setNonFiltered}
                />
              </div>
            )
        )}
      </div>
    </>
  );
}

function FilterBtn({
  btnData,
  setFilterNames,
  setLastFilterAdded,
  setLastFilterRemoved,
  setNonFiltered,
}) {
  const [active, setActive] = useState(false);
  const btnRef = useRef(null);

  const handleClick = (btnData) => {
    if (!active) {
      btnRef &&
        (btnRef.current.parentElement.style.background = "rgb(204, 214, 217)");
      setLastFilterAdded(btnData);
      setFilterNames((prev) => {
        return [...prev, btnData];
      });
      setNonFiltered((prev) => prev.filter((item) => item.id !== btnData.id));
    } else {
      btnRef && (btnRef.current.parentElement.style.background = "white");
      setLastFilterRemoved(btnData);
      setNonFiltered((prev) => [...prev, btnData]);
      setFilterNames((prev) => prev.filter((item) => item.id !== btnData.id));
    }

    setActive(!active);
  };

  return btnData.facetInfo && btnData.facetInfo.length <= 3 ? (
    <p
      className={`flex items-center gap-1.5 px-2.5 py-1`}
      onClick={() => handleClick(btnData)}
      ref={btnRef}
    >
      {btnData.facetInfo[0]?.label}
      <span>
        {active && <i className="fi fi-sr-cross-small text-lg flex"></i>}
      </span>
    </p>
  ) : null;
}
