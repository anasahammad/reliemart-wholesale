import  { useEffect, useState } from "react";
import styles from "../../Styles/Style";


import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";

import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";

import DropDown from "./DropDown";
import Navbar from "./Navbar";
import Cart from "../../Components/Cart";
import Wishlist from "../../Components/Wishlist";
import ResponsiveHeader from "./ResponsiveHeader/ResponsiveHeader";

import { useSelector } from "react-redux";
import { MdSell } from "react-icons/md";
import { FiLogIn } from "react-icons/fi";
import PhoneNav from "../components/Navbar/PhoneNav";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import UserDropdown from "../UserDropDown";

const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [click, setClick] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // local storage
  const photoUrl = JSON.parse(localStorage.getItem("PhotoUrl"));
  const isUser = JSON.parse(localStorage.getItem("email"));
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const userState = useSelector((state) => state.user);
  const reseller  = userState?.userInfo?.user?.role==='উদ্যোক্তা';

  console.log(reseller)
  const { data: productsData = [], isLoading: isProductsLoading, isError: isProductsError, error: productsError } = useQuery({
    queryKey: "products",
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
     
      return response.data?.data || [];
    },
  });
  
  const { data: categoriesData  = [], isLoading: isCategoriesLoading, isError: isCategoriesError, error: categoriesError } = useQuery({
    queryKey: "categoriesData",
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
    
      return response?.data || [];
    },
  });
  

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filterProduct =
    productsData &&
    productsData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
  
    setSearchData(filterProduct);
  
    if (term.length === 0) {
      setClick(false);
    } else {
      setClick(true);
    }
  };
  
  
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setIsMobileView(false);
      // setShowMenu(false);
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
  // scroll menu bar
  window.addEventListener("scroll", () => {
    if (window.scrollY > 70) {
      setActive(true);
    } else {
      setActive(false);
    }
  });

  // localStorage user data
  const isSeller = localStorage.getItem("isSeller");

  return (
    <>
      {/* top header */}
      <div className={`  bg-white  w-[93%] mx-auto`}>
        <div className="hidden   800px:h-[40px] 800px:pt-8 800px:pb-8 800px:flex items-center justify-between">
          <Link to={"/"}>
           <img src="/logo.png" className="w-12 h-12"></img>
          </Link>

          <div className={`w-[50%] ml-auto text-gray-700`}>
            <Navbar active={activeHeading} />
          </div>

          <div className="hidden md:flex mr-4 items-center space-x-8">
       
       {!reseller ? (
             <Link to="/seller/login" className="flex items-center space-x-2">
             <MdSell className="text-2xl text-gray-700  " />
             <div>
               <span className="block text-sm text-gray-700">
                 Become a seller
               </span>
               <span className="block text-xs text-orange-500">
                 Reseller Login
               </span>
             </div>
           </Link>
       ) : null}

            <Link to="/login">
              <div className="flex items-center space-x-2">
                <FiLogIn className="text-2xl text-gray-700" />
                <div>
                  <span className="block text-sm text-gray-700">Customer?</span>
                  <span className="block text-xs text-orange-500">Login</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* responsive header */}
      <ResponsiveHeader
        active={active}
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        setOpenCart={setOpenCart}
        openCart={openCart}
        setOpenWishlist={setOpenWishlist}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        serachData={searchData}
        activeHeading={activeHeading}
        cart={cart}
        click={click}
      />
      <PhoneNav setOpenWishlist={setOpenWishlist} isScrolledValue={openCart} click={click} />

      {/* header bottom */}
      <div
        className={` hidden lg:block md:block fixed  z-[500] top-18 left-0 w-full background-gradient  py-2 transition-all duration-300 ${
          isMobileView
            ? "lg:gradient-bg    " // Small screens always have gradient background
            : isScrolled
            ? "bg-none lg:top-0 lg:text-gradient     text-black lg:backdrop-blur-md shadow-md" // Large and medium screens scroll effect
            : "gradient-bg"
        }`}
      >
        <div
          className={`${styles.section} ${styles.noramlFlex} relative justify-between`}
        >
          {/* categories bar */}
          <div
            className="relative mt-[1px] w-[250px] text-gray-700 bg-[#FED7AA] h-[40px] hidden items-center rounded-  1000px:flex justify-between "
            onClick={() => setDropDown(!dropDown)}
          >
            <BiMenuAltLeft
              size={24}
              className="absolute top-2 flex items-center left-2"
            />
            <button className="w-full h-[100%] flex items-center justify-between font-sans pl-14 shadow-lg text-base font-[500] rounded-t-md select-none">
              All Categories
            </button>
            <IoIosArrowDown
              size={20}
              className="absolute right-2 top-3 flex items-center cursor-pointer"
            />
            {dropDown ? (
              <DropDown
              categoriesData={categoriesData}
                setDropDown={setDropDown}
                dropDown={dropDown}
              />
            ) : null}
          </div>

          <div className={`${styles.section} relative w-[50%] ml-12`}>
            <input
              type="text"
              className=" w-full py-2 border border-[#F97316] shadow-md focus:outline-none pl-5"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search product..."
            />
            <AiOutlineSearch
              size={30}
              className="absolute text-gradient   top-1.5 right-2 cursor-pointer"
            />

{click &&
  (searchData && searchData.length !== 0 ? (
    <div className="absolute min-h-[50px] z-[800] shadow-sm-2 bg-slate-50 p-4 min-w-full">
      {searchData?.map((product, i) => {
        console.log("Mapped Product:", product); // Log each product being mapped

        const data = product.name;
        const product_name = data.replace(/\s+/g, "-").toLowerCase();

        return (
          <Link to={`/product/${product?._id}`} key={i}>
            <div className="w-full flex items-center py-3">
              <img
                src={product.image[0]}
                alt="product/image"
                className="w-[40px] h-[40px] mr-[10px]"
              />
              <h1>{product?.name}</h1>
            </div>
          </Link>
        );
      })}
    </div>
  ) : (
    <div className="absolute min-h-[50px] z-[800] shadow-sm-2 bg-slate-50 p-4">
      <h1>No products found</h1>
    </div>
  ))}

          </div>
          {/* navbar section */}

          <div className="flex gap-2 mr-10">
            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenWishlist(true)}
              >
                <AiOutlineHeart size={28} color="#fff" />
                <span className="absolute top-[-5px] right-[-5px] rounded-full w-4 h-4 top right m-0 p-0 font-mono text-gray-700 leading-tight text-[12px]  bg-[#FED7AA] text-center">
                  {wishlist ? wishlist.length : "0"}
                </span>
              </div>
            </div>

            <div className={`${styles.noramlFlex}`}>
              <div
                className="relative cursor-pointer mr-[15px]"
                onClick={() => setOpenCart(true)}
              >
                <AiOutlineShoppingCart size={28} color="#fff" />
                <span className="absolute top-[-5px] right-[-5px] rounded-full w-4 h-4 top right m-0 p-0 font-mono text-gray-700 leading-tight text-[12px]  bg-[#FED7AA] text-center">
                  {cart ? cart.length : "0"}
                </span>
              </div>
            </div>

            {/* <div className={`${styles.noramlFlex}`}>
              <div className="relative cursor-pointer mr-[15px] bottom-[2px]">
                <Link to={isUser ? "/profile" : "/sign-up"}>
                  {isUser ? (
                    <img
                      src={photoUrl ? photoUrl : avatar}
                      alt="avatar"
                      className="w-[33px] h-[33px] rounded-full object-cover"
                    />
                  ) : (
                    <CgProfile size={27} color="#fff" />
                  )}
                </Link>
              </div>
            </div> */}
            <UserDropdown  photoUrl={photoUrl} />
          </div>
        </div>
      </div>
      {openCart && <Cart setOpenCart={setOpenCart} openCart={openCart} />}
      {openWishlist && <Wishlist setOpenWishlist={setOpenWishlist} />}
    </>
  );
};

export default Header;
