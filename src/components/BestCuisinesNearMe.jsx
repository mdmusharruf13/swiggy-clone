import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function BestCuisinesNearMe() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [title, setTitle] = useState("");
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);

  const restaurantData = useSelector(
    (state) => state.restaurantSlice.restaurantsData
  );

  useEffect(() => {
    if (restaurantData.length) {
      console.log("restaurantData: -> ", restaurantData);
      setRestaurantList(restaurantData[7]?.card?.card?.brands);
      setTitle(restaurantData[7]?.card?.card?.title);
    }
  }, [restaurantData]);

  const handleShowAllRestaurant = () => {
    setShowAllRestaurants(!showAllRestaurants);
  };

  return (
    <section className="w-[75%] mx-auto flex flex-col gap-5">
      <p className="text-2xl font-bold">{title ? title : ""}</p>

      {restaurantList && restaurantList.length ? (
        <div className="flex flex-wrap gap-6">
          {showAllRestaurants
            ? restaurantList.map((restaurant) => (
                <button
                  key={restaurant.text}
                  className="p-4 w-[23%] border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  {restaurant.text}
                </button>
              ))
            : restaurantList.slice(1, 12).map((restaurant) => (
                <button
                  key={restaurant.text}
                  className="p-4 w-[23%] border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  {restaurant.text}
                </button>
              ))}
          {showAllRestaurants ? null : (
            <button
              onClick={handleShowAllRestaurant}
              className="border border-gray-300 hover:bg-gray-300 rounded-lg p-4 w-[23%]"
            >
              Show All
              <span>
                <i className="fi fi-sr-angle-small-down"></i>
              </span>
            </button>
          )}
        </div>
      ) : (
        <div>Loading best cuisines...</div>
      )}
    </section>
  );
}
