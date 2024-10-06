import { useEffect, useRef, useState } from "react";
import MenuCard from "./MenuCard";

export default function RestaurantInYourCity({ restaurants, header }) {
  const [data, setData] = useState(null);
  const [scroll, setScroll] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);

  const [slider, setSlider] = useState([]);
  const sliderRef = useRef(null);
  let width = 0;

  useEffect(() => {
    setData(restaurants);
  }, [header, restaurants]);

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
      {data && data.length > 0 ? (
        <section className=" w-[75%] mx-auto">
          <div className="flex flex-col gap-2 overflow-hidden">
            <div className="flex justify-between">
              <p className="text-2xl font-bold">{header}</p>
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
              className="flex slider duration-300"
              ref={sliderRef}
              style={{
                translate: `${scroll}px`,
              }}
            >
              {restaurants.map((restaurant) => (
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
