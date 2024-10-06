import "./App.css";
import Header from "./components/Header";
import { useEffect, useState } from "react";
import MenuItems from "./components/MenuItems";

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

  // console.log("data-0", data[1]);
  return (
    <>
      <Header />
      <main className="h-full">
        <MenuItems itemsData={data[0]} />
      </main>
    </>
  );
}

export default App;
