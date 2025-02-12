import TeamMembers from "../AboutUs/TeamMembers";
import SupportBanner from "./SupportBanner";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
export default function Support() {
  return (
    <div >
      <SupportBanner />
      <div data-aos="fade-down" className="min-h-screen bg-gray-100 ">
        {/* Contact Methods */}
        <div className="flex flex-col md:flex-row gap-3 justify-between items-start mb-8">
          {/* Contact List */}
          <div className="w-full md:w-1/3 bg-white shadow p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4"> আমাদের সামাজিক সাইট  </h2>
            <ul className="space-y-4">
              <li>
                <a
                  href="https://www.facebook.com/relifemart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <FaFacebook className="text-xl" />
                  <span className="font-medium">Facebook Page</span>
                </a>
              </li>
              <li>
                <a
                  href="https://m.me/t/103166805815422"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#27374D] hover:underline"
                >
                  <FaFacebookMessenger className="text-xl" />
                  <span className="font-medium">Messenger</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/+8801322119001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-600 hover:underline"
                >
                  <FaWhatsapp className="text-xl" />
                  <span className="font-medium">WhatsApp</span>
                </a>
              </li>
              <li>
                <p className="flex items-center gap-2 text-[#30425a]">
                  <FaPhoneAlt className="text-xl" />
                  <span className="font-medium">Phone:</span> +8801322119001
                </p>
              </li>
              <li>
                <p className="flex items-center gap-2 text-[#30425a]">
                  <FaEnvelope className="text-xl" />
                  <span className="font-medium">Email:</span>{" "}
                  support@example.com
                </p>
              </li>
            </ul>
          </div>

          {/* Contact Form */}
          <div className="w-full md:w-2/3 bg-white shadow p-6 rounded-md">
            <h2 className="text-2xl font-bold mb-4">আমাদের মেসেজ   করুন</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-[#30425a] font-medium mb-2"
                >
              আপনার ই-মেইল
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-2 border    rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="আপনার ফোন নাম্বার"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="block text-[#30425a] font-medium mb-2"
                >
               আপনার ফোন নাম্বার
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full p-2 border    rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="আপনার ফোন নাম্বার"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-[#30425a] font-medium mb-2"
                >
              বার্তা
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full p-2 border   rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="বার্তা লিখুন"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#F4511E] text-white py-2 rounded-md hover:bg-blue-700"
              >
               মেসেজ পাঠান
              </button>
            </form>
          </div>
        </div>
      </div>

      <TeamMembers />
    </div>
  );
}
