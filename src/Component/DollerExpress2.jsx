import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Slider from "react-slick";


const CustomArrow = ({ onClick, direction }) => (
  <button
    className={`absolute top-[-50px] ${
      direction === "left" ? "right-16" : "right-2"
    } bg-red-500 text-white p-2 rounded-full shadow-md hover:bg-red-600 z-10`}
    onClick={onClick}
  >
    {direction === "left" ? <IoIosArrowBack /> : <IoIosArrowForward />}
  </button>
);

const CustomArrow2 = ({ onClick, direction }) => (
  <button
    className={`absolute top-[-50px] ${
      direction === "left" ? "right-16" : "right-2"
    } bg-yellow-500 text-white p-2 rounded-full shadow-md hover:bg-yellow-600 z-10`}
    onClick={onClick}
  >
    {direction === "left" ? <IoIosArrowBack /> : <IoIosArrowForward />}
  </button>
);

const DollarExpress2 = () => {

  const [popularProducts, setPopularProducts] = useState([]);
  const [seasonalProducts, setSeasonalProducts] = useState([]);

  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const response = await fetch('https://reseller-backend-zeta.vercel.app/api/v4/products/products/collection/Limited Edition');
        const data = await response.json();

        if (response.ok) {
          setPopularProducts(data.products);
        } else {
          console.error('Error fetching Limited Edition:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch Popular Products:', error);
      }
    };

    fetchPopularProducts();
  }, []);

  useEffect(() => {
    const fetchSeasonalProducts = async () => {
      try {
        const response = await fetch('https://reseller-backend-zeta.vercel.app/api/v4/products/products/collection/Exclusive');
        const data = await response.json();

        if (response.ok) {
          setSeasonalProducts(data.products);
        } else {
          console.error('Error fetching Popular Products:', data.error);
        }
      } catch (error) {
        console.error('Failed to fetch Popular Products:', error);
      }
    };

    fetchSeasonalProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: popularProducts?.length > 3, // যদি পণ্যের সংখ্যা ৩-এর বেশি হয় তখনই Infinite Scroll হবে
    speed: 500,
    slidesToShow: popularProducts?.length < 3 ? popularProducts?.length : 3, // কম পণ্য থাকলে সেই সংখ্যাই দেখাবে
    slidesToScroll: 1,
    nextArrow: <CustomArrow direction="right" />,
    prevArrow: <CustomArrow direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: popularProducts?.length < 2 ? popularProducts?.length : 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };
  

  const settings2 = {
    dots: false,
    infinite: seasonalProducts?.length > 3, // যদি পণ্যের সংখ্যা ৩-এর বেশি হয় তখনই Infinite Scroll হবে
    speed: 500,
    slidesToShow: seasonalProducts?.length < 3 ? seasonalProducts?.length : 3, // কম পণ্য থাকলে সেই সংখ্যাই দেখাবে
    slidesToScroll: 1,
    nextArrow: <CustomArrow2 direction="right" />,
    prevArrow: <CustomArrow2 direction="left" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: seasonalProducts?.length < 2 ? seasonalProducts?.length : 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };


  return (

   <div className="w-[95%] mx-auto ">
     
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5  mt-5 md:mt-10">
    

      {/* Box 1 */}
      <div className="bg-yellow-100 p-4 rounded-lg relative">
        <h2 className="text-lg sm:text-xl font-bold mb-2">    Limited Edition</h2>
        <p className="text-sm sm:text-base text-gray-700 mb-4">
          shop now
        </p>
  {seasonalProducts.length === 0 &&  <h2 className="text-center text-gray-500 mt-4">কোন পণ্য পাওয়া যায়নি</h2> }  
        {/* Slider Container */}
    <div className="relative">
        <Slider {...settings2}>
                {seasonalProducts?.map((product, index) => (
                  <div key={index} className={`p-1 ${seasonalProducts.length === 1 ? 'w-full' : ''}`}>
                    <div className="bg-white rounded-md transition transform hover:-translate-y-1">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={product.image[0]}
                          alt={product.title}
                          loading="lazy"
                          className="w-full h-36 sm:h-40 object-cover rounded-t-md"
                        />
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-sm">
                        Limited Edition
                        </span>
                      </div>

                      {/* Product Details */}
                      <div className="mt-2 px-2 sm:px-3">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-800">
                          {product?.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {/* {product.sold} sold · ⭐ {product.rating} */}
                        </p>
                        <div className="mt-2 flex items-baseline">
                          <span className="text-sm sm:text-lg font-bold text-red-500">
                          ৳{product?.MainCashDiscountPrice}
                          </span>
                        {product?.Mainprice &&  <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">
                          ৳{product?.Mainprice}
                          </span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
        </div>
      </div>

        {/* Box 2 */}
        <div className="bg-red-100 p-4 rounded-lg relative">
        <h2 className="text-lg sm:text-xl font-bold mb-2">Exclusive</h2>
        <p className="text-sm sm:text-base text-gray-700 mb-4">
          shop now
        </p>
        {popularProducts.length === 0 &&  <h2 className="text-center text-gray-500 mt-4">কোন পণ্য পাওয়া যায়নি</h2> }
        {/* Slider Container */}
        <div className="relative">
              <Slider {...settings}>
                {popularProducts?.map((product, index) => (
                  <div key={index} className={`p-1 ${popularProducts.length === 1 ? 'w-full' : ''}`}>
                    <div className="bg-white rounded-md transition transform hover:-translate-y-1">
                      {/* Product Image */}
                      <div className="relative">
                        <img
                          src={product.image[0]}
                          alt={product.title}
                          loading="lazy"
                          className="w-full h-36 sm:h-40 object-cover rounded-t-md"
                        />
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-sm">
                        Exclusive
                        </span>
                      </div>

                      {/* Product Details */}
                      <div className="mt-2 px-2 sm:px-3">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-800">
                          {product?.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {/* {product.sold} sold · ⭐ {product.rating} */}
                        </p>
                        <div className="mt-2 flex items-baseline">
                          <span className="text-sm sm:text-lg font-bold text-red-500">
                          ৳{product?.MainCashDiscountPrice}
                          </span>
                        {product?.Mainprice &&  <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">
                          ৳{product?.Mainprice}
                          </span>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

      </div>
    </div>
   </div>
  );
};

export default DollarExpress2;
