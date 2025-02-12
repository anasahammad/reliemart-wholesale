

import { useState, useEffect } from "react"
import {
  FaShoppingBag,
  FaCalendarAlt,
  FaTruck,
  FaBox,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
  FaSearch,
  FaStore,
} from "react-icons/fa"
import Header from "../Components/Layout/Header"
import { useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { getUserByIdForUser } from "../services/index/users"
import Loader from "../Component/Default/Loader"


const MyOrders = () => {
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const userState = useSelector((state) => state.user)
  const userInfo = userState?.customerInfo || JSON.parse(localStorage.getItem("customerAccount"))
  const userId = userInfo?.user?._id
  const [accounts, setAccounts] = useState(null);
 useEffect(() => {
   const fetchUser = async () => {
     try {
       const userData = await getUserByIdForUser(userId);
       console.log('user ',userData);
       setAccounts(userData);
     } catch (err) {
       // setError(err.message);
     }
   };
 
   fetchUser();
 }, [userId]);
  const {data:orders=[], isLoading} = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/wholeSaleCustomer/order/${accounts._id}`)
      console.log('my orders ',response.data)
      return response.data}
      
  })

  console.log('my orders', orders, accounts)
  const toggleOrderExpansion = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId)
  }

  const filteredOrders = orders?.filter(
    (order) =>
      order?.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order?.status?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  if(isLoading) return <Loader />
  return (
    <div className="">
      <Header />
      <br />
      <br />
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8">
          My{" "}
          <span className="text-[#f45142] relative">
            Wholesale Orders
            <span className="absolute bottom-0 left-0 w-full h-1 bg-[#f45142] transform -skew-x-12"></span>
          </span>
        </h1>

        {filteredOrders?.length === 0 ? (
          <div className="bg-white shadow-lg rounded-lg p-8 text-center">
            <FaShoppingBag className="text-6xl text-[#f45142] mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">You haven't placed any wholesale orders yet.</h2>
            <p className="text-gray-500 mb-4">When you do, they'll appear here.</p>
            <button className="bg-[#f45142] text-white py-2 px-6 rounded-full hover:bg-[#d13a2b] transition duration-300">
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search orders..."
                className="w-full p-4 pr-12 h-10 rounded-full border-2 border-[#f45142] focus:outline-none focus:ring-2 focus:ring-[#f45142] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#f45142]" />
            </div>

            {orders?.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-2xl rounded-lg overflow-hidden border-t-4 border-[#f45142] mb-8 transform transition-all duration-300 hover:scale-102 hover:shadow-3xl"
              >
                <div className="p-3 bg-gradient-to-r from-white to-gray-100">
                  <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <div className="flex items-center mb-4 sm:mb-0">
                      <div className="bg-[#f45142] p-3 rounded-full mr-4 shadow-lg">
                        <FaStore className="text-2xl text-white" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-800">Order #{order._id.slice(-6)}</h2>
                        <p className="text-sm text-gray-500">
                          Placed on {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 text-sm font-semibold text-white rounded-full shadow-md ${
                        order.status.toLowerCase() === "pending"
                          ? "bg-yellow-500"
                          : order.status.toLowerCase() === "shipped"
                            ? "bg-blue-500"
                            : "bg-green-500"
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-semibold text-[#f45142]">Quantity: {order.productQuantity}</p>
                    <button
                      onClick={() => toggleOrderExpansion(order._id)}
                      className="text-[#f45142] hover:text-[#d13a2b] transition duration-300 transform hover:scale-110"
                    >
                      {expandedOrder === order._id ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
                    </button>
                  </div>
                </div>
                {expandedOrder === order._id && (
                  <div className="px-6 pb-6 bg-gradient-to-b from-gray-100 to-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <OrderInfoCard
                        icon={FaCalendarAlt}
                        title="Order Date"
                        value={new Date(order.createdAt).toLocaleDateString()}
                      />
                      <OrderInfoCard icon={FaMapMarkerAlt} title="Delivery Address" value={order.address} />
                      <OrderInfoCard icon={FaStore} title="Company Name" value={order.companyName} />
                      <OrderInfoCard icon={FaTruck} title="Business Type" value={order.businessType} />
                    </div>
                    <div className="border-t-2 border-dashed border-[#f45142] pt-6">
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                        <FaBox className="mr-2 text-[#f45142]" />
                        Order Details
                      </h3>
                      <div className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 border border-gray-200">
                        <img
                          src={order.productId.image[0] || "/placeholder.svg"}
                          alt={order.productId.name}
                          className="w-full h-48 object-cover rounded-md mb-4 border-2 border-[#f45142]"
                        />
                        <h4 className="text-lg font-semibold text-gray-800">{order.productId.name}</h4>
                        <p className="text-gray-600">SKU: {order.productId.sku}</p>
                        <p className="text-gray-600">Quantity: {order.productQuantity}</p>
                        <p className="text-[#f45142] font-semibold text-xl mt-2">
                          Wholesale Price: ৳
                          {order.productId.wholeSalePrice.find((wp) => wp.minQuantity === order.productQuantity)
                            ?.pricePerUnit || "N/A"}
                        </p>
                        <p className="text-gray-500 mt-2">{order.productId.description}</p>
                      </div>
                    </div>
                    <div className="mt-6">
                      <button className="w-full bg-[#f45142] text-white py-3 px-6 rounded-full hover:bg-[#d13a2b] transition duration-300 ease-in-out transform hover:scale-105 font-semibold text-lg shadow-lg flex items-center justify-center">
                        <FaTruck className="mr-2" /> Track Order
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

const OrderInfoCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white rounded-lg p-4 flex items-center shadow-md hover:shadow-lg transition duration-300 border border-gray-200">
    <Icon className="text-2xl text-[#f45142] mr-4" />
    <div>
      <h4 className="text-sm font-semibold text-gray-500">{title}</h4>
      <p className="text-lg text-gray-800">{value}</p>
    </div>
  </div>
)

export default MyOrders

