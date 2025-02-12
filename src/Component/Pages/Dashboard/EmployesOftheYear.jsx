// import Swiper core and required modules
import { Navigation, Pagination,  A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const EmployesOftheYear = () => {
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    // বাংলাদেশের সময় অনুযায়ী বর্তমান মাসের নাম বাংলায় বের করা
    const bangladeshTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Dhaka' });
    const currentMonthName = new Date(bangladeshTime).toLocaleString('default', { month: 'long' });

    // মাসের নাম বাংলায় রূপান্তর
    const monthNamesInBengali = {
      January: 'জানুয়ারি',
      February: 'ফেব্রুয়ারি',
      March: 'মার্চ',
      April: 'এপ্রিল',
      May: 'মে',
      June: 'জুন',
      July: 'জুলাই',
      August: 'আগস্ট',
      September: 'সেপ্টেম্বর',
      October: 'অক্টোবর',
      November: 'নভেম্বর',
      December: 'ডিসেম্বর',
    };

    setCurrentMonth(monthNamesInBengali[currentMonthName]);
  }, []);

  const { data: employees = [], isLoading, isError } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/reseller/all-reseller/best-sellers`);
       console.log(response.data)
        return response.data.data;
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        throw new Error("Error fetching employees");
      }
    }
  });
  
  return (
    <div        data-aos="zoom-out" className="w-full scroll-animation">
      <div className="pb-2">
   <strong><span className='text-green-500'>{currentMonth}</span> মাসের সেরা কর্মচারী</strong>
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={16}
        modules={[Navigation, Pagination, A11y]}
    
        navigation
        pagination={{ clickable: true }}
      
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {employees?.map((item) => (
          <SwiperSlide
            className="w-full border bg-white justify-center rounded-md p-4 shadow-md flex flex-col items-center"
            key={item._id}
 
          >
            <img
            src={item?.logo && item.logo.trim() !== "" && item.logo !== "No logo" ? item.logo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gv6VVdtAGLqBK9MXIBOUGJ-hWeVdiiN-3Q&s'}


              alt={item.name}
              className="w-full rounded-md h-[180px] mb-4"
            />
            <div className="w-full flex flex-col justify-center items-center">
              <h3 className="text-lg text-[#F4511E] font-bold">{item.name}</h3>
              <p className="text-gray-700 text-sm">Total Orders: {item.totalOrders}</p>
               <p className="text-green-600 text-xs font-semibold">Total order price: {item.totalEarn}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default EmployesOftheYear;


