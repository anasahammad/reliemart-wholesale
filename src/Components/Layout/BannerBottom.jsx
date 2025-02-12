import React from "react";
import { BiWorld } from "react-icons/bi";
import { MdOutlineDiscount, MdOutlinePayments } from "react-icons/md";
// import { LuBadgeCheck } from "react-icons/lu";
import { FaShoppingBag } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { VscWorkspaceTrusted } from "react-icons/vsc";

import { CgRedo } from "react-icons/cg";
import { Link } from "react-router-dom";

const BannerBottom = () => {
  return (
    <div className='grid lg:grid-cols-4 grid-cols-2 text-center px-2 lg:px-14 gap-6 my-8  md:my-8 '>
    <Link to="/has-offers" className='rounded-xl text-center gap-5 items-center group cursor-pointer'>
      <div className='text-neutral-900 rounded-full  group-hover:text-orange-500'>
        <FaShoppingBag className='text-xl md:text-3xl rounded-full mx-auto text-center' />
      </div>
      <div className='mt-2'>
        <h3 className='md:text-lg text-xs font-semibold mb-2 text-gradient'>সেরা অফার</h3>
     
      </div>
    </Link>
  
    <div className='rounded-xl text-center gap-5 items-center group cursor-pointer'>
      <div className='text-neutral-900 rounded-full  group-hover:text-orange-500'>
        <FaTruck className='text-xl md:text-3xl rounded-full mx-auto text-center' />
      </div>
      <div className='mt-2'>
        <h3 className='md:text-lg text-xs font-semibold mb-2 text-gradient'>দ্রুততম ডেলিভারি</h3>

      </div>
    </div>
  
    <div className='rounded-xl text-center gap-5 items-center group cursor-pointer'>
      <div className='text-neutral-900 rounded-full  group-hover:text-orange-500'>
        <BiSupport className='text-xl md:text-3xl rounded-full mx-auto text-center' />
      </div>
      <div className='mt-2'>
        <h3 className='md:text-lg text-xs font-semibold mb-2 text-gradient'>সেরা সাপোর্ট </h3>
       
      </div>
    </div>
  
    <div className='rounded-xl text-center gap-5 items-center group cursor-pointer'>
      <div className='text-neutral-900 rounded-full  group-hover:text-orange-500'>
        <VscWorkspaceTrusted className='text-xl md:text-3xl rounded-full mx-auto text-center' />
      </div>
      <div className='mt-2'>
        <h3 className='md:text-lg text-xs font-semibold mb-2 text-gradient'>বিশ্বাসযোগ্য রিফান্ড পলিসি</h3>

      </div>
    </div>
  </div>
  
  );
};

export default BannerBottom;
