import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const DashboardTopSlider = () => {


  const {data:slides = []} = useQuery({
    queryKey: ["slides"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/resellerBanner`, { withCredentials: true });
      return response.data;
    }
  })
  
  return (
    <div className="relative w-full  lg:-mt-5 p-2 scroll-animation shadow-md rounded-md h-[150px] sm:h-[250px] ">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-full -z-[50]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide._id} className="w-full h-full">
            <div className="w-full h-full">
              <img
                src={slide.bannerPhoto}
                alt={`Slide ${slide._id}`}
                className="w-full md:h-[400px]  object-cover object-center"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

     
    </div>
  );
};

export default DashboardTopSlider;
