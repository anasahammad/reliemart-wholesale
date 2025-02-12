import React from 'react';
import { FaShoppingBag, FaCalendarAlt, FaTruck, FaCreditCard, FaBox, FaMapMarkerAlt } from 'react-icons/fa';
import Header from '../Components/Layout/Header';

const MyOrdersPage = () => {
  const order = {
    id: "678532273eb87b132fc67d7f",
    orderId: "ORD-65f368a5",
    date: "2025-01-13T15:32:55.365Z",
    status: "pending",
    paymentMethod: "cashOnDelivery",
    product: [
      {
        productId: "676eb30063bb57e45d5fdb77",
        name: "Tracksuit",
        price: 1400,
        quantity: 1,
        image: ["https://i.ibb.co.com/n654Ypg/471180648-567134129428699-3082236786680142745-n.jpg"]
      }
    ],
    shippingOption: "inside"
  };

  return (
    <div >
      <Header />
      <br />
      <br />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
          My <span className="text-[#f45142]">Orders</span>
        </h1>
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden border-t-4 border-[#f45142]">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="bg-[#f45142] p-3 rounded-full mr-4">
                  <FaShoppingBag className="text-3xl text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Order #{order.orderId}</h2>
                  <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>
              <span className="px-4 py-2 text-sm font-semibold text-white bg-[#f45142] rounded-full shadow-md">
                {order.status.toUpperCase()}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <OrderInfoCard icon={FaCalendarAlt} title="Order Date" value={new Date(order.date).toLocaleDateString()} />
              <OrderInfoCard icon={FaTruck} title="Shipping" value={order.shippingOption} />
              <OrderInfoCard icon={FaCreditCard} title="Payment Method" value={order.paymentMethod} />
              <OrderInfoCard icon={FaMapMarkerAlt} title="Delivery Address" value="123 Main St, City, Country" />
            </div>
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FaBox className="mr-2 text-[#f45142]" />
                Order Items
              </h3>
              {order.product.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-center mb-6 bg-gray-50 rounded-lg p-4 hover:shadow-md transition duration-300">
                  <img 
                    src={item.image[0]} 
                    alt={item.name} 
                    className="w-32 h-32 object-cover rounded-md mr-6 mb-4 sm:mb-0"
                  />
                  <div className="flex-grow text-center sm:text-left">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h4>
                    <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                    <p className="text-[#f45142] font-semibold text-xl">৳{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-right">
              <p className="text-lg text-gray-600 mb-2">Total Amount</p>
              <p className="text-4xl font-bold text-[#f45142]">
                ৳{order.product.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="bg-gray-50 px-6 py-6 sm:px-10">
            <button className="w-full bg-[#f45142] text-white py-3 px-6 rounded-md hover:bg-[#d13a2b] transition duration-300 ease-in-out transform hover:scale-105 font-semibold text-lg shadow-lg">
              Track Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const OrderInfoCard = ({ icon: Icon, title, value }) => (
  <div className="bg-gray-50 rounded-lg p-4 flex items-center shadow-sm hover:shadow-md transition duration-300">
    <Icon className="text-2xl text-[#f45142] mr-4" />
    <div>
      <h4 className="text-sm font-semibold text-gray-500 mb-1">{title}</h4>
      <p className="text-lg text-gray-800">{value}</p>
    </div>
  </div>
);

export default MyOrdersPage;