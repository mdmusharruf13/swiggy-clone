import { useEffect, useState } from "react";

const BASE_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

export default function MenuItems({ itemsData }) {
  const [menuData, setMenuData] = useState(null);
  const [transValue, setTransValue] = useState(0);
  const [move, setMove] = useState(0);
  let [maxMove, setMaxMove] = useState(0);

  useEffect(() => {
    setMenuData(itemsData?.card?.card?.gridElements?.infoWithStyle?.info);
  }, [itemsData]);

  useEffect(() => {
    setMaxMove(Math.floor((menuData?.length - 2) / 3));
    // console.log(maxMove);
  }, [menuData]);

  const handleNext = () => {
    if (move === maxMove || move > maxMove) return;
    setTransValue((prev) => prev - 289);
    setMove((prev) => prev + 1);
    // console.log(transValue - 288, move + 1, maxMove);
  };
  const handlePrev = () => {
    if (move === 0) return;
    setTransValue((prev) => prev + 289);
    setMove((prev) => prev - 1);

    // console.log(transValue + 288, move - 1, maxMove);
  };

  return (
    <section className="w-full h-[256px] m-auto p-[16px]">
      <div className="w-[75%] mx-auto flex justify-between">
        <p className="text-2xl font-semibold">
          {itemsData?.card?.card?.header?.title}
        </p>
        <span className="flex gap-2 text-2xl">
          <i
            className={`fi fi-rr-arrow-circle-left cursor-pointer ${
              move === 0 ? "text-gray-400" : ""
            }`}
            onClick={() => handlePrev()}
          ></i>
          <i
            className={`fi fi-rr-arrow-circle-right cursor-pointer ${
              move === maxMove ? "text-gray-400" : ""
            }`}
            onClick={() => handleNext()}
          ></i>
        </span>
      </div>
      <div className="w-[75%] overflow-hidden mx-auto ">
        <div
          style={{ translate: `${transValue}px` }}
          className={`mx-auto flex duration-300`}
        >
          {menuData &&
            menuData.map((item) => (
              <img
                src={BASE_URL + item.imageId}
                alt={item.description}
                className="w-[160px] h-[180px]"
                key={item.imageId}
              />
            ))}
        </div>
      </div>
    </section>
  );
}
