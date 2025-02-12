import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState, useMemo } from 'react';
import { FaSearch, FaFilter, FaSortAmountDown, FaHeart, FaShoppingCart } from 'react-icons/fa';
import Header from '../Components/Layout/Header';
import Product from '../Components/Layout/Product';
import Footer from '../Components/Layout/Footer';
import CircleLoader from '../Components/CircleLoader';

const AllProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const { data: products = [], isLoading: productsLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      return response.data.data;
    },
  });

  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/category`);
      return ['all', ...response.data.map(cat => cat.name)];
    },
  });

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'all') {
      result = result.filter(product => product.category.name === category);
    }

    result.sort((a, b) => {
      if (sortBy === 'price') {
        return a.MainCashDiscountPrice - b.MainCashDiscountPrice;
      } else {
        return a.name.localeCompare(b.name);
      }
    });

    return result;
  }, [products, searchTerm, category, sortBy]);

  if (productsLoading || categoriesLoading) {
    return <CircleLoader  />;
  }

  return (
    <div className="">
      <Header activeHeading={2}/>
      <br />
      <br />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Product <span className="text-[#f45142]">Catalog</span>
        </h1>

        <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="w-full md:w-1/3 relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 pl-10 pr-4 rounded-full border-2 border-[#f45142] focus:outline-none focus:ring-2 focus:ring-[#f45142] focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#f45142]" />
          </div>

          <div className="flex gap-4">
            <select
              className="appearance-none bg-white border-2 border-[#f45142] text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-[#f45142]"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <select
              className="appearance-none bg-white border-2 border-[#f45142] text-gray-700 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:bg-white focus:border-[#f45142]"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
        </div>

        {filteredAndSortedProducts.length === 0 ? (
          <div className="text-center text-gray-600 text-xl">
            No products found. Try adjusting your search or filters.
          </div>
        ) : (
          // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          //   {filteredAndSortedProducts.map((product) => (
          //     // <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl">
          //     //   <img 
          //     //     src={product.image[0]} 
          //     //     alt={product.name} 
          //     //     className="w-full h-48 object-cover"
          //     //   />
          //     //   <div className="p-4">
          //     //     <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
          //     //     <p className="text-sm text-gray-600 mb-2">{product.subCategory.name}</p>
          //     //     <p className="text-[#f45142] font-bold text-xl mb-2">৳{product.MainCashDiscountPrice}</p>
          //     //     {product.MainCashDiscountPrice < product.Mainprice && (
          //     //       <p className="text-sm text-gray-500 line-through mb-2">৳{product.Mainprice}</p>
          //     //     )}
          //     //     <p className="text-sm text-gray-600 mb-4">{product.status}</p>
          //     //     <div className="flex justify-between items-center">
          //     //       <button className="bg-[#f45142] text-white py-2 px-4 rounded-full hover:bg-[#d13a2b] transition duration-300 flex items-center">
          //     //         <FaShoppingCart className="mr-2" />
          //     //         Add to Cart
          //     //       </button>
          //     //       <button className="text-[#f45142] hover:text-[#d13a2b] transition duration-300">
          //     //         <FaHeart size={24} />
          //     //       </button>
          //     //     </div>
          //     //   </div>
          //     // </div>
          //   ))}
          // </div>

<div className="grid grid-cols-2 gap-[12px] md:grid-cols-3 md:gap-[18px] lg:grid-cols-5 lg:gap-[25px] xl:grid-cols-5 xl:gap-[20px] mb-12 border-0">
{
  filteredAndSortedProducts?.map((data, index) => <Product data={data} key={index} />)}
</div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AllProductsPage;