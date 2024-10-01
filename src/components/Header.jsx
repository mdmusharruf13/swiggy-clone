const headerData = [
  {
    title: "Swiggy Corporate",
    icon: <i className="fi fi-rr-shopping-bag"></i>,
    link: "swiggy-corporate",
  },
  {
    title: "Search",
    icon: <i className="fi fi-rs-search"></i>,
    link: "search",
  },
  {
    title: "Offers",
    icon: <i className="fi fi-rr-badge-percent"></i>,
    link: "offers",
  },
  {
    title: "Help",
    icon: <i className="fi fi-sr-life-ring"></i>,
    link: "help",
  },
  {
    title: "Sign In",
    icon: <i className="fi fi-rr-user"></i>,
    link: "signin",
  },
  {
    title: "Cart",
    icon: <i className="fi fi-rr-basket-shopping-simple"></i>,
    link: "cart",
  },
];

export default function Header() {
  return (
    <header className="h-[80px] px-5 flex justify-center items-center">
      <div className=" w-[1200px]  flex justify-between items-center">
        <div className="flex gap-8 items-center">
          <img
            src="https://cdn.brandfetch.io/idQZk-y8Sy/w/192/h/192/theme/dark/logo.png?k=id64Mup7ac&t=1724233377976?t=1724233377976"
            alt="swiggy-icon"
            className="h-[70px] cursor-pointer transition ease-in-out delay-100 hover:scale-110 "
          />

          <div className="flex gap-4 items-center cursor-pointer">
            <p className="underline">Other </p>
            <i className="fi fi-rs-angle-small-down text-2xl text-orange-500 "></i>
          </div>
        </div>
        <div>
          <ul className="flex gap-8">
            {headerData.map((item) => (
              <li
                key={item.title}
                className="flex items-center gap-2  text-gray-500 hover:text-orange-500"
              >
                <span>{item.icon}</span>
                <a href="#" className="font-semibold">
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
