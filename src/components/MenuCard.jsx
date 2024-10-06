import { useEffect, useRef, useState } from "react";

const IMG_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/";

export default function MenuCard({ restaurant }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(restaurant?.info);
  }, [restaurant]);

  return (
    <div>
      {data ? (
        <div className="m-1">
          <div className="w-[280px] h-[185px] rounded-2xl relative shadow-lg">
            <img
              src={`${IMG_URL}${data?.cloudinaryImageId}`}
              alt={`${data?.name}`}
              className="w-full h-full rounded-2xl object-cover"
            />

            <div className="w-full h-full absolute bottom-0 rounded-2xl bg-gradient-to-t from-black from-1% to-transparent to-40%"></div>
            {data?.aggregatedDiscountInfoV3 ? (
              <p className="text-2xl font-bold text-white absolute bottom-0 left-3">{`${
                data?.aggregatedDiscountInfoV3?.header
              } ${
                data?.aggregatedDiscountInfoV3?.subHeader
                  ? data?.aggregatedDiscountInfoV3?.subHeader
                  : ""
              }`}</p>
            ) : null}
          </div>
          <div className="p-1 w-[280px] min-h-[92px] h-fit">
            <div className="font-bold text-lg">
              <p className="">
                {data.name.length > 29
                  ? data.name.slice(0, 27) + "..."
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
                {data.cuisines.join(", ").length > 34
                  ? data.cuisines.join(", ").slice(0, 33) + "..."
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
