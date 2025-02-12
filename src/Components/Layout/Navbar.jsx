import React from "react";
import styles from "../../Styles/Style";
import { navItems } from "../../Static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return (
    <div className={`block 800px:${styles.noramlFlex}`}>
      {navItems &&
        navItems?.map((item, index) => (
          <div className="flex items-center relative" key={index}>
            {item.title === "FAQ" && (
              <div className="absolute right-4 top-0">

             <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
           </span>
           </div>
            )}
            <Link
              to={item.url}
              className={`${
                active === index + 1
                  ? "text-blue-600"
                  : "text-gray-600"
              } font-[600] font-[Delius] px-6 cursor-pointer mb-6 800px:mb-0`}>
              {item.title}
            </Link>
          </div>
        ))
        }
    </div>
  );
};

export default Navbar;
