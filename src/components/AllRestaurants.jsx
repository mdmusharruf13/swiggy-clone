import { useEffect, useState } from "react";
import Filters from "./Filters";
import MenuCard from "./MenuCard";

export default function AllRestaurants({ title, filterData, restaurants }) {
  const [restaurantList, setRestaurantList] = useState([]);
  // const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [filterNames, setFilterNames] = useState(null);
  const [lastFilterAdded, setLastFilterAdded] = useState("");
  const [lastFilterRemoved, setLastFilterRemoved] = useState("");

  useEffect(() => {
    if (restaurants) {
      console.log("restaurants", restaurants);
      setRestaurantList((prev) => [...prev, ...restaurants]);
    }
  }, [restaurants]);

  useEffect(() => {
    if (!filterNames) return;
    // console.log("filterNames", filterNames);
    // let keys = Object.keys(filterNames);
    // console.log("keys", keys);

    // console.log(filterNames);
    console.log(Object.keys(filterNames));
  }, [filterNames]);

  // console.log("all restaurant rendered");
  return (
    <>
      <section className="w-[75%]  mx-auto flex flex-col gap-9">
        {title && filterData ? (
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-2xl font-bold text-nowrap ">
                {title?.card?.card?.title}
              </p>
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

function Card() {
  return <div>cardd bro</div>;
}
