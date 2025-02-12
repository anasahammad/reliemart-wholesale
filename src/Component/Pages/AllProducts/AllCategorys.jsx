import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function AllCategorys() {
  const navigate = useNavigate();

  const {data:categoriesData , isLoading} = useQuery({
    queryKey: "categoriesData",
    queryFn: async () => {
      const response = await axios.get(`https://reseller-backend-zeta.vercel.app/api/v4/category`);
    
      return response.data;
    },
  })


  if (categoriesData?.length === 0) {
    return (
      <div className="w-full text-center mt-10">
        <p className=" text-gray-700">No categories available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-3 px-3 py-6">
      {/* Navigation Buttons */}
      <div className="w-full bg-white p-2 rounded-md shadow-md  flex justify-between items-center">
        <button
          onClick={() => navigate(`/dashboard`)}
          className="px-4 py-1 rounded-md  bg-[#27374D  text-orange-600 font-semibold hover:bg-[#27374D]"
          aria-label="Go to Dashboard"
        >
          প্রোডাক্টস ক্যাটেগরি
        </button>

        <button
          onClick={() => navigate(`/seller/category/allproduct`)}
          className="px-4 py-1 rounded-md bg-[#F4511E] text-white font-semibold  "
          aria-label="View All Products"
        >
       সব পণ্য
        </button>
      </div>

      {/* Categories Grid */}
      <div   data-aos="fade-in-up" className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
      {categoriesData &&
        categoriesData.map((data ,index) => {

          return(
          <div
            key={index}
            onClick={() =>
              navigate(
                // `/category/${item.name.replace(/\s+/g, "-").toLowerCase()}`
                "/seller/category/allproduct"
              )
            }
            className="w-full scroll-animation cursor-pointer p-3 flex  gap-2 justify-start items-center overflow-hidden rounded-md  bg-orange-100  shadow-md hover:shadow-lg hover:scale-105 transition-transform"
          >
            <img
              src={data.photo}
              alt={data.name}
              className="w-14 h-14 rounded-md object-cover"
            />
            <span className="text-center font-medium text-slate-800">
            {data.name}
            </span>
          </div>
         )  })}
      </div>
    </div>
  );
}
