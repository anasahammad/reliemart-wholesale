import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaImage, FaSignOutAlt, FaUser, FaUserCog } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { IoReorderFourSharp } from "react-icons/io5";
import { MdOutlineNotificationsActive } from "react-icons/md";
import { Link } from "react-router-dom";
import seach from '/svg/search.png'
import logo from '/logo.png'
import { IoMdNotifications } from "react-icons/io";
import { getUserByIdForReseller } from "../../../services/index/users";
import { useSelector } from "react-redux";

export default function DashboardHeader({ handleCallNav }) {
  const [callNotifiction, setCallNotifiction] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [click, setClick] = useState(false);
  const {data:notice} = useQuery({
    queryKey: ["notice"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/notice`);
  
      
      return response.data.data;
    }
  })
  const [accounts, setAccounts] = useState();
  const userState = useSelector((state) => state.user);

  const userInfo =
    userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
  const resellerId = userInfo?.user?._id;


    const { data: productsData = [], isLoading: isProductsLoading, isError: isProductsError, error: productsError } = useQuery({
      queryKey: "products",
      queryFn: async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
       
        return response.data?.data || [];
      },
    });
  //console.log(resellerId);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByIdForReseller(resellerId);
        //console.log(userData.user);
        setAccounts(userData.user);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [resellerId]);

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
  return (
    <div className="relative">
    <div className="w-full h-[60px]  p-3 px-5 flex shadow-md justify-between items-center border-b bg-white">
      <div className="flex justify-start items-center">
        {/* <span
          onClick={() => handleCallNav(true)}
          className="p-1 block md:hidden cursor-pointer rounded-md border"
        >
          <IoReorderFourSharp />
        </span> */}
        {/* <h1 className=" text-xl  lg:hidden md:hidden font-semibold text-[#F4511E]">Name</h1> */}
        <Link to="/"><img src={logo} alt="" className="w-12 h-12 lg:hidden md:hidden"/></Link>
        <Link to="/" className=" font-semibold text-gray-600 lg:ml-0 ml-3">
        কাস্টমার UI
        </Link>
      </div>
      
      <div className="flex justify-end items-center gap-3 p-2 relative">
     
  <button
    aria-label="Notifications"
    className="hover:text-gray-500 text-gray-800 transition duration-300 relative"
  >
    <IoMdNotifications size={28} />
    {/* Notification Count Badge */}
    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
      5
    </span>
  </button>

  <Link to="/seller/profile" className=" justify-center items-center hidden lg:flex">
    
    <span
      onClick={() => setCallNotifiction(!callNotifiction)}
      className={`p-1 my-auto relative cursor-pointer  ml-2 `}
    >
      <span className="absolute p-1 rounded-full bg-[#30425a] top-0 right-0"></span>
      <img
      src={ accounts?.logo?accounts?.logo:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gv6VVdtAGLqBK9MXIBOUGJ-hWeVdiiN-3Q&s"
      }
      alt="Relifemart"
      className="mx-auto min-w-[40px] max-w-[36px] rounded-full min-h-[40px] max-h-[36px]"
    />
    </span>
  </Link>
</div>

   

    
    </div>
    <div className="hidden lg:flex items-center justify-center w-full    bg-gray-200 py-2">
      <div className="flex items-center bg-white rounded-full shadow-md w-3/4 max-w-lg">
        {/* Search Icon */}
        {/* <div className="px-3 text-[#42C1CC]">
        <FaImage></FaImage>
        </div> */}
        {/* Input Field */}
        <input
          type="text"
          placeholder=" সার্চ করুন"
          value={searchTerm}
          onChange={handleSearch}
          className="flex-grow outline-none rounded-s-3xl px-4 py-2 text-sm text-[#30425a] placeholder-gray-500"
        />
        {/* Submit Button */ }
        <button className="px-3">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-[#42C1CC]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg> */}
          <img src={seach} alt="search" className="w-6 h-6/"/>
        </button>
      </div>
      

    </div>
 
      <div className="w-full rounded    bg-slate-500 mt-2 px-1 flex justify-start">
        <div className="   bg-gray-400 text-white px-3 py-1"> নোটিশ</div>
        <marquee className="text-white">
  {notice?.content}
</marquee>

      </div>

      {click &&
  (searchData && searchData.length !== 0 ? (
    <div className="absolute min-h-[50px] z-[800] shadow-sm-2 bg-slate-50 p-4 min-w-full">
      {searchData?.map((product, i) => {
        console.log("Mapped Product:", product); // Log each product being mapped

        const data = product.name;
        const product_name = data.replace(/\s+/g, "-").toLowerCase();

        return (
          <Link to={`/seller/product/${product?._id}`} key={i}>
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
  );
}
