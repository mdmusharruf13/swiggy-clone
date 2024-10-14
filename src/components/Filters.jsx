import { act, useEffect, useRef, useState } from "react";

export default function Filters({
  filterData,
  filterNames,
  setFilterNames,
  setLastFilterAdded,
  setLastFilterRemoved,
}) {
  // const [filter, setFilter] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(filterData);
  }, [filterData]);

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
        {data
          ? data.map(
              (item) =>
                item.facetInfo.length <= 3 && (
                  <div
                    key={item.facetInfo[0].id}
                    className="flex items-center min-w-fit border border-gray-400 rounded-full cursor-pointer shadow-md"
                  >
                    <FilterBtn
                      btnData={item.facetInfo}
                      setFilterNames={setFilterNames}
                      setLastFilterAdded={setLastFilterAdded}
                      setLastFilterRemoved={setLastFilterRemoved}
                    />
                  </div>
                )
            )
          : null}
      </div>
    </>
  );
}

function FilterBtn({
  btnData,
  setFilterNames,
  setLastFilterAdded,
  setLastFilterRemoved,
}) {
  const [active, setActive] = useState(false);
  const btnRef = useRef(null);

  const handleClick = (label) => {
    // if (btnRef) {
    //   btnRef.current.parentElement.style.background = "rgb(204, 214, 217)";
    // }
    if (!active) {
      setLastFilterAdded(label);
      if (btnRef) {
        btnRef.current.parentElement.style.background = "rgb(204, 214, 217)";
      }
    } else {
      setLastFilterRemoved(label);
      if (btnRef) {
        btnRef.current.parentElement.style.background = "white";
      }
    }
    setFilterNames((prev) => {
      if (prev?.[label] === label) {
        delete prev?.[label];
        return { ...prev };
      }
      return { ...prev, [label]: label };
    });
    setActive(!active);
  };
  return btnData && btnData.length <= 3 ? (
    <p
      className={`flex items-center gap-1.5 px-2.5 py-1`}
      onClick={() => handleClick(btnData[0].label)}
      ref={btnRef}
    >
      {btnData[0]?.label}
      <span>
        {active && <i className="fi fi-sr-cross-small text-lg flex"></i>}
      </span>
    </p>
  ) : null;
}
