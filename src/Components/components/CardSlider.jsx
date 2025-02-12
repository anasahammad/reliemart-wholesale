import React, { useRef } from 'react';
import { FaShoppingCart, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductList = () => {
  const products = [
    { id: 1, title: 'Product 1', description: 'This is a short description of Product 1', price: 30.0, image: 'https://i.postimg.cc/bYLdy6GT/i-Phone-15-Plus-2-1-6945.jpg' },
    { id: 2, title: 'Product 2', description: 'This is a short description of Product 2', price: 25.0, image: 'https://i.postimg.cc/bYLdy6GT/i-Phone-15-Plus-2-1-6945.jpg' },
    { id: 3, title: 'Product 3', description: 'This is a short description of Product 3', price: 40.0, image: 'https://i.postimg.cc/bYLdy6GT/i-Phone-15-Plus-2-1-6945.jpg' },
    { id: 4, title: 'Product 4', description: 'This is a short description of Product 4', price: 35.0, image: 'https://i.postimg.cc/bYLdy6GT/i-Phone-15-Plus-2-1-6945.jpg' },
    { id: 5, title: 'Product 5', description: 'This is a short description of Product 5', price: 50.0, image: 'https://i.postimg.cc/bYLdy6GT/i-Phone-15-Plus-2-1-6945.jpg' },
    { id: 6, title: 'Product 6', description: 'This is a short description of Product 6', price: 45.0, image: 'https://i.postimg.cc/bYLdy6GT/i-Phone-15-Plus-2-1-6945.jpg' },
    { id: 7, title: 'Product 7', description: 'This is a short description of Product 7', price: 55.0, image: 'https://i.postimg.cc/bYLdy6GT/i-Phone-15-Plus-2-1-6945.jpg' },
    { id: 8, title: 'Product 8', description: 'This is a short description of Product 8', price: 60.0, image: 'https://i.postimg.cc/bYLdy6GT/i-Phone-15-Plus-2-1-6945.jpg' },
    { id: 9, title: 'Product 9', description: 'This is a short description of Product 9', price: 65.0, image: 'https://i.postimg.cc/bYLdy6GT/i-Phone-15-Plus-2-1-6945.jpg' },
    { id: 10, title: 'Product 10', description: 'This is a short description of Product 10', price: 70.0, image: 'https://i.postimg.cc/bYLdy6GT/i-Phone-15-Plus-2-1-6945.jpg' },
  ];

  const productListRef = useRef();

  const scrollLeft = () => {
    if (productListRef.current) {
      productListRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (productListRef.current) {
      productListRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-4 mx-auto max-w-7xl">
      <div className="relative mb-4  ">
        <button
          onClick={scrollLeft}
          className="absolute z-50 left-8 top-44 transform -translate-y-1/2 p-2 rounded-full  gradient-bg    opacity-70     transition-all"
        >
          <FaChevronLeft size={20} className="text-gray-700  " />
        </button>
        <div className="mb-4 text-center  ">
        <h2 className="text-3xl uppercase font-bold text-gray-700">Ready for Order</h2>
        <p className="text-gray-300 text-xs">Check out our exclusive products available for you.</p>
      </div>
        <button
          onClick={scrollRight}
          className="absolute z-50 right-8 top-44 transform -translate-y-1/2 p-2 rounded-full  gradient-bg    opacity-70      transition-all"
        >
          <FaChevronRight size={20} className="text-gray-700" />
        </button>
      </div>

      <div
        ref={productListRef}
        className="flex space-x-4 overflow-x-auto lg:overflow-hidden lg:space-x-6 scroll-smooth"
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="min-w-[calc(100%/2)] group md:min-w-[calc(100%/4)] lg:min-w-[calc(100%/6)] flex-shrink-0 rounded-lg p-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
            style={{ backgroundColor: '#0F1012' }}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover w-full h-48 rounded-lg transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-2 right-2 gradient-bg p-2 rounded-full shadow-md">
                <FaShoppingCart className="text-white" size={20} />
              </div>
            </div>
            <h2 className="mt-4   text-center text-lg font-bold text-gray-700">{product.title}</h2>
            <p className="text-sm text-white">{product.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <p className="font-semibold text-white">${product.price.toFixed(2)}</p>
              <button
                className="px-4 py-2 gradient-bg text-white text-sm font-semibold rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                Compare
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
