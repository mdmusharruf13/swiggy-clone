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
  const [showAllCities, setShowAllCities] = useState(false);
  const restaurantData = useSelector(
    (state) => state.restaurantSlice.restaurantsData
  );
  const citiesData = useSelector(
    (state) => state.restaurantSlice.restaurantsData
  );

  useEffect(() => {
    if (restaurantData) {
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
                  <button
                    className="border border-black rounded-md flex items-center gap-1 p-1 hover:shadow-lg"
                    onClick={() => setShowAllCities(!showAllCities)}
                  >
                    {allCities.length - 6 + " cities "}
                    {showAllCities ? (
                      <i className="fi fi-sr-angle-small-up flex"></i>
                    ) : (
                      <i className="fi fi-sr-angle-small-down flex"></i>
                    )}
                  </button>
                ) : null}
              </div>
            ))}
          </div>

          {allCities && showAllCities && (
            <div className="flex flex-col gap-4">
              <p className="font-bold">Other cities that we deliver:</p>
              <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                  {allCities.slice(6, 154).map((city) => (
                    <p
                      key={city.text}
                      className="cursor-pointer hover:text-gray-800"
                    >
                      {city.text}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {allCities.slice(154, 302).map((city) => (
                    <p
                      key={city.text}
                      className="cursor-pointer hover:text-gray-800"
                    >
                      {city.text}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {allCities.slice(302, 450).map((city) => (
                    <p
                      key={city.text}
                      className="cursor-pointer hover:text-gray-800"
                    >
                      {city.text}
                    </p>
                  ))}
                </div>
                <div className="flex flex-col gap-2">
                  {allCities.slice(450).map((city) => (
                    <p
                      key={city.text}
                      className="cursor-pointer hover:text-gray-800"
                    >
                      {city.text}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </footer>
  );
}

function NameList({ names }) {
  return (
    <div className=" flex flex-col gap-2 ">
      {names.map((name) => (
        <p key={name} className="cursor-pointer hover:text-gray-800">
          {name}
        </p>
      ))}
    </div>
  );
}
