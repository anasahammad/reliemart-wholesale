import styles from "../../../Styles/Style";

import { motion } from "framer-motion";

const CartData = ({
  cart,
}) => {

  const subTotal = cart.reduce(
    (acc, item) => acc + item.qty * item.MainCashDiscountPrice,
    0
  );
 
  const total = subTotal + 10;
  return (
    <motion.div
      initial={{ opacity: 0, x: 500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 500 }}
      transition={{ duration: 0.6 }}
      className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">Tk {subTotal}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">Tk 10</h5>
      </div>
      <br />
     
      <h5 className="text-[18px] font-[600] text-end pt-3">Tk {total}</h5>
      <br />
      <form >
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
       
          required
        />
        <input
        title="coming soon"
          className={`w-full h-[40px] border cursor-not-allowed border-orange-500  text-center text-orange-600  rounded-[3px] mt-8  hover:bg-orange-400 transition-colors hover:text-[#fff]`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </motion.div>
  );
};

export default CartData;
