import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaHeart,
  FaCheckCircle,
  FaCopy,
  FaDownload,
  FaYoutube,
} from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import ReactPlayer from "react-player/youtube";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../store/WishlistAction";
import TermsModal from "../../TermsModal";
import axios from "axios";

const SellerProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const userState = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const [showVideo, setShowVideo] = useState(false);
  const [activeTab, setActiveTab] = useState("specification");
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chargeIncluded, setChargeIncluded] = useState(false);
    const [shippingCharge, setShippingCharge] = useState(0);
  const userInfo =
    userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
  const resellerId = userInfo?.user?._id;

  const [selectedVariant, setSelectedVariant] = useState({
    color: "",
    size: "",
  });

  const [order, setOrder] = useState({
    products: [
      {
        productId: id,
        quantity: 1,
        pricePerUnit: 0,
        totalPrice: 0,
        size: "",
        color: "",
      },
    ],
    status: "pending",
    notes: [],
    tags: [],
    totalAmount: 0,
    expectedDeliveryDate: null,
    shippingAddress: {
      division: "",
      district: "",
      upazila: "",
      address: "",
    },
    phoneNumber: "",
    shippingCharge: 0,
    customerName: "",
    sellingPrice: 0,
    CustomerDeliveryCharge: chargeIncluded,
    paymentStatus: "pending",
    sellerId: resellerId,
    Profit: 0,
    courierService: "Pathao",
  });

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [error, setError] = useState("");

  const validatePrice = (e) => {
    const { value } = e.target;
    const minPrice = product.resellerPrice;
    const maxPrice = product.maximumRetailPrice;

    if (value && (Number(value) < minPrice || Number(value) > maxPrice)) {
      setError(`সেলিং প্রাইস ${minPrice} থেকে ${maxPrice} এর মধ্যে হতে হবে।`);
    } else {
      setError("");
    }

    handleOrderChange(e);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/products/product/${id}`
        );
        const data = await response.json();
        setProduct(data.data);
        setLoading(false);
      } catch (error) {
        toast.error("পণ্য লোড করতে সমস্যা হয়েছে!");
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (wishlist && wishlist?.find((item) => item._id === id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, id]);

  const handleSelectVariant = (type, value) => {
    setSelectedVariant((prevState) => ({
      ...prevState,
      [type]: value,
    }));
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleProductChange = (e, index) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => {
      const updatedProducts = [...prevOrder.products];
      updatedProducts[index] = {
        ...updatedProducts[index],
        [name]: value,
      };
      return {
        ...prevOrder,
        products: updatedProducts,
      };
    });
  };

  const handleColorChange = (color) => {
    setOrder((prevOrder) => {
      const updatedProducts = [...prevOrder.products];
      updatedProducts[0] = {
        ...updatedProducts[0],
        color: color,
      };
      return {
        ...prevOrder,
        products: updatedProducts,
      };
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      shippingAddress: {
        ...prevOrder.shippingAddress,
        [name]: value,
      },
    }));
  };

  const handleNotesChange = (e) => {
    const notes = e.target.value.split("\n");
    setOrder((prevOrder) => ({
      ...prevOrder,
      notes: notes,
    }));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!product) {
      toast.error("পণ্য তথ্য পাওয়া যায়নি!");
      return;
    }
    setIsModalOpen(true);
    
  };

  const copyProductDetails = () => {
    const details = `
      পণ্যের নাম: ${product.name}
      বিবরণ: ${product.description}
     
     
      ${
        product.clothingSchema
          ? `সাইজ: ${order.products[0].size}\nরং: ${order.products[0].color}`
          : ""
      }
    `;
    navigator.clipboard.writeText(details).then(() => {
      toast.success("পণ্যের বিবরণ কপি করা হয়েছে!");
    });
  };

  const downloadImage = (url, filename) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => toast.error("ছবি ডাউনলোড করতে সমস্যা হয়েছে!"));
  };

  const handleWishlistRemoveItem = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
    toast.error("ফেভারিট লিস্ট থেকে মুছে ফেলা হয়েছে");
  };

  const handleWishlistAddItem = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
    toast.success("ফেভারিট লিস্টে যোগ করা হয়েছে");
  };

  const handleChargeChange = (value) => {
        setChargeIncluded(value === "yes");
        setShippingCharge(70)
        if (value === "no") setShippingCharge(0); // Reset shipping charge if "No"
      };
    
      const handleShippingChange = (value) => {
        setShippingCharge(value === "inside" ? 70 : 130); // Set charge based on selection
       };
  const allUpazellas = upazilas.map((upazila) => upazila.upazillas).flat();

  const tabContent = {
    specification: (
      <div className="p-4 text-gray-700 text-sm">
        <h3 className="font-semibold text-lg mb-2 text-red-500">
          বিস্তারিত তথ্য
        </h3>
        {product?.clothingSchema && (
          <div>
            <p>
              <strong>উপাদান:</strong>{" "}
              {product.clothingSchema[0]?.material || "N/A"}
            </p>
            <p>
              <strong>উপলব্ধ সাইজ:</strong>{" "}
              {product.clothingSchema[0]?.size.join(", ") || "N/A"}
            </p>
            <p>
              <strong>উপলব্ধ রং:</strong>{" "}
              {product.clothingSchema[0]?.color.join(", ") || "N/A"}
            </p>
          </div>
        )}
        {product?.foodSchema && (
          <div>
            <p>
              <strong>মেয়াদ উত্তীর্ণের তারিখ:</strong>{" "}
              {product.foodSchema[0]?.expiryDate || "N/A"}
            </p>
            <p>
              <strong>ওজন:</strong> {product.foodSchema[0]?.weight || "N/A"}
            </p>
          </div>
        )}
      </div>
    ),
    description: (
      <div className="p-4 text-gray-700 text-sm">
        <h3 className="font-semibold text-lg mb-2 text-red-500">বিবরণ</h3>
        <p>{product?.description}</p>
      </div>
    ),
    reviews: (
      <div className="p-4 text-gray-700 text-sm">
        <h3 className="font-semibold text-lg mb-2 text-red-500">রিভিউ</h3>
        <p>এখনও কোনো রিভিউ নেই। প্রথম রিভিউ দিন!</p>
      </div>
    ),
  };

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await axios.get(
          "https://bdapis.com/api/v1.2/divisions"
        );
        setDivisions(response.data.data);
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    };
    fetchDivisions();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (order.shippingAddress.division) {
        try {
          const response = await axios.get(
            `https://bdapis.com/api/v1.1/division/${order.shippingAddress.division}`
          );
          console.log("Districts:", response.data.data);
          setDistricts(response.data.data);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      }
    };
    fetchDistricts();
  }, [order.shippingAddress.division]);

  useEffect(() => {
    const fetchUpazilas = async () => {
      if (order.shippingAddress.district) {
        try {
          const response = await axios.get(
            `https://bdapis.com/api/v1.2/district/${order.shippingAddress.district.toLowerCase()}`
          );
          console.log("Upazilas for:", response.data.data);
          setUpazilas(response.data.data);
        } catch (error) {
          console.error("Error fetching upazilas:", error);
        }
      }
    };
    fetchUpazilas();
  }, [order.shippingAddress.district]);

  const handleConfirmOrder =async () => {
    const totalPrice = order.products[0].quantity * product.resellerPrice;

    const updatedOrder = {
      ...order,
      products: [
        {
          ...order.products[0],
          pricePerUnit: product.resellerPrice,
          totalPrice: totalPrice,
        },
      ],
      shippingCharge,
      sellingPrice: order.sellingPrice * order?.products[0]?.quantity,
      totalAmount:
        totalPrice + (order.CustomerDeliveryCharge ? 0 : order.shippingCharge),
      Profit:
        order.sellingPrice * order?.products[0]?.quantity -
        totalPrice -
        (order.CustomerDeliveryCharge ? 0 : order.shippingCharge),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/resellerOrder/orders`,
        updatedOrder
      );
      if (response.data) {
        toast.success("অর্ডার সফলভাবে জমা হয়েছে!");
        navigate("/seller/order-report");
      } else {
        toast.error(response.data.message || "অর্ডার করতে সমস্যা হয়েছে!");
      }
    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(error.response.data.message || "অর্ডার করতে সমস্যা হয়েছে!");
    } setIsModalOpen(false)
  };

  if (loading) return <div className="text-center py-20">লোড হচ্ছে...</div>;

  console.log("All Upazellas ", allUpazellas);
  return (
    <div className="container mx-auto px-4 py-6 bg-gray-50">
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative">
            <img
              src={product?.image[activeImage] || "/placeholder.svg"}
              alt={product?.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
            <button
              onClick={() =>
                downloadImage(
                  product?.image[activeImage],
                  `${product?.name}-${activeImage}.jpg`
                )
              }
              className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
              title="ছবি ডাউনলোড করুন"
            >
              <FaDownload className="text-gray-600" />
            </button>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {product?.image?.map((img, index) => (
              <img
                key={index}
                src={img || "/placeholder.svg"}
                alt={`product-${index}`}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-all ${
                  activeImage === index
                    ? "border-2 border-red-500"
                    : "border border-gray-300"
                }`}
                onClick={() => setActiveImage(index)}
              />
            ))}
          </div>
          {product?.video && (
            <button
              onClick={() => setShowVideo(!showVideo)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <FaYoutube className="text-2xl" />{" "}
              {showVideo ? "ভিডিও লুকান" : "ভিডিও দেখুন"}
            </button>
          )}
          {showVideo && (
            <div className="mt-4">
              <ReactPlayer url={product?.video} controls width="100%" />
            </div>
          )}
        </div>

        <div className="p-6">
          <div className=" flex items-center md:flex-row  justify-between flex-col">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              {product.name}
            </h2>
            <p className="md:text-xl font-semibold text-[#DB2777]">
              কাস্টমার মূল্য:{" "}
              {product?.MainCashDiscountPrice
                ? product?.MainCashDiscountPrice
                : product?.Mainprice}
              ৳
            </p>
          </div>
          <p className="text-gray-600 mb-4 text-sm">{product.description}</p>

          {product?.clothingSchema && product?.clothingSchema.length > 0 && (
            <div className="size-options mb-6">
              <h3 className="text-lg font-semibold mb-2">Available Sizes:</h3>
              <div className="flex gap-4">
                {product.clothingSchema.map((variant) =>
                  variant.size.map((size, index) => (
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
                  ))
                )}
              </div>
            </div>
          )}

          {product?.clothingSchema && product?.clothingSchema.length > 0 && (
            <div className="color-options mb-6">
              <h3 className="text-lg font-semibold mb-2">Available Colors:</h3>
              <div className="flex gap-4">
                {product.clothingSchema.map((variant) =>
                  variant.color.map((color, index) => (
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
                  ))
                )}
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <p className="md:text-xl font-semibold text-red-600">
              সর্বনিম্ম বিক্রয়মূল্য: {product.resellerPrice}৳
            </p>
            <p className="md:text-xl font-semibold text-green-600">
              সর্বোচ্চ বিক্রয়মূল্য: {product?.maximumRetailPrice}৳
            </p>
          </div>
          <div className="text-xs text-red-500 mb-4">
            রিসেলারগণ সর্বোচ্চ ও সর্বনিম্ন বিক্রয়মূল্যের সীমার মধ্যে পণ্য
            বিক্রয় করতে পারবেন
          </div>
          <p
            className={`text-sm mb-4 ${
              product.status === "In Stock" ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.status} {product?.stock}
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            <button
              onClick={() =>
                click
                  ? handleWishlistRemoveItem(product)
                  : handleWishlistAddItem(product)
              }
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
            >
              {click ? <FaCheckCircle /> : <FaHeart />}{" "}
              {click ? "ফেভারিট থেকে মুছুন" : "ফেভারিটে রাখুন"}
            </button>
            <button
              onClick={copyProductDetails}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <FaCopy /> বিবরণ কপি করুন
            </button>
          </div>

          <form onSubmit={handleOrderSubmit} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              অর্ডার দিন
            </h3>
            <div>
              <label
                htmlFor="customerName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                কাস্টমার নাম
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={order.customerName}
                onChange={handleOrderChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="কাস্টমার নাম"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ফোন নম্বর
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                value={order.phoneNumber}
                onChange={handleOrderChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ফোন নম্বর দিন"
                required
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                পরিমাণ
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={order.products[0].quantity}
                onChange={(e) => handleProductChange(e, 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
            <div>
      <label
        htmlFor="sellingPrice"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        সেলিং প্রাইস
      </label>
      <input
        type="text" // Using text to allow regex validation
        id="sellingPrice"
        name="sellingPrice"
        value={order.sellingPrice}
        pattern="^[0-9]+$" // Regex: Only numbers allowed
        onChange={validatePrice}
        className={`w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md focus:outline-none focus:ring-2 ${
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        }`}
        placeholder="সেলিং প্রাইস দিন"
        required
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
            {product?.clothingSchema && product?.clothingSchema.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="size"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    সাইজ
                  </label>
                  <select
                    id="size"
                    name="size"
                    value={order.products[0].size}
                    onChange={(e) => handleProductChange(e, 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">সাইজ নির্বাচন করুন</option>
                    {product.clothingSchema
                      .flatMap((variant) => variant.size)
                      .filter(
                        (value, index, self) => self.indexOf(value) === index
                      )
                      .map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    রং
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {product.clothingSchema
                      .flatMap((variant) => variant.color)
                      .filter(
                        (value, index, self) => self.indexOf(value) === index
                      )
                      .map((color) => (
                        <div
                          key={color}
                          className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                            order.products[0].color === color
                              ? "border-blue-500"
                              : "border-gray-300"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorChange(color)}
                          title={color}
                        ></div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="division"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                বিভাগ
              </label>
              <select
                id="division"
                name="division"
                value={order.shippingAddress.division}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">বিভাগ নির্বাচন করুন</option>
                {divisions.map((division) => (
                  <option key={division.id} value={division.division}>
                    {division.division}
                  </option>
                ))}
              </select>
            </div>
            {order.shippingAddress.division && (
              <div>
                <label
                  htmlFor="district"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  জেলা
                </label>
                <select
                  id="district"
                  name="district"
                  value={order.shippingAddress.district}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">জেলা নির্বাচন করুন</option>
                  {districts.map((district) => (
                    <option key={district} value={district.district}>
                      {district.district}
                    </option>
                  ))}
                </select>
              </div>
            )}
            {order.shippingAddress.district && (
              <div>
                <label
                  htmlFor="upazila"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  উপজেলা
                </label>
                <select
                  id="upazila"
                  name="upazila"
                  value={order.shippingAddress.upazila}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">উপজেলা নির্বাচন করুন</option>

                  {allUpazellas.map((upazila, index) => (
                    <option key={index} value={upazila}>
                      {upazila}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ঠিকানা
              </label>
              <textarea
                id="address"
                name="address"
                value={order.shippingAddress.address}
                onChange={handleAddressChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="বিস্তারিত ঠিকানা দিন"
                rows="3"
                required
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="notes"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                নোটস
              </label>
              <textarea
                id="notes"
                name="notes"
                value={order.notes.join("\n")}
                onChange={handleNotesChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="যেকোনো নোটস"
                rows="3"
              ></textarea>
            </div>
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                কাস্টমার ডেলিভারি চার্জ দিবে?
              </label>
              <div className="flex items-center space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="CustomerDeliveryCharge"
                    value="true"
                    checked={order.CustomerDeliveryCharge}
                    onChange={() =>
                      setOrder({ ...order, CustomerDeliveryCharge: true })
                    }
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">হ্যাঁ</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="CustomerDeliveryCharge"
                    value="false"
                    checked={!order.CustomerDeliveryCharge}
                    onChange={() =>
                      setOrder({ ...order, CustomerDeliveryCharge: false })
                    }
                    className="form-radio h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">না</span>
                </label>
              </div>
            </div> */}

            {/* {!order.CustomerDeliveryCharge && (
              <div>
                <label
                  htmlFor="shippingCharge"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  শিপিং চার্জ
                </label>
                <input
                  type="number"
                  id="shippingCharge"
                  name="shippingCharge"
                  value={order.shippingCharge}
                  onChange={handleOrderChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="শিপিং চার্জ দিন"
                  required
                />
              </div>
            )} */}
 <div className="max-w-md">
        <label className="block text-lg font-medium mb-2">
          চার্জ অন্তর্ভুক্ত করেছেন? <span className="text-red-500">*</span>
        </label>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="chargeIncluded"
              value="yes"
              checked={chargeIncluded === true}
              onChange={(e) => handleChargeChange(e.target.value)}
              className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
            />
            <span className="text-lg">হ্যাঁ</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="chargeIncluded"
              value="no"
              checked={chargeIncluded === false}
              onChange={(e) => handleChargeChange(e.target.value)}
              className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
            />
            <span className="text-lg">না</span>
          </label>
        </div>
        {chargeIncluded && (
          <div className="mt-4">
            <label className="block text-lg font-medium mb-2">
              শিপিং চার্জ নির্বাচন করুন
            </label>
            <select
              onChange={(e) => handleShippingChange(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="inside">ঢাকার ভেতরে - ৭০৳</option>
              <option value="outside">ঢাকার বাইরে - ১৩০৳</option> 
            </select>
          </div>
        )}
        <p className="mt-2 text-sm text-red-500">
        যদি শিপিং চার্জ আপনার থেকে নেওয়া হয়, তাহলে চার্জ সিলেক্ট করুন। আর যদি কাস্টমারের থেকে নেওয়া হয়, তাহলে চার্জ সিলেক্ট না করে অর্ডার কনফার্ম করুন।
        </p>
      </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              অর্ডার করুন
            </button>
          </form>
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="flex border-b">
          {["description", "specification", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-6 py-3 text-sm font-medium capitalize ${
                activeTab === tab
                  ? "text-red-600 border-b-2 border-red-600"
                  : "text-gray-600 hover:text-red-600"
              } transition-all duration-300`}
            >
              {tab} {tab === "reviews" && "(0)"}
            </button>
          ))}
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-gray-700"
            >
              {tabContent[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <TermsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmOrder}
      />
    </div>
  );
};

export default SellerProductDetails;




// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { FaHeart, FaCheckCircle, FaCopy, FaDownload, FaYoutube } from "react-icons/fa";
// import { toast, Toaster } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSelector, useDispatch } from "react-redux";
// import ReactPlayer from 'react-player/youtube';
// import { addToWishlist, removeFromWishlist } from "../../../store/WishlistAction";
// import TermsModal from "../../TermsModal";


// const SellerProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const userState = useSelector((state) => state.user);
//   const { wishlist } = useSelector((state) => state.wishlist);
//   const [click, setClick] = useState(false);
//   const dispatch = useDispatch();
//   const [showVideo, setShowVideo] = useState(false);
//   const [activeTab, setActiveTab] = useState("specification");
//   const [activeImage, setActiveImage] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
//   const resellerId = userInfo?.user?._id;

//   const [selectedVariant, setSelectedVariant] = useState({
//     color: '',
//     size: ''
//   });

//   const handleSelectVariant = (type, value) => {
//     setSelectedVariant(prevState => ({
//       ...prevState,
//       [type]: value
//     }));
//   };


//   const navigate = useNavigate(); 
//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_URL}/products/product/${id}`);
//         const data = await response.json();
//         setProduct(data.data);
//         setLoading(false);
//       } catch (error) {
//         toast.error("পণ্য লোড করতে সমস্যা হয়েছে!");
//       }
//     };
//     fetchProduct();
//   }, [id]);
// console.log(product)
//   useEffect(() => {
//     if (wishlist && wishlist?.find((item) => item._id === id)) {
//       setClick(true);
//     } else {
//       setClick(false);
//     }
//   }, [wishlist, id]);

//   const [chargeIncluded, setChargeIncluded] = useState(false);
//   const [shippingCharge, setShippingCharge] = useState(0);


//   const [order, setOrder] = useState({
//     phoneNumber: "",
//     customerName:"",
//     quantity: 1,
//     shippingAddress: "",
//     notes: "",
//     sellingPrice: 0,
//     CustomerDeliveryCharge: chargeIncluded,
//     size:"",
//     color: "",
//     shippingCharge:""
//   });

 

//   const handleChargeChange = (value) => {
//     setChargeIncluded(value === "yes");
//     setShippingCharge(70)
//     if (value === "no") setShippingCharge(0); // Reset shipping charge if "No"
//   };

//   const handleShippingChange = (value) => {
//     setShippingCharge(value === "inside" ? 70 : 130); // Set charge based on selection
//   };

//   const handleOrderChange = (e) => {
//     const { name, value } = e.target;
//     setOrder((prevOrder) => ({
//       ...prevOrder,
//       [name]: value,
//     }));
//   };

//   const handleOrderSubmit = (e) => {
//     e.preventDefault();
//     if (!product) {
//       toast.error("পণ্য তথ্য পাওয়া যায়নি!");
//       return;
//     }
//     if (!order.phoneNumber || !order.quantity || !order.shippingAddress) {
//       toast.error("ফোন নম্বর, পরিমাণ এবং শিপিং ঠিকানা দেওয়া বাধ্যতামূলক!");
//       return;
//     }
//     setIsModalOpen(true);
//   };
// console.log(shippingCharge)
//   const handleConfirmOrder = async () => {
//     const products = [{
//       productId: product._id,
//       quantity: order.quantity,
//       pricePerUnit: product.resellerPrice,
//       totalPrice: order.quantity * product.resellerPrice,
//       size: order.size,
//       color: order.color,
//     }];

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_URL}/resellerOrder/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           products,
//           shippingAddress: order.shippingAddress,
//           phoneNumber: order.phoneNumber,
//           customerName: order?.customerName,
//           notes: order.notes,
//           sellerId: resellerId,
//           paymentStatus: "pending",
//           sellingPrice: Number(order.sellingPrice),
//           CustomerDeliveryCharge: chargeIncluded,
//           shippingCharge, // Include shipping charge in the ord
//         }),
//       });

//       const data = await response.json();

//       if (data) {
//         toast.success("অর্ডার সফলভাবে জমা হয়েছে!");
//         setOrder({ phoneNumber: "", customerName:"", quantity: 1, shippingAddress: "",  notes: "", size: "", color: "", sellingPrice: 0 });
//         navigate("/seller/order-report");
//       } else {
//         toast.error("অর্ডার করতে সমস্যা হয়েছে!");
//       }
//     } catch (error) {
//       toast.error("অর্ডার করতে সমস্যা হয়েছে!");
//     }
//     setIsModalOpen(false);
//   };

//   const copyProductDetails = () => {
//     const details = `
//       পণ্যের নাম: ${product.name}
//       বিবরণ: ${product.description}
//       কাস্টমার মূল্য: ${product?.MainCashDiscountPrice?product?.MainCashDiscountPrice:product?.Mainprice}৳
     
//       ${product.clothingSchema ? `সাইজ: ${order.size}\nরং: ${order.color}` : ''}
//     `;
//     navigator.clipboard.writeText(details).then(() => {
//       toast.success("পণ্যের বিবরণ কপি করা হয়েছে!");
//     });
//   };

//   const downloadImage = (url, filename) => {
//     fetch(url)
//       .then(response => response.blob())
//       .then(blob => {
//         const link = document.createElement("a");
//         link.href = URL.createObjectURL(blob);
//         link.download = filename;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
//       })
//       .catch(() => toast.error("ছবি ডাউনলোড করতে সমস্যা হয়েছে!"));
//   };

//   const handleWishlistRemoveItem = (data) => {
//     setClick(!click);
//     dispatch(removeFromWishlist(data));
//     toast.error("ফেভারিট লিস্ট থেকে মুছে ফেলা হয়েছে");
//   };

//   const handleWishlistAddItem = (data) => {
//     setClick(!click);
//     dispatch(addToWishlist(data));
//     toast.success("ফেভারিট লিস্টে যোগ করা হয়েছে");
//   };

//   const tabContent = {
//     specification: (
//       <div className="p-4 text-gray-700 text-sm">
//         <h3 className="font-semibold text-lg mb-2 text-red-500">বিস্তারিত তথ্য</h3>
//         {product?.clothingSchema && (
//           <div>
//             <p><strong>উপাদান:</strong> {product.clothingSchema[0]?.material || 'N/A'}</p>
//             <p><strong>উপলব্ধ সাইজ:</strong> {product.clothingSchema[0]?.size.join(', ') || 'N/A'}</p>
//             <p><strong>উপলব্ধ রং:</strong> {product.clothingSchema[0]?.color.join(', ') || 'N/A'}</p>
//           </div>
//         )}
//         {product?.foodSchema && (
//           <div>
//             <p><strong>মেয়াদ উত্তীর্ণের তারিখ:</strong> {product.foodSchema[0]?.expiryDate || 'N/A'}</p>
//             <p><strong>ওজন:</strong> {product.foodSchema[0]?.weight || 'N/A'}</p>
//           </div>
//         )}
//       </div>
//     ),
//     description: (
//       <div className="p-4 text-gray-700 text-sm">
//         <h3 className="font-semibold text-lg mb-2 text-red-500">বিবরণ</h3>
//         <p>{product?.description}</p>
//       </div>
//     ),
//     reviews: (
//       <div className="p-4 text-gray-700 text-sm">
//         <h3 className="font-semibold text-lg mb-2 text-red-500">রিভিউ</h3>
//         <p>এখনও কোনো রিভিউ নেই। প্রথম রিভিউ দিন!</p>
//       </div>
//     ),
//   };

//   if (loading) return <div className="text-center py-20">লোড হচ্ছে...</div>;

//   return (
//     <div className="container mx-auto px-4 py-6 bg-gray-50">
//       <Toaster />
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-4">
//           <div className="relative">
//             <img
//               src={product?.image[activeImage]}
//               alt={product?.name}
//               className="w-full h-96 object-cover rounded-lg shadow-lg"
//             />
//             <button
//               onClick={() => downloadImage(product?.image[activeImage], `${product?.name}-${activeImage}.jpg`)}
//               className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
//               title="ছবি ডাউনলোড করুন"
//             >
//               <FaDownload className="text-gray-600" />
//             </button>
//           </div>
//           <div className="flex gap-2 overflow-x-auto pb-2">
//             {product?.image?.map((img, index) => (
//               <img
//                 key={index}
//                 src={img}
//                 alt={`product-${index}`}
//                 className={`w-20 h-20 object-cover rounded-md cursor-pointer transition-all ${
//                   activeImage === index ? 'border-2 border-red-500' : 'border border-gray-300'
//                 }`}
//                 onClick={() => setActiveImage(index)}
//               />
//             ))}
//           </div>
//         {product?.video && (  <button
//             onClick={() => setShowVideo(!showVideo)}
//             className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
//           >
//             <FaYoutube className="text-2xl" /> {showVideo ? "ভিডিও লুকান" : "ভিডিও দেখুন"}
//           </button> )}
//           {showVideo && (
//             <div className="mt-4">
//               <ReactPlayer url={product?.video} controls width="100%" />
//             </div>
//           )}
//         </div>

//         <div className="p-6">
//           <h2 className="text-3xl font-bold text-gray-800 mb-3">{product.name}</h2>
//           <p className="text-gray-600 mb-4 text-sm">{product.description}</p>

//            {/* Displaying size options */}

//            {product?.clothingSchema.length > 0 && (<div className="size-options mb-6">
//         <h3 className="text-lg font-semibold mb-2">Available Sizes:</h3>
//         <div className="flex gap-4">
//           {product.clothingSchema.map((variant) => (
//             variant.size.map((size, index) => (
//               <button
//                 key={index}
//                 className={`size-button ${selectedVariant.size === size ? 'bg-blue-500 text-white' : 'bg-gray-200'} py-2 px-4 rounded`}
//                 onClick={() => handleSelectVariant('size', size)}
//               >
//                 {size}
//               </button>
//             ))
//           ))}
//         </div>
//       </div>)}
      

//       {/* Displaying color options */}

//       {product?.clothingSchema.length > 0 && 
//       <div className="color-options mb-6">
//         <h3 className="text-lg font-semibold mb-2">Available Colors:</h3>
//         <div className="flex gap-4">
//           {product.clothingSchema.map((variant) => (
//             variant.color.map((color, index) => (
//               <div
//                 key={index}
//                 className={`color-button ${selectedVariant.color === color ? 'border-2 border-blue-500' : ''}`}
//                 style={{ backgroundColor: color, width: "30px", height: "30px", borderRadius: "50%" }}
//                 onClick={() => handleSelectVariant('color', color)}
//               />
//             ))
//           ))}
//         </div>
//       </div>
// }
        
   
//           <div className="flex justify-between items-center mb-4">
//             <p className="text-xl font-semibold text-red-600">
//               কাস্টমার মূল্য: {product?.MainCashDiscountPrice?product?.MainCashDiscountPrice:product?.Mainprice}৳
//             </p>
//             <p className="text-xl font-semibold text-green-600">
//               সেলার মূল্য: {product.resellerPrice}৳
//             </p>
//           </div>
//           <p className={`text-sm mb-4 ${product.status === "In Stock" ? "text-green-500" : "text-red-500"}`}>
//             {product.status} {product?.stock}
//           </p>

//           <div className="flex flex-wrap gap-4 mb-6">
//             <button onClick={() => click ? handleWishlistRemoveItem(product) : handleWishlistAddItem(product)} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors">
//               {click ? <FaCheckCircle /> : <FaHeart />} {click ? 'ফেভারিট থেকে মুছুন' : 'ফেভারিটে রাখুন'}
//             </button>
//             <button
//               onClick={copyProductDetails}
//               className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
//             >
//               <FaCopy /> বিবরণ কপি করুন
//             </button>
//           </div>

//           <form onSubmit={handleOrderSubmit} className="space-y-4">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">অর্ডার দিন</h3>
//             <div>
//               <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">কাস্টমার নাম</label>
//               <input
//                 type="text"
//                 id="customerName"
//                 name="customerName"
//                 value={order.customerName}
//                 onChange={handleOrderChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="কাস্টমার নাম"
//               />
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">ফোন নম্বর</label>
//                 <input
//                   type="text"
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   value={order.phoneNumber}
//                   onChange={handleOrderChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   placeholder="ফোন নম্বর দিন"
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">পরিমাণ</label>
//                 <input
//                   type="number"
//                   id="quantity"
//                   name="quantity"
//                   value={order.quantity}
//                   onChange={handleOrderChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   min="1"
//                   required
//                 />
//               </div>
//             </div>
//             <div>
//               <label htmlFor="sellingPrice" className="block text-sm font-medium text-gray-700 mb-1">সেলিং প্রাইস</label>
//               {/* <input
//                 type="number"
//                 id="sellingPrice"
//                 name="sellingPrice"
//                 value={order.sellingPrice}
//                 onChange={handleOrderChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="সেলিং প্রাইস দিন"
//                 required
//               /> */}

// <input
//   type="number"
//   id="sellingPrice"
//   name="sellingPrice"
//   value={order.sellingPrice}
//   onChange={handleOrderChange}
//   onBlur={() => {
//     const resellerPrice = product.resellerPrice;
//     const maxPrice =
//       product?.MainCashDiscountPrice
//         ? product?.MainCashDiscountPrice
//         : product?.Mainprice;

//     if (order.sellingPrice < resellerPrice) {
//       toast("সেলিং প্রাইস সেলার মূল্যের থেকে কম দেওয়া যাবে না!");
//     } else if (order.sellingPrice > maxPrice + 500) {
//       toast("সেলিং প্রাইস কাস্টমার মূল্যের থেকে ৫০০ টাকার বেশি দেওয়া যাবে না!");
//     }
//   }}
//   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//   placeholder="সেলিং প্রাইস দিন"
//   required
// />

//             </div>
//             {product?.clothingSchema && product?.clothingSchema.length > 0 && (
//   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//     {/* Size Selection */}
//     <div>
//       <label htmlFor="size" className="block text-sm font-medium text-gray-700 mb-1">সাইজ</label>
//       <select
//         id="size"
//         name="size"
//         value={order.size}
//         onChange={handleOrderChange}
//         className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//         required
//       >
//         <option value="">সাইজ নির্বাচন করুন</option>
//         {product.clothingSchema
//           .flatMap((variant) => variant.size)
//           .filter((value, index, self) => self.indexOf(value) === index)
//           .map((size) => (
//             <option key={size} value={size}>{size}</option>
//           ))}
//       </select>
//     </div>

//     {/* Color Selection */}
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">রং</label>
//       <div className="flex gap-2 flex-wrap">
//         {product.clothingSchema
//           .flatMap((variant) => variant.color)
//           .filter((value, index, self) => self.indexOf(value) === index)
//           .map((color) => (
//             <div
//               key={color}
//               className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
//                 order.color === color ? 'border-blue-500' : 'border-gray-300'
//               }`}
//               style={{ backgroundColor: color }}
//               onClick={() => setOrder({ ...order, color })}
//               title={color}
//             ></div>
//           ))}
//       </div>
//     </div>
//   </div>
// )}


//             <div>
//               <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700 mb-1">শিপিং ঠিকানা</label>
//               <textarea
//                 id="shippingAddress"
//                 name="shippingAddress"
//                 value={order.shippingAddress}
//                 onChange={handleOrderChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="ঠিকানা দিন"
//                 rows="3"
//                 required
//               ></textarea>
//             </div>
//             <div className="max-w-md">
//         <label className="block text-lg font-medium mb-2">
//           চার্জ অন্তর্ভুক্ত করেছেন? <span className="text-red-500">*</span>
//         </label>
//         <div className="flex items-center space-x-4">
//           <label className="flex items-center space-x-2">
//             <input
//               type="radio"
//               name="chargeIncluded"
//               value="yes"
//               checked={chargeIncluded === true}
//               onChange={(e) => handleChargeChange(e.target.value)}
//               className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//             />
//             <span className="text-lg">হ্যাঁ</span>
//           </label>
//           <label className="flex items-center space-x-2">
//             <input
//               type="radio"
//               name="chargeIncluded"
//               value="no"
//               checked={chargeIncluded === false}
//               onChange={(e) => handleChargeChange(e.target.value)}
//               className="w-4 h-4 text-pink-500 border-gray-300 focus:ring-pink-500"
//             />
//             <span className="text-lg">না</span>
//           </label>
//         </div>
//         {chargeIncluded && (
//           <div className="mt-4">
//             <label className="block text-lg font-medium mb-2">
//               শিপিং চার্জ নির্বাচন করুন
//             </label>
//             <select
//               onChange={(e) => handleShippingChange(e.target.value)}
//               className="w-full border rounded-lg px-3 py-2"
//             >
//               <option value="inside">ঢাকার ভেতরে - ৭০৳</option>
//               <option value="outside">ঢাকার বাইরে - ১৩০৳</option> 
//             </select>
//           </div>
//         )}
//         <p className="mt-2 text-sm text-red-500">
//         যদি শিপিং চার্জ আপনার থেকে নেওয়া হয়, তাহলে চার্জ সিলেক্ট করুন। আর যদি কাস্টমারের থেকে নেওয়া হয়, তাহলে চার্জ সিলেক্ট না করে অর্ডার কনফার্ম করুন।
//         </p>
//       </div>
          
//             <div>
//               <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">নোটস</label>
//               <textarea
//                 id="notes"
//                 name="notes"
//                 value={order.notes}
//                 onChange={handleOrderChange}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 placeholder="যেকোনো নোটস"
//                 rows="3"
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
//             >
//               অর্ডার করুন
//             </button>
//           </form>
//         </div>
//       </div>

//       <div className="w-full max-w-4xl mx-auto mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="flex border-b">
//           {["description", "specification", "reviews"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`flex-1 px-6 py-3 text-sm font-medium capitalize ${
//                 activeTab === tab
//                   ? "text-red-600 border-b-2 border-red-600"
//                   : "text-gray-600 hover:text-red-600"
//               } transition-all duration-300`}
//             >
//               {tab} {tab === "reviews" && "(0)"}
//             </button>
//           ))}
//         </div>

//         <div className="p-6">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={activeTab}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className="text-gray-700"
//             >
//               {tabContent[activeTab]}
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </div>

//       <TermsModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onConfirm={handleConfirmOrder}
//       />
//     </div>
//   );
// };

// export default SellerProductDetails;