import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function ExploreEveryRestaurantsNearMe() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [title, setTitle] = useState("");

  const restaurantData = useSelector(
    (state) => state.restaurantSlice.restaurantsData
  );

  useEffect(() => {
    if (restaurantData.length) {
      setRestaurantList(restaurantData[8]?.card?.card?.brands);
      setTitle(restaurantData[8]?.card?.card?.title);
    }
  }, [restaurantData]);

  return (
    <section className="w-[75%] mx-auto flex flex-col flex-wrap gap-5">
      <p className="text-2xl font-bold">{title ? title : ""}</p>

      {restaurantList && restaurantList.length ? (
        <div className="flex flex-wrap gap-6">
          {restaurantList.map((restaurant) => (
            <button
              key={restaurant.text}
              className="w-[23%] border border-gray-300 p-4 hover:border-gray-100 rounded-lg"
            >
              {restaurant.text}
            </button>
          ))}
        </div>
      ) : (
        <div>loading restaurants...</div>
      )}
    </section>
  );
}
