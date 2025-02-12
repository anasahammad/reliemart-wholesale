

import { useState, useEffect } from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const CustomNextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer z-50 bg-black bg-opacity-50 text-white py-2 px-4 rounded-full"
  >
    &#x276F;
  </div>
)

const CustomPrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer z-50 bg-black bg-opacity-50 text-white py-2 px-4 rounded-full"
  >
    &#x276E;
  </div>
)

const Hero = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const { data: banners = [] } = useQuery({
    queryKey: ["banners"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/bannerPhoto`, { withCredentials: true })
      return response.data
    },
  })

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    ...(banners.length === 1 && {
      dots: false,
      arrows: false,
      autoplay: false,
      infinite: false,
    }),
  }

  if (!mounted) return null

  return (
    <section className="mt-3 md:mt-16 w-full mx-auto overflow-hidden">
      <div className="px-4 md:px-12">
        <Slider {...settings} className="rounded-lg shadow-md relative">
          {banners.map((banner) => (
            <div key={banner._id} className="relative aspect-[16/9] w-full">
              <img
                src={banner.bannerPhoto || "/placeholder.svg"}
                loading="lazy"
                alt="banner"
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  )
}

export default Hero

