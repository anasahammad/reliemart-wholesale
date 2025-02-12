import React from "react";

function Text() {
  const sections = [
    {
      title: "Top mart Shop in Bangladesh",
      content:
        "  We are now going through a period when technology brings the revolution. From dawn to dusk every moment in our life is connected to technology. Various kinds of smart gadgets become inseparable parts of our daily life. Consistent with the demand there is a huge mart-selling market globally including Bangladesh. In Bangladesh, Apple Gadgets is a top-tier mart-selling shop. They provide consumers a huge collection of gadgets: Phones & Tablets, Laptops & Desktops, Accessories, Smart Home Appliances etc. Apple Gadgets satisfies its huge customer base both online and offline. Currently, it serves customers with four outlets around Dhaka city at four different locations.  Best customer service makes Apple Gadgets a trustworthy retail gadgets shop in Dhaka, Bangladesh.",
    },
    {
      title: "Best Phones & Tablets Online Shop in Bangladesh",
      content:
        " From early morning alarm to watching a movie at late night laying on your bed. Literally, we do half of our daily tasks with our smartphones. Phones are now a 24/7 component in our life. Alike phones the demand for tablets is also uplifting rapidly. But, the problem is to find a reliable shop to buy phones and tablets. In terms of buying phones and tablets, Apple Gadgets is a name of trust here in Bangladesh. They furnish their outlets with a large number of smartphones from top-notch brands. Such as iPhone, Samsung, Google, Xiaomi, OnePlus, Oppo, Vivo, Motorola, Infinix, Huawei, Honor, Nokia, and many more. Whether you want a smartphone, feature phone, or tablet for your official work, get it from Apple Gadgets through online or offline.",
    },
    {
      title: "Leading Mobile Accessories Shop in Bangladesh",
      content:
        " From early morning alarm to watching a movie at late night laying on your bed. Literally, we do half of our daily tasks with our smartphones. Phones are now a 24/7 component in our life. Alike phones the demand for tablets is also uplifting rapidly. But, the problem is to find a reliable shop to buy phones and tablets. In terms of buying phones and tablets, Apple Gadgets is a name of trust here in Bangladesh. They furnish their outlets with a large number of smartphones from top-notch brands. Such as iPhone, Samsung, Google, Xiaomi, OnePlus, Oppo, Vivo, Motorola, Infinix, Huawei, Honor, Nokia, and many more. Whether you want a smartphone, feature phone, or tablet for your official work, get it from Apple Gadgets through online or offline.",
    },
    {
      title: "Prominent Smartwatch Online Shop in Bangladesh",
      content:
        " From early morning alarm to watching a movie at late night laying on your bed. Literally, we do half of our daily tasks with our smartphones. Phones are now a 24/7 component in our life. Alike phones the demand for tablets is also uplifting rapidly. But, the problem is to find a reliable shop to buy phones and tablets. In terms of buying phones and tablets, Apple Gadgets is a name of trust here in Bangladesh. They furnish their outlets with a large number of smartphones from top-notch brands. Such as iPhone, Samsung, Google, Xiaomi, OnePlus, Oppo, Vivo, Motorola, Infinix, Huawei, Honor, Nokia, and many more. Whether you want a smartphone, feature phone, or tablet for your official work, get it from Apple Gadgets through online or offline.",
    },
    {
      title: "Top AirPods & Earbuds Shop in Dhaka, Bangladesh",
      content:
        " From early morning alarm to watching a movie at late night laying on your bed. Literally, we do half of our daily tasks with our smartphones. Phones are now a 24/7 component in our life. Alike phones the demand for tablets is also uplifting rapidly. But, the problem is to find a reliable shop to buy phones and tablets. In terms of buying phones and tablets, Apple Gadgets is a name of trust here in Bangladesh. They furnish their outlets with a large number of smartphones from top-notch brands. Such as iPhone, Samsung, Google, Xiaomi, OnePlus, Oppo, Vivo, Motorola, Infinix, Huawei, Honor, Nokia, and many more. Whether you want a smartphone, feature phone, or tablet for your official work, get it from Apple Gadgets through online or offline.",
    },
  ];

  return (
    <div className="  text-gray-800 min-h-screen p-4 mx-auto max-w-7xl">
    
      <div className=" ">
        {sections.map((section, index) => (
          <div key={index} className="    p-6 rounded-lg  ">
            <h2 className="text-xl    text-gray-700   font-semibold mb-4">{section.title}</h2>
            <p className="  text-white">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Text;
