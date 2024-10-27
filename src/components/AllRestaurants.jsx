import { useEffect, useState } from "react";
import Filters from "./Filters";
import MenuCard from "./MenuCard";
import { useSelector } from "react-redux";
import filterRestaurant from "../utils/filterRestaurant";

export default function AllRestaurants() {
  const [restaurantList, setRestaurantList] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [filterNames, setFilterNames] = useState([]);
  const [lastFilterAdded, setLastFilterAdded] = useState(null);
  const [lastFilterRemoved, setLastFilterRemoved] = useState(null);
  const [title, setTitle] = useState("");
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);

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
    // console.log(
    //   restaurantData[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    // );
  }, [restaurantData]);

  useEffect(() => {
    if (!lastFilterAdded) return;
    setFilterNames((prev) => [...prev, lastFilterAdded]);
    const filteredData = restaurantList.filter((restaurant) => {
      const bool = [...filterNames, lastFilterAdded].map((name) => {
        return filterRestaurant(restaurant, name);
      });
      return bool.every((val) => val);
    });
    setFilteredRestaurant(filteredData);
    console.log("filteredData1", filteredData);
  }, [lastFilterAdded]);

  useEffect(() => {
    if (!lastFilterRemoved) return;
    if (filterNames.length === 1) {
      setFilterNames([]);
      return;
    }
    const newFilterNames = filterNames.filter(
      (name) => name !== lastFilterRemoved
    );
    setFilterNames(newFilterNames);
    const filteredData = restaurantList.filter((restaurant) => {
      const bool = newFilterNames.map((name) => {
        return filterRestaurant(restaurant, name);
      });
      return bool.every((val) => val);
    });
    setFilteredRestaurant(filteredData);
    console.log("filteredData2", filteredData);
  }, [lastFilterRemoved]);

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
            {(filteredRestaurant && filterNames.length
              ? filteredRestaurant
              : restaurantList
            ).map((restaurant) => (
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
