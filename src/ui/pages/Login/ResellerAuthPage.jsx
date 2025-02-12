import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Login from "./Login";
import ResellerSignup from "./ResellerSignup";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ResellerAuthPage = () => {
  const [index, setIndex] = useState(0);
  const [fix, setFix] = useState(false);
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    
  };

  


  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    toast.error("তুমি ইতিমধ্যে রেজিস্ট্রেশন করেছো");
  };

  const {data:photos = []} = useQuery({
    queryKey: ["photos"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/cover`, { withCredentials: true });
      return response.data;
    }
  })
  return (
    <div className="min-h-screen bg-gradient-to-br lg:mb-0 mb-6 from-blue-100 to-purple-100 p-4 md:p-8 flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 lg:p-8 p-4">
            <h2 className="lg:text-2xl text-base font-bold text-gray-800 lg:mb-6 mb-3">ওয়েলকাম রিসেলার!</h2>
            <Slider {...sliderSettings} 
            {...(photos.length === 1 && {
    dots: false, // Disable dots
    arrows: false, // Disable arrows
    autoplay: false,
    infinite:false, // Stop autoplay
  })} className="mb-8">
              {photos?.map((img, idx) => (
                <div key={img._id} className=" w-full h-64 lg:h-64 md:h-48 sm:h-40 flex items-center justify-center">
                  <img src={img.bannerPhoto} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                </div>
              ))}
            </Slider>
            <div className="lg:space-y-4 space-y-2">
              <p className="text-orange-600 font-semibold lg:text-base text-xs">আমাদের প্ল্যাটফর্মে যোগ দিন এবং আজই বিক্রি শুরু করুন!</p>
              <ul className="list-disc font-medium list-inside text-gray-700 lg:text-sm text-[10px]">
                <li>বিভিন্ন ধরনের পণ্যের অ্যাক্সেস</li>
                <li>প্রতিযোগিতামূলক মূল্য নির্ধারণ</li>
                <li>সহজ ব্যবহারের ড্যাশবোর্ড</li>
                <li>২৪/৭ সাপোর্ট</li>
              </ul>
            </div>

          </div>
          <div className="w-full md:w-1/2 bg-gray-50 p-3 md:p-6 relative">
            <div className="flex justify-center lg:mb-6 mb-2 lg:text-base text-sm">
              <button
                className={`px-6 lg:py-2 py-1 text-center transition-all duration-200 ease-in-out ${
                  index === 0
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-orange-700 hover:bg-gray-300"
                } rounded-l-full`}
                onClick={() => setIndex(0)}
              >
                Login
              </button>
              {fix === true ? (
                    <button
                    onClick={handleClick}
                    // disabled={isClicked}
                    title="তুমি ইতিমধ্যে রেজিস্ট্রেশন করেছো"
                    className={`px-6 lg:py-2 py-1 text-center transition-all duration-200 ease-in-out ${
                      index === 1
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 text-orange-700 hover:bg-gray-300"
                    } rounded-r-full`}
                  >
                  Signup
                  </button>
              ):(
                <button
                className={`px-6 lg:py-2 py-1 text-center transition-all duration-200 ease-in-out ${
                  index === 1
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-orange-700 hover:bg-gray-300"
                } rounded-r-full`}
                onClick={() => setIndex(1)}
              >
                Signup
              </button>
              )
               
            }
              {isClicked && (
        <Tooltip
          content="তুমি রেজিস্ট্রেশন করেছো কিছু সময় আগে, এবার Login করো"
          className="absolute bottom-0 left-0 translate-x-[-50%] translate-y-[100%] bg-gray-800 text-white p-2 rounded"
        />
      )}
            </div>
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {index === 0 && <Login />}
              {index === 1 && <ResellerSignup setIndex={setIndex} setFix={setFix} />}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ResellerAuthPage;