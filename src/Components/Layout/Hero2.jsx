import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";

import banner from "../../../src/assets/banner.jpg";
console.log(banner);
const Hero = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section className="w-[95%] md:w-11/12 mx-auto py-5 md:bg-white md:h-[445px] overflow-hidden">
      {/* Main Container */}
      <div className="grid grid-cols-1 md:flex gap-2">
        {/* Left banner */}

        <Slider {...settings} className="md:w-8/12">
          <div className="relative">
            <img
              src="/images/mac1.png" // Replace with your image path
              alt="MacBook Promotion"
              style={{ height: "195px", width: "100%" }}
              className="md:h-[400px] w-full object-cover object-center"
            />

            <div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
              {/* <h2 className="text-4xl font-bold mb-2">Boost Your Creativity</h2>
      <p className="text-xl">Buy a MacBook & Get</p>
      <p className="text-red-500 font-bold text-xl">10,000 Tk Discount + Free Wacom Tablet</p>
      <p className="bg-black text-white text-sm font-semibold px-3 w-fit py-2 mt-4 inline-block rounded-md">Offer Valid Till Stocks Last</p> */}
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/mac3.jpg" // Replace with your image path
              alt="MacBook Promotion"
              style={{ height: "195px", width: "100%" }}
              className="md:h-[400px] w-full object-cover object-center"
            />

            <div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
              {/* <h2 className="text-4xl font-bold mb-2">Boost Your Creativity</h2>
      <p className="text-xl">Buy a MacBook & Get</p>
      <p className="text-red-500 font-bold text-xl">10,000 Tk Discount + Free Wacom Tablet</p>
      <p className="bg-black text-white text-sm font-semibold px-3 w-fit py-2 mt-4 inline-block rounded-md">Offer Valid Till Stocks Last</p> */}
            </div>
          </div>
          <div className="relative">
            <img
              src="/images/mac4.jpg" // Replace with your image path
              alt="MacBook Promotion"
              style={{ height: "195px", width: "100%" }}
              className="md:h-[400px] w-full object-cover object-center"
            />

            <div className="absolute inset-0 flex flex-col justify-center p-6 text-white">
              {/* <h2 className="text-4xl font-bold mb-2">Boost Your Creativity</h2>
      <p className="text-xl">Buy a MacBook & Get</p>
      <p className="text-red-500 font-bold text-xl">10,000 Tk Discount + Free Wacom Tablet</p>
      <p className="bg-black text-white text-sm font-semibold px-3 w-fit py-2 mt-4 inline-block rounded-md">Offer Valid Till Stocks Last</p> */}
            </div>
          </div>
        </Slider>
        {/* Right-side banners */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-2 md:gap-0 md:w-4/12">
          {/* Top right banner */}
          <div className="relative h-[100px] md:h-[196px]">
            <img
              src="/images/mac5.jpg" // Replace with your image path
              alt="MacBook Promotion"
              // height={192}
              // width={300}
              className="h-[100px] md:h-[196px] w-full "
            />
            {/* <div className="absolute inset-0 flex items-center justify-center p-4 text-white">
        <h2 className="lg:text-2xl text-xl font-bold text-gray-900 font-[Delius]"  data-aos="fade-right">Order Online Now!</h2>
      </div> */}
          </div>

          {/* Bottom right banner */}
          <div className="relative h-[100px] md:h-[196px]">
            <img
              src="/images/mac2.jpg" // Replace with your image path
              alt="MacBook Promotion"
              // height={192}
              // width={300}
              className="h-[100px] md:h-[195px] w-full object-cover object-center"
            />
            <div className="absolute inset-0 flex items-center justify-center p-4 text-white  bg-opacity-70 ">
              {/* <h2 className="text-3xl font-bold">BIG SALE</h2>
        <a
          href="#"
          className="mt-4 bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition duration-200"
        >
          Learn more
        </a> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
