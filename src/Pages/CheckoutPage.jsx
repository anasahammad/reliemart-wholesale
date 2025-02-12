import  { useEffect, useState } from "react";
import Header from "../Components/Layout/Header";
import Checkout from "../Components/Layout/Checkout page/Checkout";
import styles from "../Styles/Style";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import PaymentInfo from "../Components/Layout/Checkout page/Payment/PaymentInfo";
import toast from "react-hot-toast";
import OrderConfirm from "../Components/Layout/Checkout page/Payment/OrderConfirm";

function CheckoutPage() {
const [showActive, setShowActive] = useState(1);
const [confirmOrder , setConfirmOrder] = useState(false)
  const location = useLocation();
  const product = location.state?.product || {};
  const [orderProduct, setOrderProduct] = useState([]);
  const [shippingOption, setShippingOption] = useState('inside'); // Default: Inside Dhaka
  const [shippingCost, setShippingCost] = useState(70); // Default shipping cost
  const [paymentData, setPaymentData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    address: '',
    
    
  });

  useEffect(() => {
    setOrderProduct(product);
  }, [product]);

  console.log('Product:', orderProduct);
  // Calculate subtotal and total
  const subtotal = orderProduct?.reduce((acc, item) => {
    const quantity = item.qty ? item.qty : 1; // Use qty if available, otherwise 1
    const price = item.MainCashDiscountPrice ? item.MainCashDiscountPrice : item.Mainprice; // Use MainCashDiscountPrice if available, otherwise Mainprice
    return acc + price * quantity; // Calculate total for the item
  }, 0);
  console.log(paymentData)
  const total = subtotal + shippingCost;

  // Handle shipping option change
  const handleShippingChange = (option) => {
    setShippingOption(option);
    setShippingCost(option === 'inside' ? 70 : 120);
  };

  const [isOrderProcessing, setIsOrderProcessing] = useState(false); // Order processing flag

  // Handle form data changes
  const handleFormData = (data) => {
    setFormData(data);
    console.log("Form Data from Child:", data);
  };
  
  // Handle payment selection
  const handlePaymentSelect = (data) => {
    setPaymentData(data);
    console.log("Payment Data:", data);
  };
  
  // UseEffect to monitor when both form and payment data are ready
  useEffect(() => {
    const processOrder = async () => {
      if (!formData || !paymentData || isOrderProcessing || !confirmOrder) return; // Wait for both data to be ready and confirmed
  
      setIsOrderProcessing(true); // Prevent multiple submissions
  
      try {
        // Validate payment data
        if (
          !paymentData.method ||
          (paymentData.method !== "cashOnDelivery" &&
            (!paymentData.transactionID || !paymentData.phoneNumber))
        ) {
          throw new Error("Incomplete payment data. Please fill in all required fields.");
        }
  
        // Prepare the order object
        const order = {
          product: orderProduct,
          paymentMethod: paymentData.method || "",
          transactionID: paymentData.transactionID || "",
          phoneNumber: paymentData.phoneNumber || "",
          shippingOption,
          shippingCost,
          subtotal,
          total,
          customerName: formData.name || "N/A",
          customerEmail: formData.email || "N/A",
          customerNumber: formData.number || "N/A",
          customerAddress: formData.order || {},
          customerId: formData.customerId || null,
          date: new Date().toISOString(),
        };
  
        console.log("Order data prepared:", order); // Debugging purpose
  
        // Send order to server
        await sendOrderToServer(order);
  
        setConfirmOrder(false); // Reset confirmOrder after successful submission
      } catch (error) {
        console.error("Error in payment process:", error);
        toast.error(error.message || "Failed to process payment.");
      } finally {
        setIsOrderProcessing(false); // Reset flag
      }
    };
  
    processOrder();
  }, [formData, paymentData, confirmOrder]); // Trigger only when confirmOrder changes
  
  
  // Refactor sendOrderToServer
  const sendOrderToServer = async (order) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/order/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Server Response:", result);
      const existingOrders = JSON.parse(localStorage.getItem("myOrder")) || [];

     
      const updatedOrders = [...existingOrders, result.order];
      
      // Save the updated orders back to localStorage
      localStorage.setItem("myOrder", JSON.stringify(updatedOrders));
      toast.success("Order placed successfully!");
      localStorage.removeItem("cartItems");
      setShowActive(3); // Move to the next step
    } catch (error) {
      console.error("Failed to send order to server:", error);
      toast.error("Failed to place order. Please try again.");
    }
  };

  
  
 
  
  console.log(product)
  return (
    <div>
      <Header />

      <br />
      <br />
      <div className="lg:mt-10 -mt-10"></div>
      <div className="w-full flex justify-center lg:mt-10 mt-0">
      <div className="w-full justify-center flex items-center flex-wrap">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
          className={`${styles.noramlFlex}`}>
          <div className={`${styles.cart_button}`}>
            <span className={`${styles.cart_button_text}`}>1.Shipping</span>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className={`${
              showActive > 1
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-orange-500"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-orange-200"
            }`}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -150 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -150 }}
          transition={{ duration: 0.6 }}
          className={`${styles.noramlFlex}`}>
          <motion.div
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.6 }}
            className={`${
              showActive > 1
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-orange-200`
            }`}>
            <span
              className={`${
                showActive > 1
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-orange-500`
              }`}>
              2.Payment
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.6 }}
          className={`${styles.noramlFlex}`}>
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.6 }}
            className={`${
              showActive > 3
                ? "w-[30px] 800px:w-[70px] h-[4px] !bg-orange-500"
                : "w-[30px] 800px:w-[70px] h-[4px] !bg-orange-200"
            }`}
          />
          <div
            className={`${
              showActive > 2
                ? `${styles.cart_button}`
                : `${styles.cart_button} !bg-orange-200`
            }`}>
            <span
              className={`${
                showActive > 2
                  ? `${styles.cart_button_text}`
                  : `${styles.cart_button_text} !text-orange-500`
              }`}>
              3.Success
            </span>
          </div>
        </motion.div>
      </div>
    </div>
    <div>
    <div className="w-full flex lg:flex-row flex-col justify-center  items-center py-8 px-10">
    {showActive === 1 && (
      <Checkout setShowActive={setShowActive} onFormSubmit={handleFormData} />
      )}
        {showActive === 2 && ( 
      <PaymentInfo  setConfirmOrder={setConfirmOrder} onPaymentSelect={handlePaymentSelect} setShowActive={setShowActive} product={product} />

        )}

{showActive === 3 && ( 
     <OrderConfirm></OrderConfirm>

        )}
       <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
      
       <motion.div
  initial={{ opacity: 0, x: 500 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: 500 }}
  transition={{ duration: 0.6 }}
  className="w-full bg-[#fff] rounded-md p-5 pb-8"
>
  {/* Product Info */}
  {orderProduct.map((product) => (

  <div key={product._id} className="flex items-center gap-4 mb-4 border-b pb-4">
    <img
      src={product?.image?.[0]}
      alt={product?.name}
      className="w-[60px] h-[60px] object-cover rounded-md"
    />
    <div>
      <h4 className="text-[16px] font-[600]">{product?.name}</h4>
      <p className="text-[14px] text-gray-500">
        Price: Tk {product?.MainCashDiscountPrice || product?.Mainprice}
      </p>
      <p className="text-[14px] text-gray-500">
        Quantity: {product?.qty || 1}
      </p>
    </div>
  </div>
  ))}

  {/* Subtotal */}
  <div className="flex justify-between">
    <h3 className="text-[16px] font-[400] text-[#000000a4]">Subtotal:</h3>
    <h5 className="text-[18px] font-[600]">Tk {subtotal}</h5>
  </div>
  <br />

  {showActive === 1 || showActive === 2 && ( 

  <div className="flex justify-between items-center">
    <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping:</h3>
    <div className="flex gap-4 justify-start items-start lg:flex-row flex-col">
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
  )}
  <br />

  {/* Shipping Amount */}
  <div className="flex justify-between">
    <h3 className="text-[16px] font-[400] text-[#000000a4]">Shipping Cost:</h3>
    <h5 className="text-[18px] font-[600]">Tk {shippingCost}</h5>
  </div>
  <br />

  {/* Total */}
  <div className="flex justify-between">
    <h3 className="text-[16px] font-[400] text-[#000000a4]">Total:</h3>
    <h5 className="text-[20px] font-[700]">Tk {total}</h5>
  </div>
  <br />
</motion.div>

    </div>
    </div>

    </div>
    </div>
  );
}

export default CheckoutPage;
