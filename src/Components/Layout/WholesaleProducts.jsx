import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchWholesaleProducts } from '../../services/index/products';
import OrderModal from './OrderModal';
import Header from './Header';
import { Link } from 'react-router-dom';

const WholesaleProducts = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['wholesaleProducts'],
    queryFn: fetchWholesaleProducts,
  });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) return <p>লোড হচ্ছে পাইকারি পণ্য...</p>;
  if (isError) return <p>ত্রুটি: {error.message}</p>;

  return (
    <div>
      <Header />
      <div className='px-6'>
      <h2 className="text-xl font-bold mb-4 lg:mt-28 mt-2">🛒 পাইকারি পণ্য</h2>
      <p className="mb-4 text-gray-600">কিনতে চাইলে একটি পণ্য নির্বাচন করুন।</p>
      <div className="grid grid-cols-2  md:grid-cols-5 gap-2 px-3 mb-12">
        {data?.map((product) => (
          <div key={product._id} className="bg-[#fbfbfb] rounded-lg overflow-hidden shadow-md">
            <Link to={`/product/${product}`}><img
            src={product.image[0]}
            alt="Product"
            className="w-full object-cover h-[180px]"
          /></Link>
          
          <div className="p-4">
            {/* <p className="text-lg font-semibold text-gray-800">
              ৳{product?.MainCashDiscountPrice}
              <span className="line-through text-gray-500"> ৳{product?.Mainprice}</span>
            </p> */}
            <p className="text-orange-500 mt-1 flex items-center gap-1">
              {product?.name}
            </p>
            <button
              onClick={() => handleOrderClick(product)}
              className="mt-4 background-gradient text-white px-3 py-1 rounded-md hover:bg-orange-700"
            >
              অর্ডার করুন
            </button>
          </div>
        </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <OrderModal
          product={selectedProduct}
          onClose={closeModal}
        />
      )}
      </div>
    </div>
  );
};

export default WholesaleProducts;
