import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const BASE_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/";

export default function MenuItems({ itemsData }) {
  const [menuData, setMenuData] = useState(null);
  const [scroll, setScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const [slider, setSlider] = useState([]);
  const sliderRef = useRef(null);

  const menus = useSelector(
    (state) => state.restaurantSlice.restaurantsData[0]
  );

  let sliderWidth = 0;

  useEffect(() => {
    if (menus) {
      // console.log("menus", menus.card.card.gridElements.infoWithStyle.info);
      setMenuData(menus.card.card.gridElements.infoWithStyle.info);
    }
  }, [menus]);

  const handleNext = () => {
    if (sliderRef.current && maxScroll === 0) {
      setMaxScroll(
        sliderRef.current.scrollWidth - sliderRef.current.offsetWidth
      );
      sliderWidth = sliderRef.current.offsetWidth;
      setScroll((prev) => prev - (sliderWidth > 288 ? sliderWidth / 2 : 288));
      setSlider((prev) => [...prev, sliderWidth > 288 ? sliderWidth / 2 : 288]);
    }
    sliderWidth = sliderRef.current.offsetWidth;
    if (Math.abs(scroll) < maxScroll) {
      if (
        Math.abs(scroll) + (sliderWidth > 288 ? sliderWidth / 2 : 288) >
        maxScroll
      ) {
        let newScroll = maxScroll - Math.abs(scroll);
        setScroll((prev) => prev - newScroll);
        setSlider((prev) => [...prev, newScroll]);
      } else {
        setScroll((prev) => prev - (sliderWidth > 288 ? sliderWidth / 2 : 288));
        setSlider((prev) => [
          ...prev,
          sliderWidth > 288 ? sliderWidth / 2 : 288,
        ]);
      }
    }
  };
  const handlePrev = () => {
    if (!slider.length) return;
    const newScroll = slider.at(0);
    setSlider((prev) => [...slider.slice(1)]);
    setScroll((prev) => prev + Math.abs(newScroll));
  };

  return (
    <section className="w-full h-[256px] m-auto p-[16px]">
      <div className="w-[75%] mx-auto flex justify-between">
        <p className="text-2xl font-semibold">
          {menus?.card?.card?.header?.title}
        </p>
        <span className="flex gap-2 text-2xl">
          <i
            className={`fi fi-rr-arrow-circle-left cursor-pointer ${
              scroll === 0 ? "text-gray-400" : ""
            }`}
            onClick={() => handlePrev()}
          ></i>
          <i
            className={`fi fi-rr-arrow-circle-right cursor-pointer ${
              maxScroll && Math.abs(scroll) === maxScroll ? "text-gray-400" : ""
            }`}
            onClick={() => handleNext()}
          ></i>
        </span>
      </div>
      <div className="w-[75%] overflow-hidden mx-auto ">
        <div
          style={{ translate: `${scroll}px` }}
          className={`mx-auto flex duration-300`}
          ref={sliderRef}
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
