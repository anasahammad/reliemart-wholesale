import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaCopy, FaList } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const OrderReportTable = () => {
  const userState = useSelector((state) => state.user);
  const location = useLocation();
  const showDiv = location.state?.showDiv ;
  const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
  const resellerId = userInfo?.user?._id;
console.log("div", showDiv)

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/resellerOrder/orders/seller/${resellerId}`, { withCredentials: true });
      return response.data;
    }
  });
console.log(orders)
  const [selectedStatus, setSelectedStatus] = useState(showDiv?showDiv:"");
  // স্ট্যাটাস ফিল্টার
  const [searchTerm, setSearchTerm] = useState(""); // সার্চ ইনপুট

  if (isLoading) return <h1>লোড হচ্ছে...</h1>;

  // ✅ অর্ডার ফিল্টার লজিক
  const filteredOrders = orders.filter(order => {
    const matchStatus = selectedStatus ? order.status.toLowerCase() === selectedStatus.toLowerCase() : true;
    const matchSearch = searchTerm
      ? order._id.includes(searchTerm) ||
        order.phoneNumber.includes(searchTerm) ||
        order.customerName?.includes(searchTerm)  ||
        order.orderId?.includes(searchTerm)
      : true;

    return matchStatus && matchSearch;
  });

  return (
    <div className="p-4">
      {/* ✅ Status Filter Buttons */}
    <div className="flex justify-center items-center gap-2 border border-gray-800 mb-2 w-[120px] mx-auto text-sm font-medium rounded-md px-3 py-1">
      <FaList></FaList> অর্ডার লিস্ট 
    </div>
<div className="lg:max-w-[68%] w-full mx-auto">
      {/* ✅ Search Input */}
      <div className="mb-4 relative">
  <input
    type="text"
    placeholder="অর্ডার আইডি, কাস্টমার ফোন নাম্বার বা কাস্টমার নাম দিয়ে অনুসন্ধান করুন"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full px-4 py-1 pl-10 border border-orange-600 rounded"
  />
  <AiOutlineSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-orange-600 text-xl" />
</div>
  <div className="flex justify-center flex-wrap items-center  gap-2 mb-4">
  <button
          onClick={() => setSelectedStatus("")}
          className={` ${selectedStatus?"background-gradient":"bg-blue-600"} px-4 py-1 text-sm rounded   text-white`} 
        >
         সব
        </button>
        {["pending","processing", "shipped", "delivered","return", "canceled"].map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`px-4 py-1 rounded text-sm ${
              selectedStatus === status ? "bg-blue-600 text-white" : "background-gradient text-white"
            }`}
          >
            {status === "pending" && "পেন্ডিং " }
            {status === "processing" && "প্রোসেসিং  " }
            
            {status === "shipped" && "শিপিং  " }
            {status === "delivered" && "ডেলিভার্ড " }
            {status === "return" && " রিটার্ন " }
            {status === "canceled" && "বাতিল " }
      

          </button>
        ))}
        <button
          onClick={() => setSelectedStatus("")}
          className="px-4 py-1 text-sm rounded  background-gradient text-white"
        >
          Clear
        </button>
      </div>
</div>
      {/* ✅ Order Table */}
      <div className="overflow-x-auto">
        {filteredOrders.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-700 text-white text-sm">
              <tr>
                <th className="px-4 py-2 border">#</th>
                <th className="px-4 py-2 border">অর্ডার নাম্বার</th>
                <th className="px-4 py-2 border">কাস্টমার নাম</th>
                <th className="px-4 py-2 border">কাস্টমার নাম্বার</th>
                <th className="px-4 py-2 border">অর্ডার তারিখ</th>
                <th className="px-4 py-2 border">টোটাল অর্ডার প্রাইস</th>
                <th className="px-4 py-2 border">স্ট্যাটাস</th>
                <th className="px-4 py-2 border">একশন</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders?.map((order, index) => (
                <tr key={order._id} className="text-center border-t">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{order?.orderId}</td>
                  <td className="px-4 py-2 border">{order?.customerName}</td>
                  <td className="px-4 py-2 border">{order?.phoneNumber}</td>
                  <td className="px-4 py-2 border">{new Date(order?.orderDate).toLocaleDateString('en-GB')}</td>
                  <td className="px-4 py-2 border">{order?.sellingPrice}</td>
                  <td className="px-4 py-2 border">
                    <span
                      className={`px-2 py-1 text-sm rounded text-white ${
                        order.status === "delivered"
                          ? "bg-green-500"
                          : order.status === "shipped"
                          ? "bg-blue-500"
                          : order.status === "pending"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order?.status === "pending"  && "পেন্ডিং " }
                    {order?.status === "processing"  && "পেন্ডিং " }
                    
                    {order?.status === "shipped"   && "শিপিং " }
                    {order?.status === "delivered"  && "ডেলিভার্ড " }
                    {order?.status === "return"   && " রিটার্ন " }
                    {order?.status === "canceled"  && "বাতিল " }
                            </span>
                  </td>
                  <td className="px-4 py-2 border">
                    <div className="flex justify-center items-center gap-2">
                      <button className="bg-yellow-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-600">
                        <Link to={`/seller/order/${order?._id}`}>View</Link>
                      </button>
                      <button className="bg-[#F4511E] text-sm text-white px-2 py-1 rounded">
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-center text-red-500 font-bold py-4">
            কোনো অর্ডার পাওয়া যায়নি।
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderReportTable;
