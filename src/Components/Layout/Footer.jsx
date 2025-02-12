// import React from 'react';
// import {
//   AiOutlineTwitter,
//   AiFillGithub,
//   AiFillInstagram,
//   AiFillFacebook,
// } from "react-icons/ai";
// import { FaHeart } from "react-icons/fa";
// import {
//   footerProductLinks,
//   footerSupportLinks,
//   footercompanyLinks,
// } from "../../Static/data";
// import { Link } from "react-router-dom";

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-b from-orange-50 to-orange-100 text-gray-800">
//       {/* Subscribe Section */}
//       <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white py-12 md:flex md:justify-between md:items-center md:px-12 px-4">
//         <h1 className="text-3xl flex gap-3 lg:text-4xl md:mb-0 leading-snug font-bold mb-6 text-center md:text-left">
//           Subscribe to get news, events & offers
//         </h1>
  
//         <div className="flex items-center relative">
//           <input
//             type="email"
//             name="email"
//             id="email"
//             required
//             placeholder="Enter your email"
//             className="w-full sm:w-96 py-3 px-4 rounded-l-md focus:outline-none text-gray-800"
//           />
//           <button
//             type="submit"
//             className="bg-gray-800 text-white py-3 px-6 rounded-r-md right-0 transform hover:bg-gray-700 transition duration-300 ease-in-out">
//             Submit
//           </button>
//         </div>
//       </div>
  
//       {/* Footer Links */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 sm:px-8 px-5 py-16">
//         {/* About Section */}
//         <div className="text-center sm:text-start">
//           <h2 className="text-3xl font-bold text-orange-600 mb-4">Relifemart</h2>
//           <p className="mt-4 text-gray-600">
//           Are you looking for the perfect one? – You will find it here.
//           </p>
//           <div className="flex justify-center sm:justify-start mt-6 space-x-4 text-orange-500">
//             <a href="https://www.facebook.com/relifemart" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-orange-600 transition-colors duration-300">
//               <AiFillFacebook size={28} className="cursor-pointer" />
//             </a>
//             <a href="https://www.facebook.com/relifemart" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange-600 transition-colors duration-300">
//               <AiFillInstagram size={28} className="cursor-pointer" />
//             </a>
//             <a href="https://www.facebook.com/relifemart" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-orange-600 transition-colors duration-300">
//               <AiOutlineTwitter size={28} className="cursor-pointer" />
//             </a>
          
//           </div>
//         </div>
  
//         {/* Company Links */}
//         <div className="text-center sm:text-start">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Company</h3>
//           <ul>
//             {footercompanyLinks?.map((link) => (
//               <li key={link.name} className="mb-2">
//                 <Link
//                   to={link.link}
//                   className="text-gray-600 hover:text-orange-500 duration-300 text-sm">
//                   {link.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
  
//         {/* Shop Links */}
//         <div className="text-center sm:text-start">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Shop</h3>
//           <ul>
//             {footerProductLinks?.map((link) => (
//               <li key={link.name} className="mb-2">
//                 <Link
//                   to={link.link}
//                   className="text-gray-600 hover:text-orange-500 duration-300 text-sm">
//                   {link.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
  
//         {/* Support Links */}
//         <div className="text-center sm:text-start">
//           <h3 className="text-xl font-semibold text-gray-800 mb-4">Support</h3>
//           <ul>
//             {footerSupportLinks?.map((link) => (
//               <li key={link.name} className="mb-2">
//                 <Link
//                   to={link.link}
//                   className="text-gray-600 hover:text-orange-500 duration-300 text-sm">
//                   {link.name}
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
  
//       {/* Footer Bottom */}
//       <div className="border-t border-gray-300 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col sm:flex-row justify-between items-center">
//           <div className="mb-4 sm:mb-0 text-center sm:text-left">
//             <p className="text-sm text-gray-600">
//               &copy; {new Date().getFullYear()} Relifemart. All rights reserved.
//             </p>
//             <p className="text-sm text-gray-600 mt-1">
//               <Link to="/terms-and-conditions" className="hover:text-orange-500 transition-colors duration-300">Terms</Link>
//               <span className="mx-2">•</span>
//               <Link to="/privacy" className="hover:text-orange-500 transition-colors duration-300">Privacy Policy</Link>
//             </p>
//           </div>
//           <div className="flex flex-col items-center sm:items-end">
            
//             <p className="text-sm text-gray-600 flex items-center">
//               Developed  <FaHeart className="text-red-500 mx-1" /> by 
//               <a href="https://auroraxia.com" target="_blank" rel="noopener noreferrer" className="ml-1 font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-300">
//                 Auroraxia
//               </a>
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import { Facebook, Instagram, Youtube } from "lucide-react"
import { FaHeart } from "react-icons/fa"
import { Link } from "react-router-dom"

import logo from '/logo.png'
export default function Footer() {
  return (
    <footer className="bg-[#FFF3E4] text-gray-800  py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Social Section */}
        <div className="space-y-6">
          <img
            src={logo}
            alt="Reliefmart Logo"
            className="h-20 w-auto"
          />

          <h2 className="text-4xl font-medium">Relifemart</h2>
          <div>
            <h3 className="font-semibold mb-4">FOLLOW US</h3>
            <div className="flex space-x-4">
              <Link to="https://www.facebook.com/relifemart" className="hover:text-green-500">
                <Facebook className="w-6 h-6" />
              </Link>
              <Link to="https://www.x.com/relifemart" className="hover:text-green-500">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link to="https://www.instragram.com/relifemart" className="hover:text-green-500">
                <Instagram className="w-6 h-6" />
              </Link>
              <Link to="https://www.youtube.com/relifemart" className="hover:text-green-500">
                <Youtube className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Company Section */}
        <div>
          <h3 className="font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/about-us" className="hover:text-green-500">
                About
              </Link>
            </li>
            
            <li>
              <a href="#" className="hover:text-green-500">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500">
                Vendor
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-green-500">
                Dropshipper
              </a>
            </li>
          </ul>
        </div>

        {/* Policy Section */}
        <div>
          <h3 className="font-semibold mb-4">POLICY</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/privacy" className="hover:text-green-500">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-and-conditions" className="hover:text-green-500">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/return-policy" className="hover:text-green-500">
                Refund Policy
              </Link>
            </li>
            
          </ul>
        </div>

        {/* Help Center Section */}
        <div>
          <h3 className="font-semibold mb-4">HELP CENTER</h3>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Contact Us</p>
            </div>
            <div>
              <p className="font-semibold">Address:</p>
              <p className="">
                House#06, Level#03 Road-20, Sector#10
                <br />
                Housebuilding, Uttara
                <br />
                Dhaka-1230
              </p>
            </div>
            <div>
              <p className="font-semibold">Phone:</p>
              <p className="">+8801648177071</p>
            </div>
            <div>
              <p className="font-semibold">Email:</p>
              <p className="">reliefmartbd@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-300 py-8 px-4 sm:px-6 lg:px-12 mt-6">
         <div className="flex flex-col sm:flex-row justify-between items-center">
           <div className="mb-4 sm:mb-0 text-center sm:text-left">
             <p className="text-sm text-gray-600">
               &copy; {new Date().getFullYear()} Relifemart. All rights reserved.
             </p>
             
           </div>
           <div className="flex flex-col items-center sm:items-end">
            
             <p className="text-sm text-gray-600 flex items-center">
               Developed  <FaHeart className="text-red-500 mx-1" /> by 
               <a href="https://auroraxia.com" target="_blank" rel="noopener noreferrer" className="ml-1 font-semibold text-orange-600 hover:text-orange-700 transition-colors duration-300">
                 Auroraxia
               </a>
            </p>
           </div>
         </div>
       </div>
    </footer>
  )
}

