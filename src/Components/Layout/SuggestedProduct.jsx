import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import Product from "./Product";


const SuggestedProduct = ({ data: singleProduct }) => {
  // API থেকে প্রোডাক্ট ডেটা ফেচ করা
  const { data: allProducts, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get(
        `https://reseller-backend-zeta.vercel.app/api/v4/products`
      );
      return response.data.data; // API থেকে পাওয়া সব প্রোডাক্টের ডেটা
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data!</p>;

  // ফিল্টার করা: ফেচ করা ডেটার category.name === প্রপ্সে পাওয়া সিঙ্গেল প্রোডাক্টের category.name
  const matchedProducts = allProducts?.filter(
    (product) => product?.category?.name === singleProduct?.category?.name
  );



  return (
    <div className={`lg:mt-7 mt-0 w-[95%] mx-auto `}>
    <div className={``}>
      <h1 className="lg:text-2xl text-xl font-bold text-gray-900 font-[Delius]"  data-aos="fade-right">Suggested Products</h1>
    </div>
    <div className="grid grid-cols-2 mt-3 gap-[12px] md:grid-cols-3 md:gap-[18px] lg:grid-cols-5 lg:gap-[25px] xl:grid-cols-5 xl:gap-[20px] mb-12 border-0">
      {matchedProducts && matchedProducts.length > 0 ? (
        matchedProducts.map((product, index) => (


  <Product data={product} key={index} />
        ))
      ) : (
        <p className="text-gray-500">No related products found for this category.</p>
      )}
    </div>
    </div>
  );
};

export default SuggestedProduct;
