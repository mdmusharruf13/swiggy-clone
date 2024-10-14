import { useEffect, useRef, useState } from "react";
import MenuCard from "./MenuCard";
import { useSelector } from "react-redux";

export default function RestaurantInYourCity() {
  const [scroll, setScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const [slider, setSlider] = useState([]);
  const sliderRef = useRef(null);
  let width = 0;

  const [restaurantList, setRestaurantList] = useState(null);
  const [header, setHeader] = useState("");

  const restaurantData = useSelector(
    (state) => state.restaurantSlice.restaurantsData[1]
  );

  useEffect(() => {
    setRestaurantList(
      restaurantData?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setHeader(restaurantData?.card?.card?.header?.title);
  }, [restaurantData]);

  const handleNext = () => {
    if (sliderRef.current && maxScroll === 0) {
      width = sliderRef.current.offsetWidth;
      setMaxScroll(sliderRef.current.scrollWidth - width);
      setScroll((prev) => prev - (width / 2 > 280 ? width / 2 : 280));
      setSlider((prev) => [...prev, width / 2 > 280 ? width / 2 : 280]);
    }
    width = sliderRef.current.offsetWidth;

    if (Math.abs(scroll) < maxScroll) {
      if (Math.abs(scroll) + (width / 2 > 280 ? width / 2 : 280) > maxScroll) {
        const newScroll = maxScroll - Math.abs(scroll);
        setScroll((prev) => prev - newScroll);
        setSlider((prev) => [...prev, newScroll]);
      } else {
        setScroll((prev) => prev - (width / 2 > 280 ? width / 2 : 280));
        setSlider((prev) => [...prev, width / 2 > 280 ? width / 2 : 280]);
      }
    }
  };

  const handlePrev = () => {
    if (!slider.length) return;
    const newScroll = slider.at(0);
    setSlider(slider.slice(1));
    setScroll((prev) => prev + Math.abs(newScroll));
  };

  return (
    <>
      {restaurantList && restaurantList.length > 0 ? (
        <section className=" w-[75%] mx-auto">
          <div className="flex flex-col gap-4 overflow-hidden">
            <div className="flex justify-between">
              <p className="text-2xl font-extrabold">{header}</p>
              <span className="flex gap-2 text-2xl">
                <i
                  className={`fi fi-rr-arrow-circle-left cursor-pointer ${
                    scroll === 0 ? "text-gray-400" : ""
                  }`}
                  onClick={() => handlePrev()}
                ></i>
                <i
                  className={`fi fi-rr-arrow-circle-right cursor-pointer ${
                    maxScroll && Math.abs(scroll) === maxScroll
                      ? "text-gray-400"
                      : ""
                  }`}
                  onClick={() => handleNext()}
                ></i>
              </span>
            </div>
            <div
              className="flex slider duration-300 gap-5"
              ref={sliderRef}
              style={{
                translate: `${scroll}px`,
              }}
            >
              {restaurantList.map((restaurant) => (
                <div key={restaurant.info.id} className="inline">
                  <MenuCard restaurant={restaurant} />
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
