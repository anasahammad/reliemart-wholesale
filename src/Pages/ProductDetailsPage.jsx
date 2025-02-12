import React, { useEffect, useState } from "react";
import styles from "../Styles/Style";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../Components/Layout/Header";
import Footer from "../Components/Layout/Footer";
import ProductDetails from "../Components/Layout/ProductDetails";
import SuggestedProduct from "../Components/Layout/SuggestedProduct";

import toast from "react-hot-toast";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
// console.log(id)
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://reseller-backend-zeta.vercel.app/api/v4/products/product/${id}`);
        const data = await response.json();
        console.log(data)
        setData(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("পণ্য লোড করতে সমস্যা হয়েছে!");
      }
    };
    fetchProduct();
  }, [id]);
// console.log(data)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (loading) return <div className="text-center py-20">লোড হচ্ছে...</div>;



  return (
    <>
      <Header />
      <ProductDetails data={data} />
      {data && <SuggestedProduct data={data} />}
      <Footer />
    </>
  );
};

export default ProductDetailsPage;



