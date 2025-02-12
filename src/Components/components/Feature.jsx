 
import { AiOutlineTablet, AiOutlineLaptop, AiOutlineAudio, AiOutlineUsb } from "react-icons/ai";
import { BsWatch, BsHeadphones, BsPhone } from "react-icons/bs";
 

const categories = [
  { icon: <AiOutlineTablet size={30} />, name: "Phones & Tablets" },
  { icon: <AiOutlineLaptop size={30} />, name: "MacBook" },
  { icon: <AiOutlineAudio size={30} />, name: "Hubs & Docks" },
  { icon: <BsWatch size={30} />, name: "Smart Watch" },
  { icon: <BsHeadphones size={30} />, name: "Overhead Headphones" },
  { icon: <AiOutlineUsb size={30} />, name: "Power Adapter" },
 
  { icon: <BsPhone size={30} />, name: "Cover & Glass" },
  { icon: <AiOutlineTablet size={30} />, name: "Phones & Tablets" },
  { icon: <AiOutlineLaptop size={30} />, name: "MacBook" },
  { icon: <AiOutlineAudio size={30} />, name: "Hubs & Docks" },
  { icon: <BsWatch size={30} />, name: "Smart Watch" },
  { icon: <BsHeadphones size={30} />, name: "Overhead Headphones" },
  { icon: <AiOutlineUsb size={30} />, name: "Power Adapter" },
 
  { icon: <BsPhone size={30} />, name: "Cover & Glass" },
 
 
];

const FeaturedCategories = () => {
  return (
    <div className="py-10 px-4   max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-700 text-center mb-4">FEATURED CATEGORIES</h2>
      <p className="text-center mb-8  text-white">
        Get your desired product from featured category
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 text-white   bg-white text-gray-700 rounded-md shadow-sm hover:shadow-md"
          >
            {category.icon}
            <p className="mt-2 text-center text-sm font-medium      text-gray-700">
              {category.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedCategories;
