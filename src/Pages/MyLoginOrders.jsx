import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaBox, FaTruck, FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import { useSelector } from 'react-redux';



const OrderProgressBar = ({ status }) => {
  const steps = ['pending', 'processing', 'shipped', 'delivered'];
  const currentStep = steps.indexOf(status);

  return (
    <div className="flex items-center w-full mb-4">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className={`flex items-center ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}>
            {index === 0 && <FaBox className="w-5 h-5" />}
            {index === 1 && <FaBox className="w-5 h-5" />}
            {index === 2 && <FaTruck className="w-5 h-5" />}
            {index === 3 && <FaCheckCircle className="w-5 h-5" />}
            <span className="ml-2 text-sm font-medium">{step.charAt(0).toUpperCase() + step.slice(1)}</span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-1 mx-2 ${index < currentStep ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 transition-all duration-300 hover:shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Order #{order.orderId}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
          order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
          'bg-green-100 text-green-800'
        }`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>
      <OrderProgressBar status={order.status} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
          <p className="text-sm text-gray-600">Total: ${order.total.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Shipping Address:</p>
          <p className="text-sm text-gray-800">{order.customerAddress}</p>
        </div>
      </div>
      <div className="mt-4">
        <h4 className="font-medium text-gray-800 mb-2">Products:</h4>
        {order.product.map((item, index) => (
          <div key={index} className="flex items-center mb-2">
            <img src={item.image[0] || "/placeholder.svg"} alt={item.name} className="w-16 h-16 object-cover rounded-md mr-4" />
            <div>
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-600">Price: ${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const MyLoginOrders = () => {
    const userId = useSelector((state) => state.customer.customerInfo.user._id);
  const { data: orders, isLoading, isError } = useQuery({
    queryKey: ['login-orders', userId],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order/orders/customer/${userId}`);
      return data.orders;
    },
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 mt-10">
        <p>Error loading orders. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Orders</h1>
        {orders?.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyLoginOrders;