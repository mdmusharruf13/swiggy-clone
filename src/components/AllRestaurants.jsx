import { useEffect, useState } from "react";
import Filters from "./Filters";
import MenuCard from "./MenuCard";
import { useSelector } from "react-redux";

export default function AllRestaurants() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterNames, setFilterNames] = useState([]);
  const [lastFilterAdded, setLastFilterAdded] = useState("");
  const [lastFilterRemoved, setLastFilterRemoved] = useState("");
  const [title, setTitle] = useState("");

  const restaurantData = useSelector(
    (state) => state.restaurantSlice.restaurantsData
  );

  useEffect(() => {
    if (!restaurantData.length) return;

    setTitle(restaurantData[2]?.card?.card?.title);
    setFilterData(restaurantData[3]?.card?.card?.facetList);
    setRestaurantList(
      restaurantData[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }, [restaurantData]);

  return (
    <>
      <section className="w-[75%]  mx-auto flex flex-col gap-9">
        {title && filterNames ? (
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-2xl font-bold text-nowrap ">{title}</p>
            </div>
            <div>
              <Filters
                filterData={filterData}
                filterNames={filterNames}
                setFilterNames={setFilterNames}
                setLastFilterAdded={setLastFilterAdded}
                setLastFilterRemoved={setLastFilterRemoved}
              />
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        {restaurantList ? (
          <div className="flex flex-wrap gap-5">
            {restaurantList.map((restaurant) => (
              <div key={restaurant.info.id}>
                <MenuCard restaurant={restaurant} width={260} />
              </div>
            ))}
          </div>
        ) : (
          <p>Loading Restaurants, please wait...</p>
        )}
      </section>
    </>
  );
}
