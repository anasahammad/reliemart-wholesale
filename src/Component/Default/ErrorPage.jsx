import { useEffect, useState } from "react";
import { MdWifiTetheringError } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const [countdown, setCountdown] = useState(0);

  // Set the target date to 5th November 2024, 10:00 PM in Bangladesh time
  const targetDate = new Date('2024-11-05T22:00:00+06:00'); 

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const timeDifference = targetDate - now;
      
      if (timeDifference <= 0) {
        clearInterval(timer);
        setCountdown(0);
      } else {
        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-[#FFECFB] to-[#FEF9C3] text-white">
       <div className="text-center p-10 rounded-xl shadow-2xl bg-white bg-opacity-95 max-w-md">
      <div className="flex justify-center mb-6">
        <MdWifiTetheringError className="text-8xl text-[#16A34A]" />
      </div>
      <h1 className="text-4xl font-bold text-green-600 mb-4">
        দুঃখিত! আমরা কিছু নতুন আপডেট নিয়ে আসছি।
      </h1>
    

      <Link
        to={"/"}
        className="bg-[#16A34A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
      >
        হোম পেজে ফিরে যান
      </Link>
    </div>
    </div>
  );
}
