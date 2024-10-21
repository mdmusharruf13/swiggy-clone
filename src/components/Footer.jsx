import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../images/MM_FOODS.png";

const IMG_URL =
  "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/";

const footerInfo = [
  {
    title: "Company",
    items: [
      "About Us",
      "Swiggy Corporate",
      "Careers",
      "Team",
      "Swiggy One",
      "Swiggy Instamart",
      "Swiggy Dineout",
      "Swiggy Genie",
    ],
  },
  {
    title: "Contact us",
    items: ["Help & Support", "Partner with us", "Ride with us"],
  },
  {
    title: "Legal",
    items: [
      "Terms & Conditions",
      "Cookie Policy",
      "Privacy Policy",
      "Investor Relations",
    ],
  },
  {
    title: "Available In:",
    items: ["Bangalore", "Gurgaon", "Hyderabad", "Delhi", "Mumbai", "Pune"],
    moreItems: true,
  },
  {
    title: "Life at Swiggy",
    items: ["Explore with Swiggy", "Swiggy News", "Snackables"],
  },
];

export default function Footer() {
  const [footerData, setfooterData] = useState({});
  const [allCities, setAllCities] = useState([]);
  const restaurantData = useSelector(
    (state) => state.restaurantSlice.restaurantsData
  );
  const citiesData = useSelector(
    (state) => state.restaurantSlice.restaurantsData
  );

  useEffect(() => {
    if (restaurantData) {
      // console.log(restaurantData[9]?.card?.card);
      setfooterData(restaurantData[9]?.card?.card);
    }
    if (citiesData) {
      setAllCities(citiesData[10]?.card?.card?.cities);
    }
  }, [restaurantData, citiesData]);

  return (
    <footer className=" bg-orange-500">
      {footerData && (
        <div className="w-[73%] mx-auto flex flex-col gap-5 py-5">
          <div className="flex justify-between w-fit mx-auto gap-6 items-center">
            <p className="text-2xl font-bold">{footerData?.title} </p>
            <img
              src={`${IMG_URL}${footerData?.androidAppImage}`}
              className="w-48 cursor-pointer"
              alt="play-store"
            />
            <img
              src={`${IMG_URL}${footerData?.iosAppImage}`}
              className="w-48 cursor-pointer"
              alt="app-store"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <img src={logo} alt="swiggy" className="w-20 rounded-full" />
            </div>
            <p>&copy; 2024 MM Foods Pvt Ltd</p>
          </div>
          <div className="flex justify-between ">
            {footerInfo.map((currItem) => (
              <div key={currItem.title} className="flex flex-col gap-3">
                <p className="font-bold">{currItem.title}</p>
                <NameList names={currItem.items} />
                {currItem?.moreItems ? (
                  <button className="border border-black rounded-md flex items-center gap-1 p-1 hover:bg-orange-400">
                    {allCities.length - 6 + " cities "}{" "}
                    <i className="fi fi-sr-angle-small-down flex"></i>
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </footer>
  );
}

function NameList({ names }) {
  return (
    <div className=" flex flex-col gap-2">
      {names.map((name) => (
        <p key={name} className="cursor-pointer">
          {name}
        </p>
      ))}
    </div>
  );
}
