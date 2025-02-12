import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AiFillStar,
  AiOutlineHeart,
  AiOutlineStar,
} from "react-icons/ai";
import { FaCartPlus, FaShoppingBag, FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import ProductDetailsCart from "./ProductDetailsCart";
import { addToWishlist } from "../../store/WishlistAction";
import { addTocart } from "../../store/CartAction";



const Rating = ({ rating, totalReviews }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center mt-2">
      {Array(fullStars)
        .fill(null)
        .map((_, idx) => (
          <AiFillStar key={idx} size={16} color="#f6Ba00" />
        ))}
      {halfStar && <AiFillStar size={16} color="#f6Ba00" style={{ clipPath: "inset(0 50% 0 0)" }} />}
      {Array(emptyStars)
        .fill(null)
        .map((_, idx) => (
          <AiOutlineStar key={idx} size={16} color="#f6Ba00" />
        ))}
      <span className="ml-2 text-xs text-gray-600">({totalReviews})</span>
    </div>
  );
};


const Product = ({ data }) => {
  const handleBuyNow = () => {
    navigate('/checkout', { state: { product: [data] } });
  };
  
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);



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
    toast.error("Item removed from wishlist");
  };

  const handleWishlistAddItem = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
    toast.success("Item added to wishlist");
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
//  console.log(data)


const mainPrice = data.Mainprice;
const discountPrice = data.MainCashDiscountPrice;

const discountPercentage = mainPrice && discountPrice ? Math.round(((mainPrice - discountPrice) / mainPrice) * 100) : 0;
 
const randomRating = (Math.random() * 1.5 + 3.5).toFixed(1);
const totalReviews = Math.floor(Math.random() * 50) + 1;

return (
    <div className="group relative flex flex-col bg-white border shadow hover:shadow-lg transition duration-300 max-w-xs">
      {/* Product Image */}
      <Link to={`/product/${data._id}`} >
      <div className="relative overflow-hidden">
     <img
        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
       loading="lazy"
        src={data?.image?.[0]} // এখানে সমস্যা থাকতে পারে
        alt="product"
      />

{data.collection  && (
      <span className="absolute top-2 left-2 bg-white/30 shadow-lg backdrop-blur-sm text-[#e43636] text-[13px]  font-semibold px-1 py-[1px] rounded">
        {data?.collection}
      </span>
    )}
        <button
          onClick={() =>
            click
              ? handleWishlistRemoveItem(data)
              : handleWishlistAddItem(data)
          }
          className={`absolute top-[10px] right-2 text- p-2 rounded-full ${
            click ? "bg-red-600 text-white" : "bg-white text-orane-500"
          }`}
        >
          <AiOutlineHeart />
        </button>
      </div>
      </Link>

      {/* Product Details */}
      <div className="px-2 pt-1 pb-2">
        <h3
          className="text-base font-semibold text-gray-900 truncate cursor-pointer hover:underline"
          onClick={() => setOpen(!open)}
        >
          {data.name}
        </h3>
        <div className="flex justify-start items-center mt-1 gap-1">
          <span className="text-lg font-bold text-gray-900"><strong>৳</strong>
          {data.MainCashDiscountPrice?data.MainCashDiscountPrice:data.Mainprice}</span>
          <span className="text-sm text-gray-500 line-through">
          {data?.Mainprice?data?.Mainprice:""}  
         
          </span> 
            <span className=" text-green-500 text-xs font-semibold px-1 py-1 rounded">
        {discountPercentage}% 
      </span>
        </div>

        {/* Rating */}
        <div className="flex justify-start items-center gap-1 text-xs mt-3 ">
           
            <p className="font-semibold">{randomRating}</p> <FaStar className="text-yellow-500"></FaStar> <p className="font-medium text-gray-700">({totalReviews})</p>
        </div>
     

       {/* Buttons */}
       <div className="mt-1 flex gap-1 w-full h-8">

       <div   onClick={handleBuyNow}
              className="w-9/12 flex items-center justify-center gap-2 border border-orange-500 text-gradient text-sm font-medium py-2 rounded shadow-md transition transform hover:border-orange-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 cursor-pointer"
            >
              <FaShoppingBag size={16} className="text-[#F85E39]"/>
              <span>Buy Now</span>
            </div>

            <div
              onClick={() => handleAddToCart(data?._id)}
              className="w-3/12 flex items-center justify-center gap-2 background-gradient text-white text-sm font-medium py-2 rounded shadow-md transition transform hover:bg-orange-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 cursor-pointer"
            >
              <FaCartPlus size={16} />
            </div>
            
          </div>
      </div>

      {/* Product Details Modal */}
      {open && <ProductDetailsCart setOpen={setOpen} data={data} />}
    </div>
  );
};

export default Product;
