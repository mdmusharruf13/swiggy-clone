import { useEffect, useState } from "react";

export default function Filters({ filterData }) {
  // const [filter, setFilter] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(filterData?.card?.card?.facetList);
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

  return (
    <>
      <div className="flex gap-4 text-sm text-gray-600 ">
        <div className="border border-black rounded-full cursor-pointer shadow-md py-1 px-2.5 min-w-fit">
          Filter
        </div>
        <div className="border border-black rounded-full cursor-pointer shadow-md py-1 px-2.5 min-w-fit">
          Sort By
        </div>
        {data
          ? data.map(
              (item) =>
                item.facetInfo.length <= 3 && (
                  <div
                    key={item.facetInfo[0].id}
                    className="min-w-fit border border-black rounded-full cursor-pointer shadow-md py-1 px-2.5"
                  >
                    <FilterBtn btnData={item.facetInfo} />
                  </div>
                )
            )
          : null}
      </div>
    </>
  );
}

function FilterBtn({ btnData }) {
  return btnData && btnData.length <= 3 ? <p>{btnData[0]?.label}</p> : null;
}
