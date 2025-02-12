 
import {   FaGift, FaShoppingCart, FaEnvelope, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
const PhoneNav = () => {
  return (
    <div> 
                <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#10151F]      z-50     shadow-lg ">
            <div className="flex justify-around items-center py-2">
              <div className="flex flex-col items-center">
                <FaGift className="  text-white text-2xl" />
                <span className="text-sm    text-white ">Offers</span>
              </div>
              {/* <div className="flex flex-col items-center">
                <FaShoppingCart className=" text-gradient  text-xl" />
                <span className="text-xs ">Cart(0)</span>
              </div> */}
              <Link to="/preorder" > 
            <div className="flex flex-col items-center space-x-2">
              <FaEnvelope className="text-2xl text-white" />
              <div>
                <span className="block text-sm text-white">Pre-Order</span>
              
              </div>
            </div></Link>
         
              <div className="flex flex-col items-center">
                <FaUser className="    text-white text-2xl" />
                <Link to="/sign-up" className=" text-sm text-white" >Account</Link>
             
              </div>
            </div>
          </div>
    </div>
  )
}

export default PhoneNav