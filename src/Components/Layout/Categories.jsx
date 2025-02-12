



import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Categories = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  // Function to scroll the carousel
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 400; // Adjust scroll distance

      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth", // Smooth scrolling effect
      });
    }
  };

  const {data:categoriesData , isLoading} = useQuery({
    queryKey: "categoriesData",
    queryFn: async () => {
      const response = await axios.get(`https://reseller-backend-zeta.vercel.app/api/v4/category`);
     console.log(response)
      return response.data;
    },
  })

  return (
    <div className="w-[95%] mx-auto py-8 relative md:mt-10">
      {/* Section Title */}
      <div className="text- mb-8">
        <h2 className="lg:text-2xl text-xl font-bold text-gray-900 font-[Delius]"  data-aos="fade-right">Our Collections</h2>
      </div>

      {/* Carousel Container */}
      <div className="relative bg-white overflow-auto scrollbar-hide rounded-lg">
        {/* Scrollable Categories */}
        <div
          ref={scrollRef}
          className="flex overflow-auto space-x-0 scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
        >
          {categoriesData &&
            categoriesData?.map((data) => (
              <div
                key={data._id}
                className="flex-shrink-0 w-[80px] top-2 relative md:w-[140px] flex flex-col items-center cursor-pointer snap-center group transition-transform duration-300 ease-in-out hover:scale-105"
                onClick={() => navigate(`/products/category/${data.name}`)}
              >
                <div className="w-[80px] h-[80px] relative  md:w-[80px] md:h-[80px] rounded-full bg-gray-100 shadow-lg flex items-center justify-center overflow-hidden hover:shadow-xl transition-all duration-300 object-cover">
                  <img
                    src={data.photo}
                    alt={data.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="relative w-full flex justify-center items-center">
  <h4
    className="mt-3 text-base font-medium text-gray-800 flex items-center space-x-2 relative transition-all duration-300 ease-in-out"
  >
    <span className="block text-sm transition-transform duration-300 ease-in-out mr-2 group-hover:translate-l-3">
      {data.name}
    </span>
    {/* Right Arrow visible on hover */}
    <FaArrowRight
      className="text-orange-500 text-sm opacity-0 absolute left-full ml-1 top-1/2 mt-[1px] transform -translate-y-1/2 group-hover:opacity-100 group-hover:translate-x-[-50%] transition-all duration-300 ease-in-out"
    />
  </h4>
</div>

              </div>
            ))}
        </div>

        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/3 md:top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 rounded-full p-3 shadow-lg z-10 transition-all duration-300 ease-in-out"
        >
          <span className="text-xl text-white">
            <IoIosArrowBack />
          </span>
        </button>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/3 md:top-1/2 transform -translate-y-1/2 bg-orange-500 hover:bg-orange-600 rounded-full p-3 shadow-lg z-10 transition-all duration-300 ease-in-out"
        >
          <span className="text-xl text-white mt-1">
            <IoIosArrowForward />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Categories;
