
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Product from "../../Components/Layout/Product";
import Header from "../../Components/Layout/Header";

const HasOffers = () => {
  const {data:data , isLoading} = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const response = await axios.get(`https://reseller-backend-zeta.vercel.app/api/v4/products`);
   
      return response.data.data;
    },
  })

  const hasOffers = data?.filter((item) => item.hasOffer === true);
  console.log(data)
  return (
  <div>

    <Header activeHeading={1} />
    <br />
      <div className={`mt-12 w-[95%] mx-auto`}>
      
      <div className={``}>
        <h1 className="lg:text-2xl text-xl font-bold text-gray-900 font-[Delius]"  data-aos="fade-right">Best Offers</h1>
      </div>

      <div className="grid grid-cols-2 gap-[12px] md:grid-cols-3 md:gap-[18px] lg:grid-cols-5 lg:gap-[25px] xl:grid-cols-5 xl:gap-[20px] mb-12 border-0">
        {data &&
          hasOffers?.map((data, index) => <Product data={data} key={index} />)}
      </div>
    </div>
  </div>
  );
};

export default HasOffers;
