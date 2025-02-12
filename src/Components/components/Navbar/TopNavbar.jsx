import { FaSearch, FaGift, FaShoppingCart, FaEnvelope, FaUser } from "react-icons/fa";
import PhoneNav from "./PhoneNav";

const TopNavbar = () => {
  return (
    <div className="bg-[#9a3eaa]   fixed lg:-top-5 left-0 w-full z-50 md:p-7">
      <div className="mx-auto max-w-7xl">
        <nav className="text-white flex flex-col md:flex-row items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
              alt="logo"
              className="h-6 hidden lg:block"
            />
            <span className="text-xl font-bold">
              <span className="text-sm hidden lg:block">AppleGadgets</span>
            </span>
          </div>

          {/* Search Bar */}
          <div className="flex-grow flex items-center justify-center mb-4 md:mb-0">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-xs md:max-w">
              <FaSearch className="  text-[#9a3eaa] text-2xl" />
              <input
                type="text"
                placeholder="Search Your Product"
                className="  flex-grow bg-transparent text-black outline-none pl-2"
              />
            </div>
          </div>

          {/* Menu Options */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <FaGift className="text-2xl" />
              <div>
                <span className="block text-sm text-white">Offers</span>
                <span className="block text-xs text-gray-200">Latest Offers</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaShoppingCart className="text-2xl" />
              <div>
                <span className="block text-sm text-white">Cart(0)</span>
                <span className="block text-xs text-gray-200">Add items</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-2xl" />
              <div>
                <span className="block text-sm text-white">Pre-Order</span>
                <span className="block text-xs text-gray-200">Order Today</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <FaUser className="text-2xl" />
              <div>
                <span className="block text-sm text-white">Account</span>
                <span className="block text-xs text-gray-200">Register or Login</span>
              </div>
            </div>
          </div>

          {/* Mobile (sm) Bottom Navigation Menu */}
          <div className="block md:hidden  ">
            <PhoneNav />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default TopNavbar;