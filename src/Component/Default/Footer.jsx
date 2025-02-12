import { FaHome, FaUserAlt, FaEllipsisH, FaTag } from 'react-icons/fa';
import SiteNavBar from './RootCommon/SiteNavBar';
import { useState } from 'react';
import { IoReorderFourSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import service from "/svg/d.svg"
export default function Footer({ handleCallNav }) {
  const [callNav, setCallNav] = useState(false);  
  
 
  const toggleSidebar = () => {
    setCallNav(!callNav);
    handleCallNav(!callNav);   
  };

  return (
    <>
      <div className="w-full lg:hidden md:hidden flex justify-between items-center h-[55px] border-t bg-[#F4511E] px-3 fixed bottom-0">
        {/* Menu Button */}
        <div onClick={toggleSidebar} className="flex flex-col gap-1 w-[20%] items-center justify-center cursor-pointer  ">
          <IoReorderFourSharp size={20} className="text-white" />
          <span className="text-[10px] text-white">মেনু  </span>
        </div>
<div className='h-[40px] my-auto w-[1px] bg-gray-100' ></div>
        {/* Home Button */}
        <div className="flex flex-col gap-1 w-[20%] items-center cursor-pointer justify-center ">
          <FaHome size={20} className="text-white" />
          <Link to="/seller/dashboard"><span className="text-[10px] text-white">হোম</span></Link>
        </div>
        <div className='h-[40px] my-auto w-[1px] bg-gray-100' ></div>
        {/* Offer Button */}
        <div className="flex flex-col gap-1 w-[20%] items-center cursor-pointer justify-center">
          <FaTag size={20} className="text-white" />
          
         <Link to="/seller/service"> <span className="text-[10px] text-white">সার্ভিস</span></Link>
        </div>
        <div className='h-[40px] my-auto w-[1px] bg-gray-100' ></div>
        {/* Account Button */}
        <div  className="flex flex-col gap-1 w-[20%] items-center cursor-pointer justify-center">
          <FaUserAlt size={20} className="text-white" />
          <Link to="/seller/profile"><span className="text-[10px] text-white">অ্যাকাউন্ট</span></Link>
        </div>
      </div>

      {/* Sidebar */}
      <div
      onClick={toggleSidebar}  
        className={`w-full  lg:hidden md:hidden ${
          callNav ? "left-0" : "-left-[100%]"
        } absolute md:static z-[999999999] min-w-[240px] sm:max-w-[255px] border-0 sm:border-r min-h-screen overflow-y-auto`}
      >
        <span
          onClick={toggleSidebar}   
          className="p-1 block md:hidden text-xl text-white bg-red-500 cursor-pointer rounded-md absolute top-2 right-24 border"
        >
          X
        </span>
        <SiteNavBar handleCallNav={handleCallNav} />
      </div>
    </>
  );
}
