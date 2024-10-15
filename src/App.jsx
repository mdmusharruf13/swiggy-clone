import "./App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import MenuItems from "./components/MenuItems";
import RestaurantInYourCity from "./components/RestaurantInYourCity";
import AllRestaurants from "./components/AllRestaurants";
import { useDispatch, useSelector } from "react-redux";
import { setAllRestaurants } from "./slices/restaurantSlice";
import BestPlaceToEatAcrossCities from "./components/BestPlaceToEatAcrossCities";
import BestCuisinesNearMe from "./components/BestCuisinesNearMe";

function App() {
  const [data, setData] = useState([]);
  const restSlice = useSelector(
    (state) => state.restaurantSlice.restaurantsData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getResponse = async () => {
      const req = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.37240&lng=78.43780&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const response = await req.json();
      setData(response.data.cards);
      dispatch(setAllRestaurants(response.data.cards));
    };
    getResponse();
  }, []);

  useEffect(() => {
    if (restSlice.length) {
      console.log("restSlice", restSlice);
    }
  }, [restSlice]);

  // console.log(
  //   "data-0",
  //   data[4]?.card?.card.gridElements?.infoWithStyle?.restaurants
  // );
  return (
    <>
      <Header />
      <main className="h-full">
        <MenuItems />
        <RestaurantInYourCity />
        <AllRestaurants />
        <BestPlaceToEatAcrossCities />
        <BestCuisinesNearMe />
      </main>
    </>
  );
}

export default App;
