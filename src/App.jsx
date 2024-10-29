import "./App.css";
import Header from "./components/Header";
import { useEffect, useRef, useState } from "react";
import MenuItems from "./components/MenuItems";
import RestaurantInYourCity from "./components/RestaurantInYourCity";
import AllRestaurants from "./components/AllRestaurants";
import { useDispatch, useSelector } from "react-redux";
import { setAllRestaurants } from "./slices/restaurantSlice";
import BestPlaceToEatAcrossCities from "./components/BestPlaceToEatAcrossCities";
import BestCuisinesNearMe from "./components/BestCuisinesNearMe";
import ExploreEveryRestaurantsNearMe from "./components/ExploreEveryRestaurantsNearMe";
import Footer from "./components/Footer";
import { responseData } from "./utils/tempResponse";

function App() {
  const [tempResponse, setTempResponse] = useState(responseData);
  const restSlice = useSelector(
    (state) => state.restaurantSlice.restaurantsData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAllRestaurants(tempResponse.data.cards));
    const getResponse = async () => {
      const req = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.37240&lng=78.43780&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const response = await req.json();
      dispatch(setAllRestaurants(response.data.cards));
    };
    console.time("start");
    getResponse();
    console.timeEnd("start");
  }, []);

  useEffect(() => {
    if (restSlice.length) {
      console.log("restSlice", restSlice);
    }
  }, [restSlice]);

  return (
    <>
      <div className="fixed top-0 w-full z-50 bg-white ">
        <Header />
      </div>
      <main className="mt-[80px]">
        <section>
          <MenuItems />
        </section>
        <section className="w-[75%] mx-auto my-10">
          <hr />
        </section>
        <section>
          <RestaurantInYourCity />
        </section>
        <section className="w-[75%] mx-auto my-10">
          <hr />
        </section>
        <section>
          <AllRestaurants />
        </section>
        <section className="w-[75%] mx-auto my-10">
          <hr />
        </section>
        <section>
          <BestPlaceToEatAcrossCities />
        </section>
        <section className="my-14"></section>
        <section>
          <BestCuisinesNearMe />
        </section>
        <section className="my-14"></section>
        <section>
          <ExploreEveryRestaurantsNearMe />
        </section>
        <section className="my-14"></section>
      </main>
      <Footer />
    </>
  );
}

export default App;
