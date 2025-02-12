import { TbCategory } from "react-icons/tb";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios"
export default function ProductGrid() {
  const parems = useParams();

  const {data = [] , isLoading} = useQuery({
    queryKey: "products",
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
     
      return response.data.data;
    },
  })


  


  return (
    <div>
      <div className="w-full p-2 gap-4 flex justify-between items-center mb-3 bg-white rounded-md shadow-md">
        <div className="flex justify-start items-center gap-2">
          <TbCategory /> 
        </div>
        <input
          type="search"
          placeholder="Search here"
          className="w-[370px] text-[#F4511E] hidden md:block outline-0 p-1 px-3 text-left border rounded-md"
        />
      </div>
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "repeat( auto-fit, minmax(225px, 1fr) )",
        }}
      >
         {data &&
            data.map((product, index) => (
          <ProductCard data={product} key={index}  />
        ))}
      </div>
    </div>
  );
}
