import React from "react";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import OrderDetails from "../Components/Layout/OrderDetails";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import SellerOrderDetails from "../Component/SellerOrderDetails";


const SellerOrderDetailsPage = () => {
const {id} = useParams()

const {data: order = [], isLoading} = useQuery({
  queryKey: ["order"],
  queryFn: async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/resellerOrder/orders/${id}`, {withCredentials: true});
    return response.data;
  }
})

console.log(order)
  return (
    <>
     
      <OrderDetails id={id} order={order} isAuthor={true} />
      {/* <SellerOrderDetails order={order}/> */}
     
    </>
  );
};

export default SellerOrderDetailsPage;
