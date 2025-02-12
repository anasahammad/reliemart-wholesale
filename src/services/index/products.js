import axios from "axios";

// 🛒 Fetch Wholesale Products
export const fetchWholesaleProducts = async () => {
    const response = await axios.get('https://reseller-backend-zeta.vercel.app/api/v4/products/wholesale-products');
    return response.data;
  };
  
  // 🎁 Fetch Offer Products
  export const fetchOfferProducts = async () => {
    const response = await axios.get('https://reseller-backend-zeta.vercel.app/api/v4/products/offer-products');
    return response.data;
  };