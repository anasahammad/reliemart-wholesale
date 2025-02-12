import React from "react";
import styles from "../../Styles/Style";

import sponsored1 from "../../assets/sponsored1.png";
import sponsored2 from "../../assets/sponsored2.png";
import sponsored3 from "../../assets/sponsored3.png";
import sponsored4 from "../../assets/sponsored4.png";
import sponsored5 from "../../assets/sponsored5.png";
import sponsored6 from "../../assets/sponsored6.png";
import sponsored7 from "../../assets/sponsored7.png";

const Sponsored = () => {
  return (
    <div
      className={` w-[95%] mx-auto bg-white text-gray-700  hidden sm:block py-10 cursor-pointer   rounded-xl `}
    >
      <h1 className="lg:text-2xl text-xl font-bold text-gray-900 font-[Delius]"  data-aos="fade-right">
        {" "}
        Sponsored Brand
      </h1>
      <div className="flex items-center  gap-3 sm:gap-10 justify-between">
        <div className="flex items-start">
          <img
            src={sponsored1}
            alt="sponsored/image"
            className="w-full object-contain rounded-lg"
          />
        </div>

        <div className="flex">
          <img
            src={sponsored2}
            alt="sponsored/image"
            className="w-full object-contain rounded-lg"
          />
        </div>

        <div className="flex">
          <img
            src={sponsored3}
            alt="sponsored/image"
            className="w-full object-contain rounded-lg"
          />
        </div>

        <div className="flex">
          <img
            src={sponsored4}
            alt="sponsored/image"
            className="w-full object-contain rounded-lg"
          />
        </div>

        <div className="flex">
          <img
            src={sponsored5}
            alt="sponsored/image"
            className="w-full object-contain rounded-lg"
          />
        </div>

        <div className="flex">
          <img
            src={sponsored6}
            alt="sponsored/image"
            className="w-full object-contain rounded-lg"
          />
        </div>
        <div className="flex">
          <img
            src={sponsored7}
            alt="sponsored/image"
            className="w-full object-contain rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
