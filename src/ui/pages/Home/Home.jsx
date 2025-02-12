
import { FaFacebook } from "react-icons/fa";
import DollarExpress from "../../../Component/DollarExpress";
import DollarExpress2 from "../../../Component/DollerExpress2";
import BannerBottom from "../../../Components/Layout/BannerBottom";
import BestDeals from "../../../Components/Layout/BestDeals";
import Categories from "../../../Components/Layout/Categories";
import Sale from "../../../Components/Layout/Events";
import FeaturedProduct from "../../../Components/Layout/FeaturedProduct";
import Footer from "../../../Components/Layout/Footer";
import Header from "../../../Components/Layout/Header";
import Hero from "../../../Components/Layout/Hero";
import { motion } from "framer-motion";

const Home = () => {
  
  return (
    <div className="">
         <Header activeHeading={1} />
       <div
      >
      <div className="lg:mt-0 mt-0">
      <Hero />
      </div>
      <BannerBottom />
       <DollarExpress/>
        <Categories />
        <BestDeals />
       

        <DollarExpress2/> 
        <Sale/>
        <FeaturedProduct />
        {/* <Sponsored />*/}
      
      </div>
    
      
      <Footer />
    </div>
  );
};

export default Home;
