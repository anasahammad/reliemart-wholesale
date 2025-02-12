import React from 'react';
import { FiPackage, FiDollarSign, FiInfo, FiShoppingCart, FiMapPin, FiPhone, FiTag, FiTruck, FiCalendar, FiClock } from 'react-icons/fi';

const SellerOrderDetails = ({order}) => {
  

  const product = order.products[0].productId;
  

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-wrap justify-between items-center mb-4">
            <span className="text-gray-600">Order ID: {order._id}</span>
            <span className="text-gray-600">Order Date: {new Date(order.orderDate).toLocaleString()}</span>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-6">
              <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <FiPackage className="mr-2 text-indigo-600" />
                  <span>Status: {product.status}</span>
                </div>
                <div className="flex items-center">
                  <FiDollarSign className="mr-2 text-indigo-600" />
                  <span>Price: ${product.resellerPrice}</span>
                </div>
                <div className="flex items-center">
                  <FiInfo className="mr-2 text-indigo-600" />
                  <span>Stock: {product.stock}</span>
                </div>
                <div className="flex items-center">
                  <FiShoppingCart className="mr-2 text-indigo-600" />
                  <span>Quantity: {order.products[0].quantity}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold mb-2">Product Details</h3>
          <div className="grid grid-cols-2 gap-4">
        
            <div>
              <span className="font-medium">Product Code:</span> {product.productCode || 'N/A'}
            </div>
            <div>
              <span className="font-medium">Brand:</span> {product.brand || 'N/A'}
            </div>
          </div>
        </div>
        {/* <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-2">Food Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="font-medium">Organic Certification:</span> {foodInfo.organicCertification}
            </div>
            <div>
              <span className="font-medium">Expiry Date:</span> {new Date(foodInfo.expiryDate).toLocaleDateString()}
            </div>
            <div>
              <span className="font-medium">Weight:</span> {foodInfo.weight}
            </div>
            <div>
              <span className="font-medium">Price:</span> ${foodInfo.price}
            </div>
            <div>
              <span className="font-medium">Cash Discount Price:</span> ${foodInfo.cashDiscountPrice}
            </div>
          </div>
        </div> */}
        <div className="bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <FiDollarSign className="mr-2 text-indigo-600" />
              <span>Total Amount: ${order.totalAmount}</span>
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2 text-indigo-600" />
              <span>Order Status: {order.status}</span>
            </div>
            <div className="flex items-center">
              <FiDollarSign className="mr-2 text-indigo-600" />
              <span>Payment Status: {order.paymentStatus}</span>
            </div>
            <div className="flex items-center">
              <FiTruck className="mr-2 text-indigo-600" />
              <span>Courier Service: {order.courierService}</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-4">
          <h3 className="text-lg font-semibold mb-2">Shipping Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <FiMapPin className="mr-2 text-indigo-600" />
              <span>Address: {order?.shippingAddress?.address}</span>
            </div>
            <div className="flex items-center">
              <FiPhone className="mr-2 text-indigo-600" />
              <span>Phone: {order.phoneNumber}</span>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-6 py-4">
          <h3 className="text-lg font-semibold mb-2">Additional Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <span className="font-medium">Notes:</span> {order.notes}
            </div>
            <div className="col-span-2">
              <span className="font-medium">Tags:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {order.tags.map((tag, index) => (
                  <span key={index} className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <FiTag className="mr-2 text-indigo-600" />
              <span>Seller ID: {order.sellerId}</span>
            </div>
            <div className="flex items-center">
              <FiCalendar className="mr-2 text-indigo-600" />
              <span>Created: {new Date(order.createdAt).toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerOrderDetails;