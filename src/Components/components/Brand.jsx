import React from "react";
import Marquee from "react-fast-marquee";

const ShopByBrands = () => {
  const brands = [
    { name: "Apple", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "Samsung", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "OnePlus", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "Xiaomi", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "Google", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "Spigen", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "Acer", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "Thunderbolt", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "Dell", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "MSI", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "Boat", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "Titan", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
    { name: "Pitaka", logo: "https://i.postimg.cc/cJ1Hp2Zw/Google-4283.png" },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8  mx-auto max-w-7xl">
      <h2 className="text-center text-3xl font-bold text-gray-700">Shop By Brands</h2>

      {/* Marquee Component */}
      <Marquee gradient={false} speed={50}>
        {brands.map((brand, index) => (
          <div key={index} className="flex flex-col items-center mx-6">
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-24 h-24 object-contain mb-4"
            />
            <span className="text-lg text-white">{brand.name}</span>
          </div>
        ))}
      </Marquee>

      <div className="text-center mt-6">
        <button className="text-white hover:underline text-lg">All Brands &gt;</button>
      </div>
    </div>
  );
};

export default ShopByBrands;
