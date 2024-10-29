import { useEffect, useRef, useState } from "react";

const IMG_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export default function MenuCard({ restaurant, width }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(restaurant?.info);
    // console.log(restaurant?.info);
  }, [restaurant]);

  return (
    <div>
      {data ? (
        <div className="m-1 hover:scale-95 duration-100 cursor-pointer">
          <div
            className={`h-[185px] rounded-2xl relative shadow-lg`}
            style={{ width: `${width ? 260 : 280}px` }}
          >
            <img
              src={`${IMG_URL}${data?.cloudinaryImageId}`}
              alt={`${data?.name}`}
              className="w-full h-full rounded-2xl object-cover"
            />

            <div className="w-full h-full absolute bottom-0 rounded-2xl bg-gradient-to-t from-black from-1% to-transparent to-40%"></div>
            {data?.aggregatedDiscountInfoV3 ? (
              <p className="text-xl font-extrabold text-white absolute bottom-1 left-2">{`${
                data?.aggregatedDiscountInfoV3?.header
              } ${
                data?.aggregatedDiscountInfoV3?.subHeader
                  ? data?.aggregatedDiscountInfoV3?.subHeader
                  : ""
              }`}</p>
            ) : null}
          </div>
          <div
            className={`p-1 min-h-[92px] h-fit`}
            style={{ width: `${width ? 260 : 280}px` }}
          >
            <div className="font-bold text-lg">
              <p className="">
                {data.name.length > 27
                  ? data.name.slice(0, 25) + "..."
                  : data.name}
              </p>
            </div>
            <div className="flex gap-1 items-center font-bold">
              <i className="fi fi-ss-circle-star text-green-600 "></i>
              <span>{data.avgRatingString}</span>
              <i className="fi fi-sr-bullet text-xs"></i>
              <span>{data.sla.slaString}</span>
            </div>
            <div className="text-gray-800">
              <p>
                {data.cuisines.join(", ").length > 31
                  ? data.cuisines.join(", ").slice(0, 31) + "..."
                  : data.cuisines.join(", ")}
              </p>
            </div>
            <div className="text-gray-800">
              <p>{data.areaName}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col m-1 w-[280px] rounded-2xl">
          <div className="w-full h-[185px] bg-slate-200 inline rounded-2xl"></div>
          <div className="w-full h-[92px] bg-slate-100 inline"></div>
        </div>
      )}
    </div>
  );
}
