 
import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import {   FaGift, FaShoppingCart, FaEnvelope, FaUser, FaHome } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Wishlist from "../../Wishlist";
import { MdSell } from "react-icons/md";
const PhoneNav = ({

  setOpenMenu,
  isScrolledValue,
  click,
}) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const [openWishlist, setOpenWishlist] = useState(false);
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  console.log("home", isScrolledValue)
  return (
    <div className={``}> 
                <div className={`${isScrolledValue === true ? "hidden" : "md:hidden fixed bottom-0 left-0 w-full bg-white text-gray-700 border-t border-gray-700   z-50     shadow-lg"} `}>
            <div className="flex justify-around items-center py-2">
              <Link to="/" className="flex flex-col items-center">
                <FaHome className="text-orange-600 text-xl" />
                <span className="text-xs  ">Home</span>
              </Link>
              <div    onClick={() => setOpenWishlist(true) || setOpenMenu(false)} className="flex  flex-col items-center">
                <AiOutlineHeart className="text-orange-600 text-xl" />
                
                <span className="text-xs ">Wishlist({wishlist ? wishlist.length : "0"})</span>
              </div>
              
              <Link to="/seller/login" className="flex flex-col items-center">
                <MdSell className="text-orange-600 text-xl" />
                <span className="text-xs  ">reseller!</span>
              </Link>
              {isAuthenticated ? (
              <Link to="/profile" className="flex flex-col items-center">
              <FaUser className="text-orange-600 text-xl" />
              <span className="text-xs  ">Profile</span>
            </Link> ) : 
               <Link to="/login" className="flex flex-col items-center">
               <FaUser className="text-orange-600 text-xl" />
               <span className="text-xs  ">Profile</span>
             </Link>
              }
            </div>
          </div>
          {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </div>
  )
}

export default PhoneNav