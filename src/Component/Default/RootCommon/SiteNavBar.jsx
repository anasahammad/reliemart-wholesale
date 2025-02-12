import { NavLink, useNavigate } from "react-router-dom";

import { FaPhone, FaSteam, FaUserCircle } from "react-icons/fa";
import { RiLogoutCircleRLine, RiSecurePaymentLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { VscVerifiedFilled } from "react-icons/vsc";
import about from "/svg/about.svg";
import balance from "/svg/balance.svg";
import tracking from "/svg/tracking.svg";
import contact from "/svg/contact.svg";
import allProducts from "/svg/products.svg";
import pay from "/svg/pay.svg";
import withdraw from "/svg/withdraw.svg";
import report from "/svg/moneyreport.svg";
import customer from "/svg/customer-service-hotel-svgrepo-com.svg";
import email from "/svg/email.png";
import request from "/svg/request-reply-protocol-svgrepo-com.svg";
import review from "/svg/review-svgrepo-com.svg";
import settings from "/svg/settings-svgrepo-com.svg";
import support from "/svg/support-svgrepo-com.svg";
import track from "/svg/tracking-track-svgrepo-com.svg";
import verify from "/svg/verify-svgrepo-com.svg";
import service from "/svg/d.svg";
import profile from "/svg/profile-svgrepo-com.svg";
import favourite from "/svg/favourite.svg";
import { FcLike } from "react-icons/fc";
import dashboard from "/svg/dashboard-svgrepo-com.svg";
import { MdArrowForwardIos, MdOutlineStarPurple500 } from "react-icons/md";

import userProfile from "/svg/userProfile.svg";
import Footer from "../Footer";
import { logout } from "../../../store/actions/userLogout";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdForReseller } from "../../../services/index/users";
const navItems = [
  { name: "হোম", path: "/seller/dashboard", icon: userProfile },
  { name: "রিসেলার ড্যাশবোর্ড", path: "/seller/seller-dashboard", icon: about },
  { name: "অল প্রোডাক্টস", path: "/seller/all-product", icon: allProducts },
  { name: "ফেভারিট প্রোডাক্ট", path: "/seller/favourite-product", icon: favourite },
  { name: "ব্যালেন্স", path: "/seller/balance", icon: balance },
  {
    name: "উত্তোলন",
    path: "/seller/withdraw",
    icon: withdraw,
    children: [
      {
        name: "পেমেন্ট সেটিং",
        path: "/seller/withdraw/payment-setting",
        icon: pay,
      },
      {
        name: "উত্তোলন",
        path: "/seller/withdraw/withdraw",
        icon: withdraw,
      },
      {
        name: "উত্তোলন রিপোর্ট",
        path: "/seller/withdraw/withdraw-report",
        icon: report,
      },
    ],
  },
  { name: "অর্ডার রিপোর্ট", path: "/seller/order-report", icon: tracking },
  { name: "অর্ডার ট্র্যাকিং", path: "/seller/order-traking", icon: track },
  { name: "ইনভয়েস তৈরি", path: "/seller/invoice", icon: pay },
  { name: "কাস্টমার চেকার", path: "/seller/customer-checker", icon: customer },
  { name: "টিম তথ্য", path: "/seller/my-team", icon: userProfile },
  { name: "প্রোডাক্ট রিকোয়েস্টস", path: "/seller/product-request", icon: email },
  { name: "বিক্রেতা রিভিউ", path: "/seller/seller-review", icon: review },
  // { name: "সেটিংস", path: "/seller/settings", icon: settings },
  { name: "সার্ভিস", path: "/seller/service", icon: service },
  { name: "সাপোর্ট", path: "/seller/support", icon: support },
  { name: "আমাদের সম্পর্কে", path: "/seller/about-us", icon: about },
  { name: "যাচাই", path: "/seller/verifection", icon: verify },
];

export default function SiteNavBar({ handleCallNav }) {
  const [openMenu, setOpenMenu] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  const [error, setError] = useState();
  const [accounts, setAccounts] = useState();
  const userState = useSelector((state) => state.user);

  const userInfo =
    userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
  const resellerId = userInfo?.user?._id;
  //console.log(resellerId);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUserByIdForReseller(resellerId);
        //console.log(userData.user);
        setAccounts(userData.user);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, [resellerId]);
  const toggleMenu = (index) => {
    setOpenMenu((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // console.log(accounts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="h-full lg:w-full w-[80%]  bg-white p-4 flex flex-col gap-2">
      <img src="/dashboardlogo.png" className="h-5 w-auto mx-auto"></img>
      <div className="w-full">
        <div className=" flex w-full justify-center items-start gap-2">
          <img
            src={ accounts?.logo?accounts?.logo:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5gv6VVdtAGLqBK9MXIBOUGJ-hWeVdiiN-3Q&s"
            }
            alt="Relifemart"
            className="mx-auto min-w-[70px] max-w-[51px] rounded-full min-h-[70px] max-h-[51px]"
          />
          <div className="w-full flex flex-col ">
            <h3 className=" font-semibold leading-[-8px] flex justify-start text-lg items-center gap-2 text-[#F4511E]">
              {accounts?.name || "N/A"}
              {/* {accounts?.isVerified === true? <VscVerifiedFilled className="text-blue-600 text-xl" />:""}      */}
            </h3>
            <small className="text-xs font-medium flex justify-start items-center gap-1 leading-[-12px] text-gray-600">
              <FaPhone className="text-xs text-blue-600"></FaPhone>{" "}
              {accounts?.phone || "N/A"}
            </small>{" "}
            <small className="text-xs font-medium leading-[-12px] text-gray-800">
              ID : {accounts?.referralCode || "N/A"}
            </small>
          </div>
        </div>
        <div className="w-full flex justify-center gap-3 items-center">
          <div className="flex flex-col justify-center items-center">
            <small className="bg-gray-100 text- font-semibold block px-2 rounded text-gray-600">
              Top Rated
            </small>
            <small className="flex justify-center items-center">
              <MdOutlineStarPurple500 className="text-amber-500" />
              <MdOutlineStarPurple500 className="text-amber-500" />
              <MdOutlineStarPurple500 className="text-amber-500" />
            </small>
          </div>
          <small className=" px-2 rounded -whitextte flex justify-center items-center flex-col">
            Total Earned :{" "}
            <span className="font-bold text-green-600">{accounts?.totalEarn} tk</span>
          </small>
        </div>
         <div className={`w-full flex justify-center items-center gap-2 text-xs font-semibold text-white p-1 rounded-md px-3 ${accounts?.isVerified ?  "bg-green-500" : "bg-red-500"}`}>
          {accounts?.isVerified === true ? "অ্যাক্টিভ মেম্বার" : "ইনঅ্যাক্টিভ মেম্বার"}
        </div>   
      </div>
      <div className="w-full dashboard h-[calc(100vh-230px)] text-sm scroll-none overflow-y-scroll">
        {navItems.map((item, index) => (
          <div key={index} className="w-full">
            {item.children ? (
              <div
                className={`w-full gap-2 rounded-md py-[3px] px-3 my-1 cursor-pointer ${
                  openMenu[index] ? "bg-[#30425a] text-white" : "text-[#30425a]"
                }`}
                onClick={() => toggleMenu(index)}
              >
                <div className="w-full flex justify-between items-center">
                  <button
                    // to={item.path}

                    className="flex gap-3  items-center"
                  >
                    <img src={item.icon} className="w-5 h-5"></img>
                    {item.name}
                  </button>
                  <MdArrowForwardIos
                    className={`transition-transform ${
                      openMenu[index] ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {openMenu[index] && (
                  <div className="w-full flex flex-col gap-1 mt-2">
                    {item.children.map((child, idx) => (
                      <NavLink
                        key={idx}
                        to={child.path}
                        onClick={() => handleCallNav(false)}
                        className={({ isActive }) =>
                          `w-full flex items-center gap-2 p-1 rounded-md px-3 ${
                            isActive
                              ? "bg-white !text-[#27374D]"
                              : "hover:!text-[#27374D] text-gray-200 hover:bg-[#DDE6ED]"
                          }`
                        }
                        style={{ color: openMenu[index] ? "white" : "" }}
                      >
                        <img src={child.icon} className="w-5 h-5"></img>
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to={item.path}
                onClick={() => handleCallNav(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-2 py-[5px] rounded-md px-3 ${
                    isActive
                      ? "bg-[#687c96] text-white"
                      : "   text-slate-800 hover:bg-[#DDE6ED]"
                  }`
                }
              >
                <img src={item.icon} className="w-6 h-6"></img>

                {item.name}
              </NavLink>
            )}
          </div>
        ))}
      </div>
      <div className="w-full h-[40px] flex justify-center items-center">
        <button
          onClick={logoutHandler}
          className="w-full px-3 p-1 bg-slate-300 text-[#F4511E] rounded-md flex border justify-between items-center"
        >
          <div className="flex justify-start items-center gap-2">
            <FaUserCircle className="text-2xl" />
            <h2 className="font-semibold">লগ আউট </h2>
          </div>
          <RiLogoutCircleRLine />
        </button>
      </div>
    </div>
  );
}
