import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Thumbs,
  Autoplay,
  FreeMode,
} from "swiper/modules";
import { FaHeart, FaCheckCircle, FaCopy, FaShare, FaArrowCircleRight, FaArrowRight } from "react-icons/fa";
import { RiShoppingBag4Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  EmailIcon,
  WhatsappIcon,
} from "react-share";

// Import necessary action creators and selectors
import {
  addToWishlist,
  removeFromWishlist,
} from "../../store/WishlistAction.js";
import { addTocart } from "../../store/CartAction";

// Import necessary styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import { ArrowBigRight } from "lucide-react";

const ProductDetails = ({ data }) => {
  const dispatch = useDispatch();
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("specification");
  const [showShareOptions, setShowShareOptions] = useState(false);
  
  const [selectedVariant, setSelectedVariant] = useState({
    color: "",
    size: "",
  });

  useEffect(() => {
    if (wishlist && wishlist.find((item) => item?.id === data?.id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data?.id]);

  const handleSelectVariant = (type, value) => {
    setSelectedVariant((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleWishlistToggle = (data) => {
    if (click) {
      dispatch(removeFromWishlist(data));
      toast.error("Product removed from wishlist");
    } else {
      dispatch(addToWishlist(data));
      toast.success("Product added to wishlist");
    }
    setClick(!click);
  };

  const handleAddToCart = (id) => {
    const isItemExists = cart.find((item) => item._id === id);
    if (isItemExists) {
      toast.error("Item already exists in the cart");
    } else {
      dispatch(addTocart(data));
      toast.success("Item added to cart");
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const title = data.name;

  const tabContent = {
    specification: (
      <div className="p-4 text-gray-700 text-sm">
        <h3 className="font-semibold text-lg mb-2 text-red-500">
          Specification
        </h3>
        {data?.foodSchema && data?.foodSchema[0] && (
          <div>
            <p>
              <strong>Organic Certification:</strong>{" "}
              {data?.foodSchema[0]?.organicCertification || "N/A"}
            </p>
            <p>
              <strong>Expiry Date:</strong>{" "}
              {data?.foodSchema[0]?.expiryDate || "N/A"}
            </p>
            <p>
              <strong>Weight:</strong> {data?.foodSchema[0]?.weight || "N/A"}
            </p>
            <p>
              <strong>Price:</strong> ${data?.foodSchema[0]?.price || "N/A"}
            </p>
          </div>
        )}
        {data?.clothingSchema && data?.clothingSchema[0] && (
          <div>
            <p>
              <strong>Size:</strong>{" "}
              {data?.clothingSchema[0]?.size.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Color:</strong>{" "}
              {data?.clothingSchema[0]?.color.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Material:</strong>{" "}
              {data?.clothingSchema[0]?.material || "Cotton"}
            </p>
            <p>
              <strong>Price:</strong> ${data?.clothingSchema[0]?.price || "N/A"}
            </p>
          </div>
        )}
        {data?.mobileSchema && data?.mobileSchema[0] && (
          <div>
            <p>
              <strong>Model:</strong> {data?.mobileSchema[0]?.model || "N/A"}
            </p>
            <p>
              <strong>Network:</strong>{" "}
              {data?.mobileSchema[0]?.network || "N/A"}
            </p>
            <p>
              <strong>Dimensions:</strong>{" "}
              {data?.mobileSchema[0]?.dimensions || "N/A"}
            </p>
            <p>
              <strong>Weight:</strong> {data?.mobileSchema[0]?.weight || "N/A"}
            </p>
            <p>
              <strong>Price:</strong> ${data?.mobileSchema[0]?.price || "N/A"}
            </p>
          </div>
        )}
        {data?.computerSchema && data?.computerSchema[0] && (
          <div>
            <p>
              <strong>Processor:</strong>{" "}
              {data?.computerSchema[0]?.processor || "N/A"}
            </p>
            <p>
              <strong>RAM:</strong> {data?.computerSchema[0]?.ram || "N/A"}
            </p>
            <p>
              <strong>Storage:</strong>{" "}
              {data?.computerSchema[0]?.storage || "N/A"}
            </p>
            <p>
              <strong>GPU:</strong> {data?.computerSchema[0]?.gpu || "N/A"}
            </p>
            <p>
              <strong>Price:</strong> ${data?.computerSchema[0]?.price || "N/A"}
            </p>
          </div>
        )}
        {data?.electronicsSchema && data?.electronicsSchema[0] && (
          <div>
            <p>
              <strong>Warranty:</strong>{" "}
              {data?.electronicsSchema[0]?.warranty || "N/A"}
            </p>
            <p>
              <strong>Voltage:</strong>{" "}
              {data?.electronicsSchema[0]?.voltage || "N/A"}
            </p>
            <p>
              <strong>Power:</strong>{" "}
              {data?.electronicsSchema[0]?.power || "N/A"}
            </p>
            <p>
              <strong>Connectivity:</strong>{" "}
              {data?.electronicsSchema[0]?.connectivity || "N/A"}
            </p>
            <p>
              <strong>Price:</strong> $
              {data?.electronicsSchema[0]?.price || "N/A"}
            </p>
          </div>


        )}
     
      </div>
    ),
    description: (
      <div className="p-4 text-gray-700 text-sm">
        <h3 className="font-semibold text-lg mb-2 text-red-500">Description</h3>
        <p>{data?.description}</p>
      </div>
    ),
    reviews: (
      <div className="p-4 text-gray-700 text-sm">
        <h3 className="font-semibold text-lg mb-2 text-red-500">Reviews</h3>
        <p>No reviews yet. Be the first to review this product!</p>
      </div>
    ),
  };

  return (
    <div className="bg-gray-50 lg:pt-20 pt-3">
      <div className="flex justify-between text-xs font-semibold  items-center px-3 lg:px-10">
        <div className="flex justify-start items-center gap-2">product <ArrowBigRight size={14}></ArrowBigRight> {data.collection} </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-[40%] px-4 mb-8">
            {/* Main Product Image Slider */}
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              modules={[Navigation, Thumbs, Autoplay]}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
              className="w-full lg:h-[450px] h-[300px] rounded-lg shadow-md mb-4"
            >
              {data?.image?.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-full">
                    <img
                      src={image}
                      alt={`Product ${index + 1}`}
                      className="w-full h-full rounded-lg object-cover object-center"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Thumbnails Slider */}
            <div className="py-2 ">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={5}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                className="overflow-x-auto"
              >
                {data?.image?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div
                      className={`cursor-pointer w-20 h-20 ${
                        index === activeIndex
                          ? "border-4 border-orange-500"
                          : ""
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-20 h-20 sm:w-20 sm:h-20 object-cover rounded-md transition duration-300"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="w-full md:w-[60%] p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {data.name}
            </h2>
            <p className="text-gray-600 mb-4 text-xs">{data.description}</p>
            <p className="text-gray-800 mb-4 text-sm font-semibold"> SKU: {data.sku?data.sku:"N/A"}</p>
           
            {/* Size options */}
            {data?.clothingSchema?.length > 0 && (
              <div className="size-options mb-6">
                <h3 className="text-lg font-semibold mb-2">Available Sizes:</h3>
                <div className="flex gap-4">
                  {data.clothingSchema[0].size.map((size, index) => (
                    <button
                      key={index}
                      className={`size-button ${
                        selectedVariant.size === size
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200"
                      } py-2 px-4 rounded`}
                      onClick={() => handleSelectVariant("size", size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color options */}
            {data?.clothingSchema?.length > 0 && (
              <div className="color-options mb-6">
                <h3 className="text-lg font-semibold mb-2">
                  Available Colors:
                </h3>
                <div className="flex gap-4">
                  {data.clothingSchema[0].color.map((color, index) => (
                    <div
                      key={index}
                      className={`color-button ${
                        selectedVariant.color === color
                          ? "border-2 border-blue-500"
                          : ""
                      }`}
                      style={{
                        backgroundColor: color,
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                      }}
                      onClick={() => handleSelectVariant("color", color)}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-start gap-4 items-center mb-4">
              <p className="text-xl font-semibold text-green-600">
                Price: {data?.MainCashDiscountPrice?data?.MainCashDiscountPrice:data.Mainprice}৳
              </p>
              {data.Mainprice && 
              <p className="text-sm line-through font-semibold text-red-600">
              Old Price: {data.Mainprice}৳
              </p>
              }
            </div>
            <p
              className={`text-sm mb-4 ${
                data.status === "In Stock" ? "text-slate-700" : "text-red-500"
              }`}
            >
              {data.status} {data?.stock}
            </p>

            {data?.isWholesale && (
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-red-500">Wholesale Prices</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Price per Unit</th>
                  <th className="py-2 px-4 text-left">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {data?.wholeSalePrice?.map((price, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                    <td className="py-2 px-4">{price?.minQuantity}+ units</td>
                    <td className="py-2 px-4">{price?.pricePerUnit}৳</td>
                    <td className="py-2 px-4">{price?.minQuantity * price?.pricePerUnit}৳</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-gray-600">* Prices are subject to change. Contact us for bulk orders.</p>
        </div>
      )}
            <div className="flex justify-start items-center gap-4 mb-6">
              <button
                onClick={()=>handleWishlistToggle(data)}
                className=" flex items-center justify-center gap-1 px-3 py-1 background-gradient text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                {click ? <FaCheckCircle /> : <FaHeart />}{" "}
                {click ? "Remove From ❤️" : "Add to ❤️"}
              </button>
              <button
                onClick={() => handleAddToCart(data._id)}
                className=" flex items-center justify-center gap-2 px-3 py-1 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <RiShoppingBag4Fill /> Add to Cart
              </button>
              {/* <div className="relative">
                <button
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="w-56 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  <FaShare /> Share
                </button>
                {showShareOptions && (
                  <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      <FacebookShareButton
                        url={shareUrl}
                        quote={title}
                        className="w-full"
                      >
                        <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <FacebookIcon size={32} round className="mr-2" />
                          Share on Facebook
                        </div>
                      </FacebookShareButton>
                      <FacebookMessengerShareButton
                        url={shareUrl}
                        title={title}
                        className="w-full"
                      >
                        <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <FacebookMessengerIcon size={32} round className="mr-2" />
                          Share on Messenger
                        </div>
                      </FacebookMessengerShareButton>
                      <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        className="w-full"
                      >
                        <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <WhatsappIcon size={32} round className="mr-2" />
                          Share on WhatsApp
                        </div>
                      </WhatsappShareButton>
                      <EmailShareButton
                        url={shareUrl}
                        title={title}
                        className="w-full"
                      >
                        <div className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <EmailIcon size={32} round className="mr-2" />
                          Share on Email
                        </div>
                      </EmailShareButton>
                    </div>
                  </div>
                )}
              </div> */}
            </div>
            <div className="flex items-center gap-2 mt-4">
              <h2 className="flex justify-start items-center gap-2 font-semibold text-gradient">Share on <FaShare></FaShare></h2>
             
              <FacebookShareButton url={shareUrl} quote={title}>
              
                  <FacebookIcon size={24} round />
              </FacebookShareButton>

              <FacebookMessengerShareButton url={shareUrl} title={title}>
         
                  <FacebookMessengerIcon size={24} round />
              </FacebookMessengerShareButton>

              <WhatsappShareButton url={shareUrl} title={title}>
                
                  <WhatsappIcon size={24} round />

              </WhatsappShareButton>

              <EmailShareButton url={shareUrl} title={title}>
             
                  <EmailIcon size={24} round />
              </EmailShareButton>
            </div>

           
          </div>

           {/* Tab content */}
           <div className="w-full max-w-2xl mx-auto mt-8">
              <div className="flex border-b">
                {["description", "specification", "reviews"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 text-sm font-medium capitalize ${
                      activeTab === tab
                        ? "text-red-500 border-b-2 border-red-500"
                        : "text-gray-600"
                    } transition-all duration-300`}
                  >
                    {tab} {tab === "reviews" && "(0)"}
                  </button>
                ))}
              </div>

              <div className="p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-700 text-sm"
                  >
                    {tabContent[activeTab]}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
