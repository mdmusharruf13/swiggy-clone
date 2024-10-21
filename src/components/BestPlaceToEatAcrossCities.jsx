import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function BestPlaceToEatAcrossCities() {
  const [bestRestaurants, setBestRestaurants] = useState([]);
  const [title, setTitle] = useState("");
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);

  const restaurantsData = useSelector(
    (state) => state.restaurantSlice.restaurantsData
  );

  useEffect(() => {
    if (restaurantsData) {
      setBestRestaurants(restaurantsData[6]?.card?.card?.brands);
      setTitle(restaurantsData[6]?.card?.card?.title);
    }
  }, [restaurantsData]);

  const handleShowAllRestaurant = () => {
    setShowAllRestaurants(!showAllRestaurants);
  };
  return (
    <>
      <section className="w-[75%] m-auto  flex flex-col gap-5">
        <p className="text-2xl font-bold">{title}</p>

        {bestRestaurants && bestRestaurants.length ? (
          <div className="flex flex-wrap gap-6">
            {showAllRestaurants
              ? bestRestaurants.map((restaurant) => (
                  <button
                    key={restaurant.text}
                    className="border border-gray-300 hover:bg-gray-100 rounded-lg p-4 w-[23%]"
                  >
                    {restaurant.text}
                  </button>
                ))
              : bestRestaurants.slice(0, 11).map((restaurant) => (
                  <button
                    key={restaurant.text}
                    className="border border-gray-300 hover:bg-gray-100 rounded-lg p-4 w-[23%]"
                  >
                    {restaurant.text}
                  </button>
                ))}
            {showAllRestaurants ? null : (
              <button
                onClick={handleShowAllRestaurant}
                className="border border-gray-300 hover:bg-gray-300 rounded-lg p-4 w-[23%]"
              >
                Show More
                <span>
                  <i className="fi fi-sr-angle-small-down"></i>
                </span>
              </button>
            )}
          </div>
        ) : (
          <div>Loading Best Restaurants</div>
        )}
      </section>
    </>
  );
}
