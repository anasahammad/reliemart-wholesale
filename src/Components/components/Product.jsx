import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const Product = () => {
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

  return (
    <div className="py-4 p-2 lg:p-0 md:p-0 mt-10 mx-auto max-w-7xl">
      {/* Add some text above the grid */}
      <div className="mb-4 text-center  ">
        <h2 className="lg:text-2xl text-xl font-bold text-gray-900 font-[Delius]"  data-aos="fade-right">Featured Products</h2>
        <p className="text-gray-300 text-xs">Check out our exclusive products available for you.</p>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product) => (
          <div
            key={product.id}
            className="group flex flex-col items-center rounded-lg p-4 shadow-lg bg-white text-gray-700 hover:shadow-2xl hover:bg-gray-800 transition-all duration-300"
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.title}
                className="object-cover w-full h-48 rounded-lg transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundColor: 'transparent' }}
              />
              <div className="absolute top-2 right-2 gradient-bg p-2 rounded-full shadow-md">
                <FaShoppingCart className="text-white" size={20} />
              </div>
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-700">
              {product.title}
            </h3>
            <p className="text-sm text-gray-400">{product.description}</p>
            <div className="mt-4 flex justify-between items-center w-full">
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

export default Product;
