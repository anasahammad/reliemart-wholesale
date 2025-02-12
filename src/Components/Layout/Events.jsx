import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { fetchWholesaleProducts } from "../../services/index/products";
import { Link } from "react-router-dom";





// Main Component
const Sale = () => {
  
  const calculateTimeLeft = () => {
    const now = new Date();
    const eventDate = new Date(now);
    eventDate.setDate(now.getDate() + 3); // 3 দিন পরের সময় সেট করা

    const diff = eventDate - now;

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categoriesData'],
    queryFn: async () => {
      const response = await axios.get(
        `https://reseller-backend-zeta.vercel.app/api/v4/category`
      );
      return response.data;
    },
  });

  // 🛒 Fetch Wholesale Products
  const {
    data: wholesaleData,
    isLoading: isWholesaleLoading,
    isError: isWholesaleError,
    error: wholesaleError,
  } = useQuery({
    queryKey: ['wholesaleProducts'],
    queryFn: fetchWholesaleProducts,
  });

  // 🚦 Loading State
  if (isCategoriesLoading || isWholesaleLoading) {
    return <p>Loading data...</p>;
  }

  // 🚦 Error State
  if (isCategoriesError) {
    return <p>Error loading categories: {categoriesError.message}</p>;
  }

  if (isWholesaleError) {
    return <p>Error loading wholesale products: {wholesaleError.message}</p>;
  }

  return (
    <div className="mt-20 p-1 w-[95%] mx-auto">
      
      <h1 className="lg:text-2xl text-xl font-bold text-gray-900 font-[Delius]"  data-aos="fade-right">Shop by category</h1>

      <div className="grid md:grid-cols-2 gap-3 mt-7">
          
          <div className="bg-orange-100 rounded-md pt-8">

            {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Whole Sale Product</h1>
        <p className="text-lg text-gray-600 mt-2">Your fashion choice</p>
        <Link to="/wholesale-products" className="bg-black text-white px-6 py-2 mt-4 rounded-md hover:bg-gray-800">
          Shop now
        </Link>
      </div>


              {/* Sale Products Section */}
      <div className="grid grid-cols-3  md:grid-cols-3 gap-2 px-3 mb-12">
      {wholesaleData?.slice(0, 3).map((product) => (
          <div key={product._id} className=" bg-[#fbfbfb] rounded-lg overflow-hidden">
            <img src={product.image[0]} alt="Product" className="w-full object-cover h-[180px]" />
            <div className="p-4">
              {/* <p className="text-lg font-semibold text-gray-800">
                   ৳{product?.MainCashDiscountPrice}
                <span className="line-through text-gray-500">  ৳{product?.Mainprice}</span>
              </p> */}
              <p className="text-orange-500 mt-1 flex items-center gap-1">
              {product?.name}
              </p>
            </div>
          </div>
        ))}
      </div>
          </div>

      {/* Categories Section */}
      <div className=" mx-auto p-6 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-2">🔥 সীমিত সময়ের বিশেষ অফার! 🔥</h2>
      <p className="text-lg">এখনই কিনুন & বিশাল ছাড় উপভোগ করুন!</p>
      
      <div className="flex justify-center items-center space-x-4 my-4">
        {["দিন", "ঘন্টা", "মিনিট", "সেকেন্ড"].map((unit, index) => {
          const values = [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds];
          return (
            <div key={index} className="bg-white text-black px-4 py-2 rounded-lg shadow-md text-xl font-bold">
              {values[index]} <span className="text-sm font-medium">{unit}</span>
            </div>
          );
        })}
      </div>

      <img
        src="/banner1.png" // Change this to actual offer image
        alt="Special Offer"
        className="w-full h-40 object-cover rounded-lg shadow-md"
      />

      <Link to="/has-offers" className="mt-6 px-6 py-2 bg-white text-red-500 font-bold rounded-lg shadow-lg text-lg hover:bg-red-600 hover:text-white transition-all">
        এখনই কিনুন
      </Link>
    </div>
      </div>
    </div>
  );
};

export default Sale;
