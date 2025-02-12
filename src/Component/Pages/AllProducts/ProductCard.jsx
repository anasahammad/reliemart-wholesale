
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FaDownload, FaCartPlus, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToWishlist, removeFromWishlist } from "../../../store/WishlistAction";
import { FaCircleMinus } from "react-icons/fa6";

export default function ProductCard({ data }) {
  const navigate = useNavigate();
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const [click, setClick] = useState(false);
  const downloadImage = async (url) => {
    try {
      const response = await fetch(url, {
        mode: "cors",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch image");
      }
  
      const blob = await response.blob();
      const urlObject = URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = urlObject;
      link.download = `${data.title || "product-image"}.jpg`; // ডায়নামিক ফাইল নাম
      document.body.appendChild(link); // সেফটির জন্য DOM-এ অ্যাড করা
      link.click();
      document.body.removeChild(link); // পরিস্কার করা
      URL.revokeObjectURL(urlObject); // মেমরি ফ্রি
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("ডাউনলোড করতে সমস্যা হচ্ছে!");
    }
  };
  

  const handleImageClick = () => {
    navigate(`/seller/product/${data._id}`);
  };

    useEffect(() => {
      if (wishlist && wishlist.find((item) => item._id === data._id)) {
        setClick(true);
      } else {
        setClick(false);
      }
    }, [wishlist]);

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
  return (
    <div  data-aos="fade-up"  className="border scroll-animation rounded-lg p-4 bg-white shadow-md hover:shadow-lg">
      {/* <Toaster className="shadow-md" /> */}

      <img
        src={data.image[0]}
        alt={data.title}
        onClick={handleImageClick}
        className="w-full h-[225px] object-cover mb-3 rounded"
      />
      <h3 className="text-md font-medium text-rose-600 mb-2">
        {data.title}
      </h3>
      <p className="font-semibold mb-3 flex justify-between items-center">
        <span className="text-[#30425a]">প্রাইস:</span>{" "}
        <span className="text-[#F4511E]">{data.MainCashDiscountPrice?data.MainCashDiscountPrice:data.Mainprice}৳</span>
      </p>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => downloadImage(data.image)}
          className="flex w-full items-center justify-center border-[#F4511E] border text-black px-3 py-1 rounded hover:bg-orange-200"
        >
          <FaDownload className="mr-2" /> ছবি
        </button>
        <button onClick={() =>
            click
              ? handleWishlistRemoveItem(data)
              : handleWishlistAddItem(data)
          } 
          className={`flex w-full text-center justify-center items-center border-[#F4511E]  border  px-3 py-1 rounded hover:bg-orange-200 ${click? 'text-[#F4511E]': 'text-black' }` }
         
          >
        {click ?  <FaMinusCircle className="mr-2" /> :  <FaPlusCircle className="mr-2" />} ফেভারিট 
        </button>
      </div>
    </div>



  );
}
