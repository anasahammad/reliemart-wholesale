import React, { useEffect, useState } from "react";

import styles from "../../Styles/Style";

import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const FeaturedProduct = () => {
 

  const {data = [] , isLoading} = useQuery({
    queryKey: "products",
    queryFn: async () => {
      const response = await axios.get(`https://reseller-backend-zeta.vercel.app/api/v4/products`);
     
      return response.data.data;
    },
  })

  console.log(data);

  if(isLoading) return <div>Loading...</div>
  return (
    <div>
      <div className={`mt-14 w-[95%] mx-auto`}>
      <div className={``}>
        <h1 className="lg:text-2xl text-xl font-bold text-gray-900 font-[Delius]"  data-aos="fade-right">Featured Products</h1>
        </div>

        <div className="grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[18px] lg:grid-cols-4 lg:gap-[18px] xl:grid-cols-5 xl:gap-[20px] mb-12 border-0">
          {data &&
            data?.map((data, index) => (
              <Product data={data} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedProduct;
