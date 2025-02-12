import { useState, useEffect } from "react";
import styles from "../../../../Styles/Style";
import { motion } from "framer-motion";

const PaymentInfo = ({ onPaymentSelect, product, setShowActive, setConfirmOrder }) => {
  const [select, setSelect] = useState(3); // Default is Cash on Delivery
  const [paymentMethod, setPaymentMethod] = useState("");
  const [onlinePaymentDetails, setOnlinePaymentDetails] = useState({
    transactionID: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({ transactionID: "", phoneNumber: "" });

  // Update parent when payment selection changes
  useEffect(() => {
    if (select === 3) {
      // Cash on Delivery
      onPaymentSelect({ method: "cashOnDelivery" });
    } else if (select === 1 && paymentMethod && onlinePaymentDetails.transactionID && onlinePaymentDetails.phoneNumber) {
      // Online Payment
      onPaymentSelect({
        method: paymentMethod,
        transactionID: onlinePaymentDetails.transactionID,
        phoneNumber: onlinePaymentDetails.phoneNumber,
      });
    }
  }, [select, paymentMethod, onlinePaymentDetails, onPaymentSelect]);
  
 // Online Payment Submit Handler
const onlinePaymentHandler = (e) => {
  e.preventDefault();

  const newErrors = {
    transactionID: onlinePaymentDetails.transactionID ? "" : "Transaction ID is required.",
    phoneNumber: onlinePaymentDetails.phoneNumber ? "" : "Phone number is required.",
  };

  setErrors(newErrors);

  if (!newErrors.transactionID && !newErrors.phoneNumber) {
    onPaymentSelect({
      method: paymentMethod,
      transactionID: onlinePaymentDetails.transactionID,
      phoneNumber: onlinePaymentDetails.phoneNumber,
    });
    setConfirmOrder(true); // Confirm the order after validation
  }
  setConfirmOrder(true)
};

  

  return (
    <motion.div
      initial={{ opacity: 0, x: -500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -500 }}
      transition={{ duration: 0.6 }}
      className="w-full 800px:w-[60%] bg-[#fff] rounded-md p-5 pb-8"
    >
      <h4 className="text-[18px] font-[600] text-[#000000b1]">Select Payment Method</h4>

      {/* Online Payment */}
      <div
        className="flex w-full pb-5 border-b mb-2"
        onClick={() => setSelect(1)}
      >
        <div
          className={`w-[25px] h-[25px] rounded-full border-[3px] ${
            select === 1 ? "bg-[#1d1a1acb]" : "bg-transparent"
          } border-[#1d1a1ab4]`}
        />
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">Online Pay</h4>
      </div>

      {select === 1 && (
        <div>
          <div className="flex justify-start items-center mt-4 space-x-6 mb-4">
            <button
              onClick={() => setPaymentMethod("bKash")}
              className={`flex items-center space-x-2 border ${
                paymentMethod === "bKash" ? "bg-[#e02a2a] text-white" : "border-[#e02a2a] text-[#e02a2a]"
              } py-1 px-3 rounded-full`}
            >
              <img
                src="https://freepnglogo.com/images/all_img/1701670291bKash-App-Logo-PNG.png"
                alt="bKash Logo"
                className="w-4 h-4"
              />
              <span className="text-sm">bKash</span>
            </button>
            <button
              onClick={() => setPaymentMethod("Nagad")}
              className={`flex items-center space-x-2 border ${
                paymentMethod === "Nagad" ? "bg-[#f06d23] text-white" : "border-[#f06d23] text-[#f06d23]"
              } py-1 px-3 rounded-full`}
            >
              <img
                src="https://freelogopng.com/images/all_img/1679248828Nagad-Logo-PNG.png"
                alt="Nagad Logo"
                className="w-4 h-4"
              />
              <span className="text-sm">Nagad</span>
            </button>
          </div>

          {paymentMethod && (
            <form onSubmit={onlinePaymentHandler} className="w-full pb-3">
              <label>Transaction ID <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Enter transaction ID"
                required
                value={onlinePaymentDetails.transactionID}
                onChange={(e) =>
                  setOnlinePaymentDetails({
                    ...onlinePaymentDetails,
                    transactionID: e.target.value,
                  })
                }
                className={`${styles.input}`}
              />
              {errors.transactionID && <p className="text-red-500">{errors.transactionID}</p>}
              <label>Phone Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Enter phone number"
                value={onlinePaymentDetails.phoneNumber}
                required
                onChange={(e) =>
                  setOnlinePaymentDetails({
                    ...onlinePaymentDetails,
                    phoneNumber: e.target.value,
                  })
                }
                className={`${styles.input}`}
              />
              {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
              <input
                type="submit"
                value="Pay Now"
                className={`${styles.button} my-3 cursor-pointer`}
              />
            </form>
          )}
        </div>
      )}

      {/* Cash on Delivery */}
      <div
        className="flex w-full pb-5 border-b mb-2"
        onClick={() => setSelect(3)}
      >
        <div
          className={`w-[25px] h-[25px] cursor-pointer rounded-full border-[3px] ${
            select === 3 ? "bg-[#1d1a1acb]" : "bg-transparent"
          } border-[#1d1a1ab4]`}
        />
        <h4 className="text-[18px] pl-2 font-[600] text-[#000000b1]">Cash on Delivery</h4>
      </div>

      {select === 3 && (
        <form
        onSubmit={onlinePaymentHandler} // No reload needed
          className="w-full"
        >
          <input
            type="submit"
            value="Confirm"
            className={`${styles.button} text-[#fff]`}
          />
        </form>
      )}
    </motion.div>
  );
};

export default PaymentInfo;