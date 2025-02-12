


import React from "react";
import { Link } from "react-router-dom";
import { BsCalendarEvent, BsCreditCard, BsFillBagFill, BsTruck } from "react-icons/bs";
import { FaBoxOpen, FaClock, FaMapMarkerAlt, FaNotesMedical, FaPhoneAlt, FaTags } from "react-icons/fa";
import { RiArrowUpCircleLine, RiMoneyDollarCircleLine, RiPercentLine, RiShoppingCartLine } from "react-icons/ri";
import OrderProgressBar from "../components/OrderProgressBar";

const OrderDetails = ({ order }) => {
  // console.log(order)
  const calculateTotalPurchasePrice = () => {
    return order?.products?.reduce((total, product) => total + (product?.productId?.MainCashDiscountPrice * product?.quantity), 0);
  };

  const calculateTotalProfit = () => {
    // Validate if order and required properties exist
    if (!order || !order.sellingPrice || !order.totalAmount) {
      console.error("Order information is incomplete");
      return 0; // Return 0 if the required data is not available
    }
  
    // Extract necessary data
    const totalPurchasePrice = order.totalAmount; // Total purchase price
    const shippingCharge = order.shippingCharge || 0; // Shipping charge (default 0)
  
    // Calculate total cost
    const total = totalPurchasePrice + shippingCharge;
  
    // Calculate profit
    const grandTotal = order.sellingPrice - total;
  
    return grandTotal;
  };
  
  const calculateProfitPercentage = () => {
    // Validate if required fields exist
    if (!order || !order.sellingPrice || !order.totalAmount) {
      console.error("Order information is incomplete");
      return 0; // Return 0 if data is missing
    }
  
    // Extract necessary values
    const totalPurchasePrice = order.totalAmount; // Buying price
    const shippingCharge = order.shippingCharge || 0; // Shipping cost (default to 0)
    
    // Calculate total cost
    const totalCost = totalPurchasePrice + shippingCharge;
  
    // Calculate profit percentage
    const profitPercentage = ((order.sellingPrice - totalCost) / totalCost) * 100;
  
    // Return profit percentage rounded to 2 decimal places
    return profitPercentage.toFixed(2);
  };
  
  
  
  return (
    <div className="min-h-screen">
      <div className=" mx-auto bg-white overflow-hidden transform transition-all duration-300">
        <div className="px-2 py-8 sm:p-10">
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="bg-[#f45142] p-3 rounded-full">
                <BsFillBagFill size={30} className="text-white" />
              </div>
              <h1 className="ml-3 text-3xl font-bold text-gray-800">
                অর্ডার বিস্তারিত
              </h1>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-500">অর্ডার আইডি</p>
              <p className="text-lg font-semibold text-[#f45142]">#{order.orderId}</p>
              <p className="text-sm text-gray-500 mt-1 flex items-center justify-center sm:justify-end">
                <BsCalendarEvent className="mr-1" />
                Order Date: {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "long",
                })}
              </p>
              <p className="text-sm text-gray-500 mt-1 flex items-center justify-center sm:justify-end">
                <FaClock className="mr-1" />
                Order Time: {new Date(order.createdAt).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <OrderProgressBar currentStatus={order.status} />
            {order.status === 'pending' && (
              <div className='text-center my-2'>
                বর্তমান স্ট্যাটাস: <span className='text-[#f45142]'>
                  {order.status === 'pending' ? 'অর্ডার পেন্ডিং এ আছে' : ''}
                </span>
              </div>
            )}
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <FaBoxOpen className="mr-2 text-[#f45142]" />
              পণ্য বিবরণ
            </h2>
            <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
              {order?.products?.map((product, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 py-4 border-b border-gray-200 last:border-b-0"
                >
                  <img
                    src={product.productId.image[0]}
                    alt={product.productId.name}
                    className="w-24 h-24 object-cover rounded-lg shadow-md"
                  />
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-800 hover:underline">
                      <Link to={`/seller/product/${product.productId._id}`}>
                        {product.productId.name}
                      </Link>
                    </h3>
                    <p className="text-gray-600">
                      ৳{product.productId.MainCashDiscountPrice || product.productId.Mainprice}
                      <span className="mx-2">×</span>
                      {product.quantity}
                    </p>
                  </div>
                  {product.productId.clothingSchema && product.productId.clothingSchema.length > 0 && (
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">সাইজ:</span> {product.size || "N/A"} |{" "}
                        <span className="font-medium">রঙ:</span>{" "}
                        <span
                          className="inline-block w-4 h-4 rounded-full ml-1"
                          style={{ backgroundColor: product.color || "#ccc" }}
                          title={product.color || "N/A"}
                        ></span>
                      </p>
                    </div>
                  )}
                  <p className="text-lg font-semibold text-purple-600">
                    ৳
                    {(
                      (product.productId.MainCashDiscountPrice ||
                        product.productId.Mainprice) * product.quantity
                    ).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 shadow-lg transform transition-all duration-300 hover:scale-105">
      <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center justify-center">
        <RiMoneyDollarCircleLine className="mr-2 text-emerald-600 text-3xl" />
        রিসেলার প্রফিট তথ্য
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-gray-700 flex items-center mb-2">
            <RiShoppingCartLine className="mr-2 text-emerald-600" />
            মোট রিসেলার ক্রয়মূল্য:
          </p>
          <p className="text-2xl font-bold text-emerald-600">৳{order.totalAmount}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-gray-700 flex items-center mb-2">
            <RiMoneyDollarCircleLine className="mr-2 text-emerald-600" />
            মোট কাস্টমার বিক্রয়মূল্য:
          </p>
          <p className="text-2xl font-bold text-emerald-600">৳{order.sellingPrice}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-gray-700 flex items-center mb-2">
            <RiShoppingCartLine className="mr-2 text-emerald-600" />
            শিপিং চার্জ :
          </p>
          <p className="text-2xl font-bold text-emerald-600">৳{order.shippingCharge}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-gray-700 flex items-center mb-2">
            <RiArrowUpCircleLine className="mr-2 text-emerald-600" />
            মোট রিসেলার লাভ:
          </p>
          <p className="text-2xl font-bold text-emerald-600 animate-pulse">৳{calculateTotalProfit()}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md">
          <p className="text-gray-700 flex items-center mb-2">
            <RiPercentLine className="mr-2 text-emerald-600" />
            লাভের শতকরা হার:
          </p>
          <p className="text-2xl font-bold text-emerald-600 animate-pulse">{calculateProfitPercentage()}%</p>
        </div>
      </div>
    </div>
         
          <div className="mt-10 flex flex-col sm:flex-row justify-between items-center bg-indigo-50 rounded-xl p-6">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <BsCreditCard className="text-[#f45142] text-2xl" />
              <span className="text-gray-600">পেমেন্ট স্ট্যাটাস:</span>
              <span className="font-semibold text-gray-800">{order.paymentStatus || "N/A"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <RiMoneyDollarCircleLine className="text-green-500 text-3xl" />
              <p className="text-2xl font-bold text-green-600">
                মোট মূল্য: ৳{calculateTotalPurchasePrice()}
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-purple-50 rounded-xl p-6 shadow-md transform transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaMapMarkerAlt className="mr-2 text-[#f45142]" />
                শিপিং ঠিকানা
              </h2>
              <p className="text-gray-600">District: {order?.shippingAddress?.district}, Division: {order?.shippingAddress?.division}, Upazila: {order?.shippingAddress?.upazila}, Address: {order?.shippingAddress?.address}</p>
              <p className="text-gray-600 mt-2 flex items-center">
                <FaPhoneAlt className="mr-2 text-[#f45142]" />
                {order.phoneNumber}
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-6 shadow-md transform transition-all duration-300 hover:scale-105">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <BsTruck className="mr-2 text-blue-600" />
                শিপিং তথ্য
              </h2>
              <p className="text-gray-600">কুরিয়ার সার্ভিস: {order.courierService || "N/A"}</p>
              <p className="text-gray-600 mt-1">কুরিয়ার চার্জ প্রদান করা হয়েছে?: {order.CustomerDeliveryCharge ? 'হ্যাঁ' : 'না'}</p>
            </div>
          </div>

          <div className="mt-10 bg-yellow-50 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaNotesMedical className="mr-2 text-yellow-600" />
              অতিরিক্ত তথ্য
            </h2>
            <p className="text-gray-600 mb-4">{order.notes || "কোনো নোট নেই"}</p>
            <div className="flex items-center">
              <FaTags className="mr-2 text-yellow-600" />
              <div className="flex flex-wrap gap-2">
                {order.tags && order.tags.map((tag, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;