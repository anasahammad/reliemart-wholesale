import React, { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import Logo from "../../../assets/logo.png";
import { FaGift, FaShoppingCart, FaEnvelope, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../Styles/Style";
import Navbar from "../Navbar";

import avatar from "../../../assets/avatar.jpg";
import Cart from "../../Cart";
import Wishlist from "../../Wishlist";
import { useSelector } from "react-redux";

import { AnimatePresence, motion } from "framer-motion";
import { getUserByIdForUser } from "../../../services/index/users";

const ResponsiveHeader = ({
  active,
  openMenu,
  setOpenMenu,
  handleSearch,
  searchTerm,
  serachData,
  activeHeading,
  setOpenCart,
  openCart,
  cart,
  click,
}) => {
  const { wishlist } = useSelector((state) => state.wishlist);


  const [openWishlist, setOpenWishlist] = useState(false);
  const userName = JSON.parse(localStorage.getItem("userName"));
  const photoUrl = JSON.parse(localStorage.getItem("PhotoUrl"));
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  const userState = useSelector((state) => state.user);
  const isSeller = JSON.parse(localStorage.getItem("isSeller"));
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [accounts, setAccounts] = useState();
  // console.log("userState log ",userState);
  const toggleSearchBar = () => {
    setShowSearchBar((prev) => !prev);
  };

    const userInfo =
      userState?.userInfo || JSON.parse(localStorage.getItem("userAccount"));
    const userId = userInfo?.user?._id;
    //console.log(resellerId);
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userData = await getUserByIdForUser(userId);
          //console.log(userData.user);
          setAccounts(userData.user);
        } catch (err) {
          // setError(err.message);
        }
      };
  
      fetchUser();
    }, [userId]);

    // console.log("accounts ",accounts);
  return (
    <>
      <div
        className={` ${
          active === true ? "fixed top-0 left-0 shadow-sm z-10" : null
        } w-[100vw] h-[50px] bg-gray-100 top-0 left-0 z-50  800px:hidden flex items-center justify-between shadow-md px-3`}
      >
        <div className="flex items-center text-gray-800 justify-between w-full">

        <Link to={"/"}>
            <h2 className="  text-3xl font-semibold  ">
              Relife <span className="  text-orange-600 -ml-1">mart </span>
            </h2>
          </Link>

          <div>
            <BiMenuAltLeft
              size={40}
              className="cursor-pointer hidden md:grid"
              onClick={() => setOpenMenu(true)}
            />
          </div>

          <Link to={"/"}>
            <h2 className=" hidden md:grid text-3xl font-semibold  ">
              Relife <span className="  text-orange-600 -ml-1">mart </span>
            </h2>
          </Link>
      
          <AiOutlineSearch
                  size={30}
                  className=" md:hidden grid top-1.5 right-2 text-orange-600 cursor-pointer  "
                  onClick={toggleSearchBar}
                />

          <div
            className="relative cursor-pointer   text-gray-800 mr-[15px]"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart size={35} />
            <span className="absolute top-0 right-0 rounded-full w-4 h-4 top right m-0 p-0 font-mono text-gray-800 leading-tight text-[12px]  bg-orange-400 text-center">
              {cart ? cart.length : "0"}
            </span>
          </div>

          <div>
            <BiMenuAltLeft
              size={40}
              className="cursor-pointer grid md:hidden"
              onClick={() => setOpenMenu(true)}
            />
          </div>
        </div>

        {/* responsive menu sidebar */}
        {openMenu && (
          <div className="w-full z-50 fixed top-0 left-0 bg-[#0000005e] h-full ">
            <motion.div
              initial={{ opacity: 0, x: -400 }}
              animate={{ opacity: 1, x: 1 }}
              exit={{ opacity: 0, x: -400 }}
              transition={{ duration: 0.4 }}
              className="fixed w-[80%] sm:w-[60%] overflow-y-scroll h-screen top-0 left-0  bg-gray-100 shadow-md  z-50 pb-10"
            >
              <div className="w-full flex items-center justify-between px-3 pt-5 mb-2">
                <div
                  className="relative cursor-pointer text-gray-800 mr-[15px]"
                  onClick={() => setOpenWishlist(true) || setOpenMenu(false)}
                >
                  <AiOutlineHeart size={30} />
                  <span className="absolute top-0 right-0 rounded-full w-4 h-4 top right m-0 p-0 font-mono text-gray-800 leading-tight text-[12px]   bg-orange-400 text-center">
                    {wishlist ? wishlist.length : "0"}
                  </span>
                </div>
                <RxCross1
                  size={30}
                  onClick={() => setOpenMenu(false)}
                  className="cursor-pointer text-gray-800"
                />
              </div>

          

              <div className="mt-8 text-gray-800">
                <Navbar active={activeHeading} />
              </div>

              {/* <div className={`${styles.button} !h-11 !rounded-[4px] ml-6`}>
                <Link to={isSeller ? "/shop/:id" : "/signup-seller"}>
                  <h1 className=" text-gray-800 flex items-center justify-center">
                    {isSeller ? "Go Dashboard" : "Become Seller"}
                    <IoIosArrowForward className="ml-1" />
                  </h1>
                </Link>
              </div> */}
              <br />
              <br />
              <br />
              {/* <div className="flex items-center justify-center w-full">
                {accounts ? (
                  <Link
                    to="/profile"
                    className="flex items-center justify-center"
                  >
                    <img
                      src={photoUrl ? photoUrl : avatar}
                      alt="user"
                      className="w-[45px] h-[45px] rounded-full border-[2px]
                     border-[#0b71e7] object-contain"
                    />
                    <h1 className="font-[600] text-[17px] ml-3 text-[#0b71e7]">
                      {accounts?.name}
                    </h1>
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-[#333] font-[600] text-[18px] "
                    >
                      Login /
                    </Link>
                    <Link
                      to="/sign-up"
                      className="text-[#333] font-[600] text-[18px] pl-1"
                    >
                      SignUp
                    </Link>
                  </>
                )}
              </div> */}
            </motion.div>
          </div>
        )}

        {openCart && <Cart setOpenCart={setOpenCart} />}
        {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
      </div>
 
      <div className={`${styles.section} lg:hidden md:hidden  fixed top-8 left-0 shadow-sm z-10  mb-5 ml-3   w-[90%] mt-5`}>
                <input
                  type="text"
                  className="  w-full hidden md:grid  py-2 rounded border   border-orange-600 focus:outline-none pl-2"
                  value={searchTerm}
                  onChange={handleSearch}
                  placeholder="Search product..."
                />

<AnimatePresence>
        {showSearchBar && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 50, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed md:hidden flex h-9 justify-center items-center top-0 inset-x-2  rounded-md border-2 border-orange-300  px-1 bg-white shadow-md z-[40]"
          >
            <input
              type="text"
              className="w-full py-1 h-7 focus:outline-none pl-2"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search product..."
            />
          <button className="bg-[#1F5D1F] w-fit px-2 pb-[2px]  h-7 text-white text-xs rounded-md" onChange={handleSearch}>search</button>
          </motion.div>
        )}
      </AnimatePresence>


                 <AiOutlineSearch
                  size={30}
                  className="absolute hidden md:grid top-1.5 right-2 text-orange-600 cursor-pointer  "
                />

                {click &&
                  (serachData && serachData.length !== 0 ? (
                    <div className="absolute max-h-[30vh] overflow-y-auto min-w-full mt-9 shadow-sm-2  bg-slate-50 z-[1000] p-2">
                      {serachData &&
                        serachData.map((product, i) => {
                          const data = product.name;

                          const product_name = data.replace(/\s+/g, "-");

                          return (
                            <Link key={i} to={`/product/${product_name}`}>
                              <div
                                className="min-w-full flex items-center pt-3 mb-1"
                                key={i}
                              >
                                <img
                                  src={product.image[0]}
                                  alt="product/image"
                                  className="w-[40px] h-[40px] mr-[10px]"
                                />
                                <h1 className="text-sm">{product.name}</h1>
                                <span className="text-[#F4511E]">{data.MainCashDiscountPrice?data.MainCashDiscountPrice:data.Mainprice}৳</span>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  ) : null)}
              </div>
 

    </>
  );
};

export default ResponsiveHeader;
