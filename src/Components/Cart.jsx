import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../Styles/Style";
import CartSingle from "./Layout/CartSingle";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addTocart } from "../store/CartAction";
import { motion } from "framer-motion";

const Cart = ({ setOpenCart, openCart }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  const { cart } = useSelector((state) => state.cart);
  const [shippingOption, setShippingOption] = useState('inside'); // Default: Inside Dhaka
  const [shippingCost, setShippingCost] = useState(70); // Default shipping cost

  const handleShippingChange = (option) => {
    setShippingOption(option);
    setShippingCost(option === 'inside' ? 70 : 120);
  };

  // const totalPrice = cart.reduce(
  //   (acc, item) => acc + item.qty * item.MainCashDiscountPrice,
  //   0
  // );
  const totalPrice = cart.reduce((acc, item) => {
    const quantity = item.qty ? item.qty : 1; // Use qty if available, otherwise 1
    const price = item.MainCashDiscountPrice ? item.MainCashDiscountPrice : item.Mainprice; // Use MainCashDiscountPrice if available, otherwise Mainprice
    return acc + price * quantity + shippingCost; // Calculate total for the item
  }, 0);
  console.log(cart);
  const quantityChangeHanlder = (data) => {
    dispatch(addTocart(data));
  };

  const handleBuyNow = () => {
    // if(isAuthenticated){
    //   navigate( '/checkout', { state: { product: cart } });
    // } else{

    //   navigate('/sign-up');
    // }

    navigate("/checkout", { state: { product: cart } });
  };
  return (
    <div className="w-full fixed h-screen left-0 top-0 z-[1000] bg-[#0000006b]">
      <motion.div
        initial={{ opacity: 0, x: 400 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 400 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 right-0 h-full w-[80%] sm:w-[60%] 800px:w-[30%] flex flex-col justify-between bg-white text-gray-700 shadow-lg overflow-y-scroll scrollbar-hide"
      >
        {/* Header */}
        <div className="flex justify-between items-center py-2 px-4 border-b">
          <h2 className="text-base font-medium text-orange-600">Cart Items ({cart.length})</h2>
          <RxCross1
            size={16}
            color="red"
            className="cursor-pointer"
            onClick={() => setOpenCart(false)}
          />
        </div>

        {/* Cart Content */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-2xl font-medium text-gray-600">
              Your cart is empty!
            </p>
          </div>
        ) : (
          <div className=" h-full ">
            

            {/* Cart Items */}
            <div className="flex-1 max-h-[70vh]  space-y-1 overflow-y-scroll">
              {cart?.map((item, index) => (
                <CartSingle
                  key={index}
                  data={item}
                  quantityChangeHanlder={quantityChangeHanlder}
                />
              ))}
            </div>

            {/* Checkout Button */}
            <div className="absolute bottom-0 left-0 w-full p-4 ">
          <div className="flex justify-between flex-col items-start mb-2">
            <h3 className="text-[16px] font-[600] text-[#000000a4] mb-1">Shipping Cost:</h3>
            <div className="flex lg:gap-4 gap-2 justify-start items-start ">
              <button
                onClick={() => handleShippingChange('inside')}
                className={`px-2 py-1 rounded-md text-xs ${
                  shippingOption === 'inside'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Inside Dhaka (Tk 70)
              </button>
              <button
                onClick={() => handleShippingChange('outside')}
                className={`px-2 py-1 rounded-md text-xs ${
                  shippingOption === 'outside'
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                Outside Dhaka (Tk 120)
              </button>
            </div>
          </div>
                <button onClick={handleBuyNow} className="w-full h-[35px] bg-[#e44343] text-white font-medium text-base rounded-[5px]">
                  Checkout Now (৳ {totalPrice})
                </button>
             
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Cart;
