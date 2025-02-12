import { useSelector } from "react-redux";
import ProductCard from "./AllProducts/ProductCard";


const FavouriteProducts = () => {
    const { wishlist } = useSelector((state) => state.wishlist);

    console.log(wishlist)
    return (
       
      <div
      className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4 w-full"
    >
      {wishlist && wishlist.length > 0 ? (
        wishlist.map((product, index) => (
          <ProductCard data={product} key={index} />
        ))
      ) : (
        <p className="text-center col-span-4 text-lg font-medium text-gray-600">
          আপনার উইশলিস্টে কোন পণ্য নেই।
        </p>
      )}
    </div>
    
      
    );
};

export default FavouriteProducts;