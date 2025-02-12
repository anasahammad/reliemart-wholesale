import { FaArrowRight, FaMeetup, FaSearch, FaSteam, FaWhatsapp, FaYoutube } from "react-icons/fa";
import DashboardTopSlider from "./DashboardTopSlider";
import { FaFacebook } from "react-icons/fa";

import about from "/svg/about.svg"
import balance from "/svg/balance.svg"
import tracking from "/svg/tracking.svg"
import contact from "/svg/contact.svg"
import allProducts from "/svg/products.svg"
import pay from "/svg/pay.svg"
import withdraw from "/svg/withdraw.svg"
import report from "/svg/moneyreport.svg"
import customer from "/svg/customer-service-hotel-svgrepo-com.svg"
import request from "/svg/request-reply-protocol-svgrepo-com.svg"
import review from "/svg/review-svgrepo-com.svg"
import settings from "/svg/guideline.png"
import support from "/svg/support-svgrepo-com.svg"
import track from "/svg/tracking-track-svgrepo-com.svg"
import verify from "/svg/verify-svgrepo-com.svg"
import service from "/svg/d.svg"
import profile from "/svg/profile-svgrepo-com.svg"
import logout from "/svg/logout-2-svgrepo-com.svg"
import faq from "/svg/question.png"
import salary from "/svg/salary.png"
import video from "/svg/video.png"
import search from "/svg/search.png"
 
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


import { useNavigate } from "react-router-dom";
import DashboradChartContainer from "./DashboradChartContainer";
import EmployesOftheYear from "./EmployesOftheYear";
import userProfile from "/svg/userProfile.svg"
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import NitimalaModal from "../../NitimalaModal";
import GroupPage from "../../../Components/GroupPage";
export default function Dashboard() {
  const navigate = useNavigate();
 const [isModalOpen, setIsModalOpen] = useState(false);


  const navItems = [
    
    {
      name: "প্যাসিভ ইনকাম",
      path: "/seller/passive-income",
      icon: salary,
      class: "bg-sky-100",
    },
    {
      name: " অল প্রোডাক্টস",
      path: "/seller/all-product",
      icon: allProducts,
      class: "bg-red-100",
    },{
      name: "সেলস গাইডলাইন",
      path: "/seller/sales-guideline",
      icon: settings,
      class: "bg-sky-100",
    },
    {
      name: "লার্নিং ভিডিও",
      path: "/seller/learning-video",
      icon: video,
      class: "bg-sky-100",
    },
    // {
    //   name: "প্রোফাইল",
    //   path: "/seller/profile",
    //   icon: userProfile,
    //   class: "bg-green-100",
    // },
    {
      name: "ব্যালেন্স",
      path: "/seller/balance",
      icon: balance,
      class: "bg-cyan-100",
    },
    {
      name: "পেমেন্ট সেটিংস",
      path: "/seller/withdraw/payment-setting",
      icon: pay,
      class: "bg-indigo-100",
    },
    {
      name: "উইথড্রো",
      path: "/seller/withdraw/withdraw",
      icon: withdraw,
      class: "bg-orange-100",
    },
    {
      name: "উইথড্রো রিপোর্ট",
      path: "/seller/withdraw/withdraw-report",
      icon: report,
      class: "bg-yellow-100",
    },
    {
      name: "আমাদের সম্পর্কে",
      path: "/seller/about-us",
      icon: about,
      class: "bg-blue-100",
    },
    {
      name: "অর্ডার রিপোর্ট",
      path: "/seller/order-report",
      icon: tracking,
      class: "bg-purple-100",
    },
    {
      name: "অর্ডার ট্র্যাকিং",
      path: "/seller/order-traking",
      icon: track,
      class: "bg-pink-100",
    },
    {
      name: "কাস্টমার চেকার",
      path: "/seller/customer-checker",
      icon: customer,
      class: "bg-emerald-100",
    },
    // {
    //   name: "পণ্য অনুরোধ",
    //   path: "/seller/product-request",
    //   icon: request,
    //   class: "bg-rose-100",
    // },
    {
      name: "বিক্রেতার রিভিউ",
      path: "/seller/seller-review",
      icon: review,
      class: "bg-teal-100",
    },
   
    
    
    {
      name: "সেবা",
      path: "/seller/service",
      icon: service,
      class: "bg-lime-100",
    },
    {
      name: "সাপোর্ট",
      path: "/seller/support",
      icon: support,
      class: "bg-amber-100",
    },
    {
      name: "ভেরিফিকেশন",
      path: "/seller/verifection",
      icon: verify,
      class: "bg-neutral-100",
    },
    {
      name: "সাধারণ জিজ্ঞাসা",
      path: "/seller/faq",
      icon: faq,
      class: "bg-neutral-100",
    },
    // {
    //   name: "লগআউট",
    //   path: "/seller/logout",
    //   icon: logout,
    //   class: "bg-gray-100",
    // }

  ];




  return (
    <div className="w-full relative">
      
      <div className="w-full lg:my-4    md:w-[calc(100vw-250px)] 2xl:w-[calc(100vw-300px)]">
        <DashboardTopSlider />
  
      <div className="flex items-center  absolute    top-[140px] inset-x-0 md:hidden lg:hidden  mt-3 mx-auto bg-[#F4511E] rounded-xl shadow-md w-4/5 z-[1000] max-w-lg">

        <input
          type="text"
          placeholder=" সার্চ করুন"
          className="flex-grow outline-none rounded-s-xl bg-white px-4 py-2 border-orange-500  text-sm text-[#30425a] placeholder-gray-500"
        />
        {/* Submit Button */}
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
          <CiSearch className="text-white" size={20} />
        </button>
      </div>

      </div>
      <div onClick={()=>setIsModalOpen(true)} className="flex items-center cursor-pointer justify-center gap-2 p-1 mt-10 lg:mt-5 bg-orange-500 rounded-lg w-[80%] mx-auto ">
      <h1 className="text-white">রিসেলার নীতিমালা</h1>
      <FaArrowRight className="ml-2 text-white" size={20} />
    </div>
    
      <div  className=" lg:grid hidden  lg:grid-cols-4 grid-cols-2 gap-3  my-10 overflow-y-hidden">
  {navItems?.map((item, idx) => (

 
      <div
        key={idx}
      
        onClick={() => navigate(item.path)}
        className={`${item.class}   p-3 py-3    text-black   shadow-base  hover:shadow-sm text-base cursor-pointer rounded-md border flex justify-between items-center`}
      >
        <h2>{item.name}</h2>
        <span
          className="w-[40px] h-[40px]  rounded-full  flex justify-center  items-center"
        >
          <img src={item.icon} className="w-6 h-6" alt={item.name} />
        </span>
      </div>
    
  ))}
</div>

<div className="grid  lg:hidden grid-cols-6 gap-2 px-2 my-3">
  {navItems?.map((item, index) => (
 
      // Render other nav items
      <div   key={index}
      onClick={() => navigate(item.path)} >
            <div className={`${item.class} w-[50px] h-[50px] flex  justify-center items-center 
             border-2 border-[#F4511E] shadow-lg rounded-full hover:shadow-sm cursor-pointer`}

       data-aos="fade-down"
      >
        <div  className={`w-[40px] h-[40px] flex flex-col justify-center items-center    ${item.class} shadow-lg rounded-full hover:shadow-sm cursor-pointer`}>
        <img src={item.icon} className="w-[26px] h-[26px]" alt={item.name} />
        </div>
     
      </div>
        <div>
       <p className="mt-1 text-[8px] text-center text-gray-700">{item.name}</p>
       </div>
      </div>
  
    
  ))}
</div>


      <div className="w-full my-12  md:w-[calc(100vw-320px)] 2xl:w-[calc(100vw-300px)]">
        <EmployesOftheYear />
      </div>

     
      <GroupPage />
 <NitimalaModal isOpen={isModalOpen}  onClose={() => setIsModalOpen(false)}/>
    </div>
  );
}