


import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import Product from "../Components/Layout/Product";
import Header from "../Components/Layout/Header";

const CategoriesProductPage = () => {
    const {categoryName} = useParams()
  const {data:data , isLoading} = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryName}`);
        console.log(response)
      return response.data.products;
    }
  })


  console.log(data)
  return (
    <div>

        <Header/>
        <br />
        <br />
        <div className={`mt-7 w-[95%] mx-auto`}>
      <div className={``}>
        <h1 className="lg:text-2xl text-xl font-bold text-gray-900 font-[Delius]"  data-aos="fade-right">{categoryName} Products</h1>
      </div>

      <div className="grid grid-cols-2 gap-[12px] md:grid-cols-3 md:gap-[18px] lg:grid-cols-5 lg:gap-[25px] xl:grid-cols-5 xl:gap-[20px] mb-12 border-0">
        {data &&
          data?.map((item, index) => <Product data={item} key={index} />)}
      </div>
    </div>
    </div>
  );
};

export default CategoriesProductPage;
