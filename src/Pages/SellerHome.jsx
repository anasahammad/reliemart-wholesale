import React from 'react';
import { FaBox, FaTruck, FaStore, FaClipboardCheck, FaSmile, FaChartLine, FaChartBar, FaTimesCircle, FaCheckCircle, FaTimes, FaUndo, FaShippingFast } from 'react-icons/fa';
import DashboradChartContainer from '../Component/Pages/Dashboard/DashboradChartContainer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SellerHome = () => {
  const userState = useSelector((state) => state.user);
  const userInfo =
    userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
  const resellerId = userInfo?.user?._id;

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/resellerOrder/orders/seller/${resellerId}`,
        { withCredentials: true }
      );
      return response.data;
    },
  });

  // Current date
  const today = new Date().toISOString().split("T")[0];

  // Process orders
  const pendingOrders = orders.filter((order) => order.status === "pending");
  const processingOrders = orders.filter((order) => order.status === "processing");
  const shippedOrders = orders.filter((order) => order.status === "shipped");
  const deliveredOrders = orders.filter((order) => order.status === "delivered");
  const cancelledOrders = orders.filter((order) => order.status === "canceled");
  const returnOrders = orders.filter((order) => order.status === "return");


  const todayOrders = orders.filter(
    (order) => order.createdAt.split("T")[0] === today
  );


  const todayDeliveries = orders.filter(
    (order) =>
      order.status === "Delivered" && order.updatedAt.split("T")[0] === today
  );

  // Calculate profits and sales
  const totalSales = orders.reduce(
    (acc, order) => acc + (order.totalAmount || 0),
    0
  );
  const totalProfit = orders.reduce(
    (acc, order) => acc + (order.profit || 0),
    0
  );
  const todayProfit = todayOrders.reduce(
    (acc, order) => acc + (order.profit || 0),
    0
  );


  const navigate = useNavigate();

  const handleClick = (showDiv) => {
    navigate("/seller/order-report", { state: { showDiv } });
  };


  
  const data = [
    {
      icon: <FaBox size={22} className="text-yellow-600" />,
      title: "পেন্ডিং অর্ডার",
      value: pendingOrders.length,
      bgColor: "from-yellow-500/90 to-orange-400/90",
      showDiv: "pending",
    },
    {
      icon: <FaTruck size={22} className="text-blue-600" />,
      title: "প্রসেসিং অর্ডার",
      value: processingOrders.length,
      bgColor: "from-blue-500/90 to-cyan-400/90",
      showDiv: "processing",
    },
    {
      icon: <FaClipboardCheck size={22} className="text-green-600" />,
      title: "ডেলিভার অর্ডার",
      value: deliveredOrders.length,
      bgColor: "from-green-500/90 to-emerald-400/90",
      showDiv: "shipped",
    },
    {
      icon: <FaShippingFast size={22} className="text-purple-600" />,
      title: "শিপিং অর্ডার",
      value: shippedOrders.length,
      bgColor: "from-purple-500/90 to-pink-400/90",
      showDiv: "delivered",
    },
    {
      icon: <FaTimesCircle size={22} className="text-red-600" />,
      title: "বাতিল অর্ডার",
      value: cancelledOrders.length,
      bgColor: "from-red-500/90 to-rose-400/90",
      showDiv: "canceled",
    },
    {
      icon: <FaUndo size={22} className="text-orange-600" />,
      title: "রিটার্ন অর্ডার",
      value: returnOrders.length,
      bgColor: "from-orange-500/90 to-yellow-400/90",
      showDiv: "return",
    },
    {
      icon: <FaStore size={22} className="text-teal-600" />,
      title: "আজকের অর্ডার",
      value: todayOrders.length,
      bgColor: "from-teal-500/90 to-green-400/90",
      showDiv: "",
    },
    {
      icon: <FaClipboardCheck size={22} className="text-indigo-600" />,
      title: "আজকের ডেলিভারি",
      value: todayDeliveries.length,
      bgColor: "from-indigo-500/90 to-blue-400/90",
      showDiv: "",
    },
  ];


  const otherData = [ 
    {
      icon: <FaSmile size={22} className="text-yellow-600" />,
      title: "আজকের প্রফিট",
      value: todayProfit.toFixed(2),
      bgColor: "from-yellow-500 to-orange-400",
    },
    {
      icon: <FaChartLine size={22} className="text-blue-600" />,
      title: "সর্বমোট বিক্রয়",
      value: totalSales.toFixed(2),
      bgColor: "from-blue-500 to-indigo-400",
    },
    {
      icon: <FaChartBar size={22} className="text-purple-600" />,
      title: "সর্বমোট প্রফিট",
      value: totalProfit.toFixed(2),
      bgColor: "from-purple-500 to-pink-400",
    },
  ]
  if (isLoading) return <p>Loading...</p>;
  // Dummy Data for Grid Section
  const gridData = [
    { label: "টিম কমিশন", value: "৳ 12,000", bgColor: "bg-blue-100", textColor: "text-blue-600" },
    { label: "ডিফল্টার ব্যালেন্স", value: "৳ 5,000", bgColor: "bg-red-100", textColor: "text-red-600" },
    { label: "সেলস প্রফিট", value: "৳ 20,000", bgColor: "bg-green-100", textColor: "text-green-600" },
    { label: "লেয়ার বেস কমিশন", value: "৳ 8,000", bgColor: "bg-yellow-100", textColor: "text-yellow-600" },
    { label: "ফিউচার ফান্ড", value: "৳ 15,000", bgColor: "bg-purple-100", textColor: "text-purple-600" },
    { label: "ইনসেনটিভ", value: "৳ 10,000", bgColor: "bg-orange-100", textColor: "text-orange-600" },
  ];
  
    return (
        <div>

<div className="  py-3">
      <div className="container mx-auto px-4">
        {/* <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.map((item, index) => (
            <div
            data-aos="fade-up"
              key={index}
              className="flex items-center justify-between    bg-white  p-4 rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center   gap-4">
                {item.icon}
                <div>
                  <h4 className="text-sm font-medium text-black ">{item.title}</h4>
                  <p className="text-lg font-semibold text-black">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div> */}
        <h2 className='text-gradient mb-3 font-semibold text-xl'>Orders History</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {data.map((item, index) => (
            <div
            onClick={() => handleClick(item.showDiv)}
              key={index}
              className={`bg-gradient-to-br ${item.bgColor} p-3 cursor-pointer rounded-lg shadow-lg transform transition duration-500 hover:scale-105`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex items-center justify-between">
                <div className="bg-white p-2 rounded-full">{item.icon}</div>
                <p className="text-3xl font-bold text-white">{item.value}</p>
              </div>
              <h3 className="text-base font-semibold text-white mt-4">{item.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>


             {/* Grid Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {gridData.map((item, index) => (
          <div
           data-aos="flip-left"
            key={index}
            className={`p-4 rounded-lg shadow ${item.bgColor} text-center`}
          >
            <h3 className={`text-lg font-semibold ${item.textColor}`}>
              {item.label}
            </h3>
            <p className="text-2xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>



      <div className="max-w-6xl mx-auto p-6 space-y-6">
   
   </div>
     {/* -------------  */}
     <div className="min-h-screen bg-gray-100 p-4">
     {/* Profile Section */}
     <div className="flex flex-col lg:flex-row gap-4">
       {/* Left Section */}
   


       {/* Right Section */}
       <div className=" ">
       <DashboradChartContainer />
       </div>
     </div>
   </div>
        </div>
    );
}

export default SellerHome;
