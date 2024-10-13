import "./App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import MenuItems from "./components/MenuItems";
import RestaurantInYourCity from "./components/RestaurantInYourCity";
import AllRestaurants from "./components/AllRestaurants";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getResponse = async () => {
      const req = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.37240&lng=78.43780&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const response = await req.json();
      setData(response.data.cards);
    };
    getResponse();
  }, []);

  // console.log(
  //   "data-0",
  //   data[4]?.card?.card.gridElements?.infoWithStyle?.restaurants
  // );
  return (
    <>
      <Header />
      <main className="h-full">
        <MenuItems itemsData={data[0]} />
        <RestaurantInYourCity
          restaurants={
            data[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
          }
          header={data[1]?.card?.card?.header?.title}
        />
        <AllRestaurants
          title={data[2]}
          filterData={data[3]}
          restaurants={
            data[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants
          }
        />
      </main>
    </>
  );
}

export default App;
