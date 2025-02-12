import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaFacebook, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function TeamMembers() {

  const {data:teamMembers = []} = useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/team`, { withCredentials: true });
      return response.data.data
  }})

  console.log(teamMembers)
  return (
    <div
      className="w-full grid lg:grid-cols-5 grid-cols-3 gap-3"
    
    >
      {teamMembers.map((item, idx) => (
        <div
          key={idx}
          className="w-full scroll-animation min-h-[200px] shadow-md border relative rounded-md overflow-hidden flex justify-center items-start"
        >
          {/* Image */}
          <img
            src={item.photo}
            alt="team members"
            className="h-full min-w-full object-cover"
          />

          {/* Details */}
          <div className="w-full absolute bottom-0 p-1 bg-[#000000a9] text-center">
            <h2 className="font-semibold text-white text-base">{item.name}</h2>
            <p className="text-white text-sm">{item.role}</p>
            
            {/* Social Links */}
            <div className="flex justify-center items-center gap-3 mt-2">
              {/* Facebook */}
              <Link
                to={item.socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-blue-500"
              >
                <FaFacebook size={14} />
              </Link>

              {/* WhatsApp */}
              <Link
                to={`https://wa.me/${item.socialLinks.whatsapp}?text=Hello%20there!`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-500"
              >
                <FaWhatsapp size={14} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
