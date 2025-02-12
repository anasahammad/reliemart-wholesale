import { useState, useEffect } from "react"; 
import { IoReorderThreeOutline } from "react-icons/io5"; 
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; 

const BottomNav = () => {   
  const [showMenu, setShowMenu] = useState(false);   
  const [activeItem, setActiveItem] = useState(null);   
  const [isMobileView, setIsMobileView] = useState(false);   
  const [isScrolled, setIsScrolled] = useState(false); 

  const menuItems = [     
    { title: "Phones & Tablets", content: "Details about Phones & Tablets." },     
    { title: "Laptop & Desktop", content: "Details about Laptop & Desktop." },     
    { title: "Sound Equipment", content: "Details about Sound Equipment." },     
    { title: "Power & Accessories", content: "Details about Power & Accessories." },     
    { title: "Fitness & Wearable", content: "Details about Fitness & Wearable." },     
    { title: "Peripherals", content: "Details about Peripherals." },   
  ];    

  const toggleItem = (index) => {     
    setActiveItem(activeItem === index ? null : index);   
  };    

  const handleResize = () => {     
    if (window.innerWidth >= 1024) {       
      setIsMobileView(false);       
      setShowMenu(false);     
    } else {       
      setIsMobileView(true);     
    }   
  };    

  const handleScroll = () => {     
    if (window.scrollY > 50) {       
      setIsScrolled(true);     
    } else {       
      setIsScrolled(false);     
    }   
  };    

  useEffect(() => {     
    handleResize();     
    window.addEventListener("resize", handleResize);     
    window.addEventListener("scroll", handleScroll);     
    return () => {       
      window.removeEventListener("resize", handleResize);       
      window.removeEventListener("scroll", handleScroll);     
    };   
  }, []);    

  return      (
      <div
        className={`fixed lg:top-14 top-3 left-0 w-full z-50 p-2 transition-all duration-300 ${
          isMobileView
            ? "lg:gradient-bg" // Small screens always have gradient background
            : isScrolled
            ? "bg-none lg:bg-white lg:bg-opacity-20 text-black lg:backdrop-blur-md shadow-md" // Large and medium screens scroll effect
            : "gradient-bg"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          {/* Mobile & Tablet Screen */}
          <div className="flex justify-between md:hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="bg-gray-800 text-white px-1 py-2 rounded-md"
            >
              <IoReorderThreeOutline size={20} className="text-white" />
            </button>
          </div>
          {isMobileView && showMenu && (
            <div
              className={`${
                isScrolled ? "bg-gray-900" : "bg-gray-800"
              } text-white w-1/2 fixed top-16 right-0 h-full shadow-lg transition-transform duration-300 ease-in-out -z-50 ${
                showMenu ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div className="flex flex-col items-start p-4 space-y-4">
                {menuItems.map((item, index) => (
                  <div key={index} className="w-full">
                    <div
                      onClick={() => toggleItem(index)}
                      className="hover:bg-gray-700 px-2 py-1 cursor-pointer flex justify-between items-center"
                    >
                      <span>{item.title}</span>
                      <span>
                        {activeItem === index ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    </div>
                    {activeItem === index && (
                      <div className="bg-gray-800 text-gray-300 p-2 rounded">
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
    
          {/* Large Screen */}
          <div className="hidden lg:flex justify-evenly py-2">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="group relative flex flex-col items-center cursor-pointer"
              >
                <span className="text-white font-medium hover:text-gray-300 transition-colors duration-200">
                  {item.title}
                </span>
                <div className="absolute bottom-0 translate-y-[150%] opacity-0 group-hover:opacity-100 group-hover:translate-y-[100%] bg-gray-800 text-white text-sm text-center px-4 py-2 rounded shadow-lg transition-transform duration-300 ease-in-out z-10">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
    
 
};

export default BottomNav;
