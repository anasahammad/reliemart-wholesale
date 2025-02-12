import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../Styles/Style";

import { motion } from "framer-motion";

const DropDown = ({ setDropDown, categoriesData, DropDown }) => {
  const navigate = useNavigate();
  const handleSubmit = (data) => {
    navigate(`/products?category=${data.title}`);
    window.location.reload();
    setDropDown(false);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -80 }}
      transition={{ duration: 0.4 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0, y: -80 }}
      className=" absolute top-12  bg-white  text-black pb-4 w-[250px] rounded-b-md h-[80vh] overflow-y-auto z-30 shadow-sm">
      {categoriesData &&
        categoriesData.map((data, index) => (
          <Link to={`/products/category/${data.name}`} key={index}>
          <div
            className={`${styles.noramlFlex} hover:bg-gray-200 transition ease-linear cursor-pointer`}
            
            >
            <img
              src={data.photo}
              alt="product/image"
              className="w-[25px] h-[25px] object-contain ml-[10px] select-none"
            />
            <h3 className="m-3 cursor-pointer select-none">{data.name}</h3>
          </div>
          </Link>
        ))}
    </motion.div>
  );
};

export default DropDown;
