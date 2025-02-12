import React, { useEffect, useState } from "react";

import styles from "../../Styles/Style";

import Product from "./Product";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BestDeals = () => {
  const {data:data , isLoading} = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await axios.get(`https://reseller-backend-zeta.vercel.app/api/v4/products`);
   
      return response.data.data;
    },
  })
  console.log("data", data)
  return (
    <div className={`mt-7 w-[95%] mx-auto`}>
      <div className={``}>
        <h1 className="lg:text-2xl text-xl font-bold text-gray-900 font-[Delius]"  data-aos="fade-right">Best Deals</h1>
      </div>

      <div className="grid grid-cols-2 gap-[12px] md:grid-cols-3 md:gap-[18px] lg:grid-cols-6 lg:gap-[25px] xl:grid-cols-6 xl:gap-[20px] mb-12 border-0">
        {data &&
          data?.map((data, index) => <Product data={data} key={index} />)}
      </div>
    </div>
  );
};

export default BestDeals;
