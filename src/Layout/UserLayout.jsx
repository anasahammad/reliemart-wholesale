import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../store/actions/userLogout";
import { useSelector ,useDispatch } from "react-redux";
import { motion } from 'framer-motion';
import logo from "/logomain2.png"
import { FaBars, FaBell, FaHome, FaRegFolderOpen, FaRegUser, FaTimes } from 'react-icons/fa';
import { RxDashboard } from "react-icons/rx";
import { CiShop } from "react-icons/ci";
import { GoHome, GoProject } from 'react-icons/go';
import { GrLogout, GrNotes, GrShop, GrWorkshop } from "react-icons/gr";
import { TbLayoutDashboard, TbMessageChatbot, TbProgressAlert } from "react-icons/tb";
import { TiMessages } from "react-icons/ti";
import { AiOutlineSolution } from "react-icons/ai";
import { GiMoneyStack } from "react-icons/gi";
import { IoChatbubbles } from "react-icons/io5";
import axios from "axios";
import { FaCircleUser, FaFileCirclePlus } from "react-icons/fa6";
import { MdOutlineShoppingBag, MdRequestPage } from "react-icons/md";
import BellIcon from "../userDashboardPages/BellIconNotification";
import { BiSolidOffer } from "react-icons/bi";
import { PiCreditCardBold } from "react-icons/pi";
import { TfiNotepad } from "react-icons/tfi";
import { BsFilePost } from "react-icons/bs";
import { LuMonitorPause } from "react-icons/lu";

const UserLayout = () => {

  const router = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userState = useSelector((state) => state.user);
  const userId = userState?.userInfo?.data?.user?._id;
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isManual, setIsManual] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [error, setError] = useState()
  const location = useLocation()
  const [activeLink, setActiveLink] = useState("");

  const [showLine, setShowLine] = useState(false);
  const [width, setWidth] = useState(0); 

  useEffect(() => {
    setWidth(0); // Reset width to 0 on every route change
    setShowLine(true); // Start the line animation
    
    const widthTimer = setInterval(() => {
      setWidth((prevWidth) => {
        if (prevWidth >= 100) {
          clearInterval(widthTimer);
          setTimeout(() => setShowLine(false), 100); // Hide line after animation completes
          return 100;
        }
        return prevWidth + 1;
      });
    }, 10); // Update every 10ms for a smooth animation

    // Clean up interval timer
    return () => clearInterval(widthTimer);
  }, [location.pathname]); 
  // Ensure hooks are not conditionally used
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (userState?.userInfo?.data?.user) {
          setIsAdmin(true);
        } else {
          navigate("/");
          toast.error("You are not allowed to access the admin panel.");
        }
      } catch (error) {
        console.error(error);
        navigate("/");
        toast.error("Failed to check admin status.");
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [userState, navigate]);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://new.kajghor.com/api/v1/user/${userId}`);
        setUser(response.data.data); // Adjust this if the structure is different
      } catch (error) {
        setError(error.response?.data?.message || 'Error fetching user data');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleMouseEnter = () => {
    setIsHovered(true);
};

const handleMouseLeave = () => {
    if (!isManual) {
        setIsHovered(false);
    }
};

const toggleHover = () => {
    setIsManual(prev => !prev);
    if (!isManual) {
        setIsHovered(true);
    } else {
        setIsHovered(false);
    }
};

const toggleMobileSidebar = () => {
    setIsMobileOpen(prev => !prev);
};

const handleLinkClick = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check the screen size initially

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-[#14161A]">
        <h3 className="text-2xl text-slate-700">Loading...</h3>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }
// console.log(user)


const handleClick = (link) => {
  setActiveLink(link);
};
  return (
    <div className="relative">
   <div style={{ padding: '20px', textAlign: 'center' }} >
      {showLine && (
        <div
          className="Lline"
          style={{
            width: `${width}%`, // Bind the width state to the line
          }}
        ></div>
      )}</div>
<div className="flex relative">
            {/* Sidebar for small devices */}
            <motion.div
                className={`bg-[#1D1F25]   hidden lg:block fixed top-0 left-0 z-50 lg:z-[100] ${isMobileOpen ? '' : 'hidden'} `}
                animate={{ 
                    width: isHovered || isManual  ? '20%' : '64px' 
                }}
                transition={{ duration: 0.5 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
              
           

                    <li className={`flex justify-between mt-2 gap-5 sticky top-0  cursor-pointer ${isHovered ? "pl-4 transition duration-300" : "pl-0"} rounded-md py-3 items-center gap-1 `}>
                    <img src={logo} className='w-7 ml-5'></img>
                    <div onClick={toggleHover} className={`flex justify-center items-center group  ${isHovered ? "block" : "hidden"}`}>
                        <div  className={`w-5 h-5 mr-3 flex justify-center items-center border border-[#B6B7B9] hover:border-white rounded-[100%]`}>

                            <div className={`${isManual === true ?"bg-[#B6B7B9]":""} w-2 h-2  rounded-[100%]`}></div>
                        </div>
                    </div>
                    </li>
                    <ul className={`${isHovered ? "overflow-y-scroll":""} text-white p-2 pt-2 h-screen  relative overflow-hidden px-2 `}>
                    {/* <li >
                      <Link to="/user/custom-order" className={`flex border border-dashed border-[#07B681] justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300 py-2 mx-5":"pl-0 py-3"} rounded-md  items-center gap-1 ${location.pathname === '/user/custom-order' ? 'bg-[#193C36] text-[#01DB98]' : ''} ${isManual?"":""}`} >
                      <FaFileCirclePlus className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                       
                        <p  className={`${isHovered ? "block" : "hidden"}`}>Custom Order</p>
                        </Link>
                    </li> */}


                    <li >
                      <Link to="/user" className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1 ${location.pathname === '/user' ? 'bg-[#193C36] text-[#01DB98]' : ''} ${isManual?"":""}`} >
                        <RxDashboard className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p  className={`${isHovered ? "block" : "hidden"}`}>Dashboard</p>
                        </Link>
                    </li>

                   
                  
                    <li >
                    <Link to="/user/my-order" className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1 ${location.pathname === '/user/my-order' ? 'bg-[#193C36] text-[#01DB98]' : ''} ${isManual?"":""}`} >
                    <GrShop  className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p className={`${isHovered ? "block" : "hidden"}`}>My Order</p>
                        </Link>
                    </li>
                    <li >
                    <Link to="/user/service" className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300 ":"pl-0"} rounded-md py-3 items-center gap-1 ${location.pathname === '/user/service' ? 'bg-[#193C36] text-[#01DB98]' : ''} ${isManual?"":""}`} >

                      <CiShop  className={`${isHovered ? "text-xl":"text-[22px]"} ml-[14px]`} />
                      <p  className={`${isHovered ? "block" : "hidden"}`}>Services </p>
                    </Link>
                       
                    </li> 
<div className="w-[85%] mx-auto h-[1px] mb-3 bg-slate-800"></div>
                  
                    <li >
                    <Link to="/user/subscription" className={`flex justify-start  gap-5  hover:bg-[#34363B]   cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1 ${location.pathname === '/user/subscription' ? 'bg-[#193C36] text-[#01DB98]' : ''} ${isManual?"":""}`} >
                        <GrWorkshop className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p  className={`${isHovered ? "block" : "hidden"}`}>Subscription</p>
                        </Link>
                    </li>
                 
                    <li  >
                    <Link to="/user/coming-soon" className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1  ${isManual?"":""}`} >
                        <BiSolidOffer className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p  className={`${isHovered ? "block" : "hidden"}`}>Offer Box</p>
                        </Link>
                    </li>

                    <li >
                    <Link to="/user/wallet" className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1 ${location.pathname === '/user/wallet' ? 'bg-[#193C36] text-[#01DB98]' : ''} ${isManual?"":""}`} >
                        <PiCreditCardBold  className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p className={`${isHovered ? "block" : "hidden"}`}>Wallet</p>
                        </Link>
                    </li>

                    
                    {/* <li >
                    <Link to="/user/deposit" className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1 ${location.pathname === '/user/deposit' ? 'bg-[#193C36] text-[#01DB98]' : ''} ${isManual?"":""}`} >
                        <GiMoneyStack  className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p className={`${isHovered ? "block" : "hidden"}`}>Deposit History</p>
                        </Link>
                    </li> */}
                    <div className="w-[85%] mx-auto h-[1px] mb-3 bg-slate-800"></div>
                      <li >
                    <Link to="/user/notes" className={`flex justify-start mb-1 gap-5 hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300 ":"pl-0"} rounded-md py-3 items-center gap-1 ${location.pathname === '/user/notes' ? 'bg-[#193C36] text-[#01DB98]' : ''} ${isManual?"":""}`} >

                      <TfiNotepad  className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                      <p  className={`${isHovered ? "block" : "hidden"}`}>Notes</p>
                    </Link>
                       
                    </li> 
                   <li  >
                    <Link to="/user/coming-soon" className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1  ${isManual?"":""}`} >
                        <BsFilePost className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p  className={`${isHovered ? "block" : "hidden"}`}>Kaj Ghor Post</p>
                        </Link>
                    </li>
                 
                    <li  >
                    <Link to="/user/benefits" className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1  ${isManual?"":""}`} >
                        <TbProgressAlert className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p  className={`${isHovered ? "block" : "hidden"}`}>Benefit of Kajghor</p>
                        </Link>
                    </li>
                    <li  >
                    <Link to="/user/how-to-use" className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1  ${isManual?"":""}`} >
                        <LuMonitorPause className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p  className={`${isHovered ? "block" : "hidden"}`}>How to use Kajghor</p>
                        </Link>
                    </li>
                    <li  onClick={logoutHandler}  className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1 ${isManual?"":""}`} >
                        <GrLogout className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p  className={`${isHovered ? "block" : "hidden"}`}>Logout</p>
                    </li>
                    
                    <li className="h-[48px]"></li>
                    <div className="bg-[#1D1F25] w-[99%] pb-4 mx-auto text-white rounded-md sticky bottom-[55px]">
                    <div className={"bg-[#14161A] rounded-md py-1  "}>
                    <Link to="/user/message" className={`flex justify-start mb-2 gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300 ":"pl-0"} rounded-md py-2 items-center gap-1 ${location.pathname === '/user/message' ? ' text-[#01DB98]' : ''} ${isManual?"":""}`} >

                        <TbMessageChatbot  className={`${isHovered ? "text-lg":"text-[22px]"} ml-[14px]`} />
                        <p  className={`${isHovered ? "block" : "hidden"}`}>My Assistant</p>
                        </Link>
                        <Link to="/user/custom-order" className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300 ":"pl-0"} rounded-md py-2 items-center gap-1 ${location.pathname === '/user/custom-order' ? ' text-[#01DB98]' : ''} ${isManual?"":""}`} >

                        <FaFileCirclePlus  className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p  className={`${isHovered ? "block" : "hidden"}`}>Custom Order</p>
                        </Link>
                    </div>
                    </div>
                  
                   </ul>
                  

                    
                 

                    
                  
                
             
              
            </motion.div>




            
            <motion.div
                className={`bg-[#1D1F25] h-screen lg:hidden block fixed top-0 left-0  z-[100] ${isMobileOpen ? '' : 'hidden'} lg:block`}
                animate={{ 
                    width: isMobileOpen ? '70%' : '5%' 
                }}
                transition={{ duration: 0.5 }}
              
            >
                <ul className="text-white p-2 pt-2 h-screen overflow-y-scroll overflow-hidden px-2 ">

                    <li className={`flex justify-between mt-2  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1 `}>
                    <img src={logo} className='w-7 ml-4'></img>
                    <div
                                            className=" text-white p-2  hover:bg-[#34363B]  cursor-pointer   z-50"
                                            onClick={toggleMobileSidebar}
                                        >
                                            <FaTimes size={24} />
                                        </div>
                    </li>
                    <li >
                      <Link to="/user/custom-order"className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }} >
                      <FaFileCirclePlus className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                       
                        <p >Custom Order</p>
                        </Link>
                    </li>
                    <li >
                      <Link to="/user" className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }}>
                        <RxDashboard className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p  >Dashboard</p>
                        </Link>
                    </li>

                   
                    <li >
                    <Link to="/user/message" className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }}>

                      <TbMessageChatbot  className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                      <p >My Assistant</p>
                    </Link>
                       
                    </li> 
                    <li >
                    <Link to="/user/my-order" className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }} >
                    <GrShop  className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p >My Order</p>
                        </Link>
                    </li>
                    <li >
                    <Link to="/user/service" className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }} >

                      <CiShop  className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                      <p >Services </p>
                    </Link>
                       
                    </li> 
{/* <div className="w-[96%] mx-auto h-[1px] mb-3 bg-slate-800"></div> */}
                  
                    <li >
                    <Link to="/user/subscription" className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }}>
                        <GrWorkshop className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p >Subscription</p>
                        </Link>
                    </li>
                 
                    <li  >
                    <Link to="/user/coming-soon" className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }} >
                        <BiSolidOffer className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p >Offer Box</p>
                        </Link>
                    </li>

                    <li >
                    <Link to="/user/wallet" className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }} >
                        <PiCreditCardBold  className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p>Wallet</p>
                        </Link>
                    </li>

                    
                    {/* <li >
                    <Link to="/user/deposit" className={`flex justify-start  gap-5  hover:bg-[#34363B]  cursor-pointer   ${isHovered ? "pl-4 transition duration-300":"pl-0"} rounded-md py-3 items-center gap-1 ${location.pathname === '/user/deposit' ? 'bg-[#193C36] text-[#01DB98]' : ''} ${isManual?"":""}`} >
                        <GiMoneyStack  className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p>Deposit History</p>
                        </Link>
                    </li> */}
                      <li >
                    <Link to="/user/notes" className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }} >

                      <TfiNotepad  className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                      <p >Notes</p>
                    </Link>
                       
                    </li> 
                   <li  >
                    <Link to="/user/coming-soon" className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }} >
                        <BsFilePost className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p >Kaj Ghor Post</p>
                        </Link>
                    </li>
                 
                    <li  >
                    <Link to="/user/benefits" className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }} >
                        <TbProgressAlert className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p >Benefit of Kajghor</p>
                        </Link>
                    </li>
                    <li  >
                    <Link to="/user/how-to-use" className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`} onClick={() => {
                        toggleMobileSidebar();
                        }} >
                        <LuMonitorPause className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p >How to use Kajghor</p>
                        </Link>
                    </li>

                    <li  onClick={logoutHandler}  className={`flex justify-start mt-4  gap-5  hover:bg-[#34363B]  cursor-pointer    rounded-md py-3 items-center gap-1 ${activeSection === 'dashboard' ? 'bg-[#193C36] text-[#01DB98]' : 'text-white'} text-white ${isMobileOpen?"text-[#01DB98]":""}`}  >
                        <GrLogout className={`${isHovered ? "text-lg":"text-xl"} ml-[14px]`} />
                        <p >Logout</p>
                    </li>




                    </ul>
            </motion.div>

            {/* Sidebar toggle icon for small devices */}
           
            {/* Main content */}
            

            
            <motion.div
                className={`ml-auto ${isSmallScreen ? 'sidebar-small' : ''} bg- relative`}

                initial={{ width: '95%' }}
                animate={{ 
                    width: isManual  ? '84%' : '98%', 
                    marginLeft: isManual  ? '16%' : '2%' 
                }}
             transition={{ duration: 0.5 }}
            >
            {/* {showLine && <div className="Lline" style={{ width: `${width}%` }}></div>}     */}
              <div className="bg-[#14161A] min-h-screen relative">
              <div className="text-center pb-2  bg-[#14161A]/60  z-[30]  fixed backdrop-blur-xl text-white h-16 right-0 top-0 w-full transition-all duration-300 ease-in-out  ">
              <div className="lg:hidden block border-b border-gray-50 z-20 p-2">

                <div className='flex justify-start items-center gap-2  mt-1'>
                <img src={logo} className='w-7 ml-2 '></img>
              
                </div>
               
                <div className="flex justify-end items-center gap-2 text-xl  -mt-8 bg-[#14161A]">
            
             <div className=" font-chakra bg-[#193C36]  font-medium flex justify-center gap-2 pb-[1px] items-center px-2 py-[4px] rounded-md    text-base ">
            <p > ৳ {user?.balance} 20.454</p> 
              </div>
              <Link to="/user/custom-order"  title="Custom Order"  className={`shadow-sm -mr-2 `}
              >
              <div className={`${ 
                            location.pathname === "/user/custom-order" ? " text-[#01DB98]" : " text-gray-50"}  m-1 rounded-xl px-2 py-1 flex justify-center items-center`}>
                <FaFileCirclePlus className={`text-2xl `} />
              </div>
            </Link>
              <BellIcon userId={userId} />
              
              <Link to="/user" className={`flex justify-center items-center rounded-[200%] h-[36px] w-[36px] shadow-sm ${
                    location.pathname === "/user" ? "bg-[#193C36] text-[#01DB98]" : "bg-[#2f3031] text-gray-50"
                } hover:bg-[#3A3B3C]`}
                >
              <FaCircleUser className="text-lg"/>
              </Link>
            </div>
            </div> 


            <motion.div              
               initial={{ width: '95%' }}
                animate={{ 
                    width: isManual  ? '84%' : '98%', 
                    marginLeft: isManual  ? '16%' : '2%' 
                }}
                transition={{ duration: 0.5 }} className="lg:flex hidden justify-between items-center gap-[15%] text-xl    py-1 pr-6 pl-20"  >
           
           <div className="flex justify-end items-center gap-3 text-gray-300">
            <GoHome></GoHome> <span className="text-base mt-[2px]">/</span> 
            <p className="text-base mt-[2px] text-gray-100 ">{location.pathname ==='/user/message' && "My Assistant" }

            {location.pathname ==='/user' && "Dashboard" }
            {location.pathname ==='/user/service' && "Services" }
            {location.pathname ==='/user/my-order' && "My Order" }
            {location.pathname ==='/user/subscription' && "Subscription" }
            {location.pathname ==='/user/coming-soon' && "Coming Soon" }
            {location.pathname ==='/user/wallet' && "My Wallet" }
            {location.pathname ==='/user/notes' && "My Notes" }
            {location.pathname ==='/user/custom-order' && "Custom Order" }
            </p>

           </div>
            <div className="flex justify-end items-center gap-3 ">
              <Link to="/user/my-order" title="My Orders" className={`${ 
             location.pathname === "/user/my-order" ?"border-b-2 border-[#01DB98] ":"border-b-2 border-transparent"}  shadow-sm mb-[-4px] `}
              >
              <div className={`${ 
                             location.pathname === "/user/my-order"  ? " text-[#01DB98]" : " text-gray-50"} hover:bg-[#2f3031] m-1 rounded-xl px-6 py-2 flex justify-center items-center`}>
                <MdOutlineShoppingBag className={`text-2xl `} />
              </div>
            </Link>
            <Link to="/user/custom-order"  title="Custom Order"  className={`${ 
              location.pathname === "/user/custom-order" ?"border-b-2 border-[#01DB98] ":"border-b-2 border-transparent"}  shadow-sm mb-[-4px] `}
              >
              <div className={`${ 
                            location.pathname === "/user/custom-order" ? " text-[#01DB98]" : " text-gray-50"} hover:bg-[#2f3031] m-1 rounded-xl px-6 py-2 flex justify-center items-center`}>
                <FaFileCirclePlus className={`text-2xl `} />
              </div>
            </Link>
          <Link to="/user/wallet" title="My Wallet"  className={`${ 
              location.pathname === "/user/wallet" ? "border-b-2 border-[#01DB98] ":"border-b-2 border-transparent"}  shadow-sm mb-[-4px] `}
             >
             
              <div className={`${  location.pathname === "/user/wallet" ? " text-[#01DB98]" : " text-gray-50"} hover:bg-[#2f3031] m-1 rounded-xl px-6 py-2 flex justify-center items-center`}>
                <PiCreditCardBold className={`text-2xl `} />
              </div>
             
            </Link>
           

          

            <Link to="/user/notes"  title="My Notes"  className={`${ 
               location.pathname === "/user/notes"  ?"border-b-2 border-[#01DB98] ":"border-b-2 border-transparent"}  shadow-sm mb-[-4px] `}
             >
              <div className={`${ 
                             location.pathname === "/user/notes" ? " text-[#01DB98]" : " text-gray-50"} hover:bg-[#2f3031] m-1 rounded-xl px-6 py-2 flex justify-center items-center`}>
                <TfiNotepad className={`text-xl `} />
              </div>
            </Link>
        
              </div>

              <div className="flex justify-end items-center gap-3 lg:pr-3 pr-0  py-2 px-5  rounded-full ">
              <div className=" font-chakra bg-[#193C36]  font-medium flex justify-center gap-2 pb-[1px] items-center px-2 py-[4px] rounded-md    text-base ">
            <p > ৳ {user?.balance} 20.454</p> 
              </div>
              <Link to="/user/message"  className={`flex justify-center items-center rounded-[200%] h-[40px] w-[40px] shadow-sm ${
             location.pathname === "/user/message"  ? "bg-[#193C36] text-[#01DB98]" : "bg-[#2f3031] text-gray-50"} hover:bg-[#3A3B3C]`}
>
             <IoChatbubbles className="text-xl" />
            </Link>
          
             <BellIcon userId={userId} />
             

              <Link to="/user" className={`flex justify-center items-center rounded-[200%] h-[40px] w-[40px] shadow-sm ${
                    location.pathname === "/user" ? "bg-[#193C36] text-[#01DB98]" : "bg-[#2f3031] text-gray-50"
                } hover:bg-[#3A3B3C]`}
                >
              <FaCircleUser className="text-xl"/>
              </Link>
         
              </div>
            
            </motion.div>

              </div>
              <div className="bg-[#14161A] pl-4  lg:pl-16 pt-20 ">
              <div className="lg:hidden flex justify-start items-center gap-1 -mt-3 mb-2 text-gray-300">
            <GoHome></GoHome> <span className="text-base mt-[2px]">/</span> 
            <p className="text-base mt-[2px] text-gray-100 ">{location.pathname ==='/user/message' && "My Assistant" }

            {location.pathname ==='/user' && "Dashboard" }
            {location.pathname ==='/user/service' && "Services" }
            {location.pathname ==='/user/my-order' && "My Order" }
            {location.pathname ==='/user/subscription' && "Subscription" }
            {location.pathname ==='/user/coming-soon' && "Coming Soon" }
            {location.pathname ==='/user/wallet' && "My Wallet" }
            {location.pathname ==='/user/notes' && "My Notes" }
            {location.pathname ==='/user/custom-order' && "Custom Order" }
            </p>

           </div>
                    <Outlet /> 
                    </div>
              </div>
              
               
            </motion.div>

        
        <div className="lg:hidden fixed bottom-0 inset-x-0 -mb-2 z-[1000]  bg-[#1D1F25]">
                <div className="flex justify-start items-start ">
                  <div className="w-[15%] py-2 flex justify-center items-center z-50 bg-[#14161A]">
                  <Link to="/user/message" className={`flex justify-center items-center rounded h-[44px] w-[44px] px-3 shadow-sm ${
                    location.pathname === "/user/message" ? "bg-[#193C36] text-[#01DB98]" : " text-gray-50"
                      } hover:bg-[#193C36]`}
                      >
                    <TbMessageChatbot className="text-xl"/>
                    </Link>
                  </div>

                  <div className="w-[85%] z-30 ">
                    <div className="overflow-x-scroll flex justify-start py-2 items-center gap-3 w-full">
                  <Link to="/user" className={`flex justify-center items-center rounded h-[44px] w-[44px] px-3 shadow-sm ${
                    location.pathname === "/user" ? "bg-[#193C36] text-[#01DB98]" : " text-gray-50"
                      } hover:bg-[#193C36]`}
                      >
                    <RxDashboard className="text-xl"/>
                    </Link>
                    <Link to="/user/my-order" className={`flex justify-center items-center rounded h-[44px] w-[44px] px-3 shadow-sm ${
                    location.pathname === "/user/my-order" ? "bg-[#193C36] text-[#01DB98]" : " text-gray-50"
                      } hover:bg-[#193C36]`}
                      >
                    <GrShop className="text-xl"/>
                    </Link>
                  <Link to="/user/service" className={`flex justify-center items-center rounded h-[44px] w-[44px] px-3 shadow-sm ${
                    location.pathname === "/user/service" ? "bg-[#193C36] text-[#01DB98]" : " text-gray-50"
                      } hover:bg-[#193C36]`}
                      >
                    <CiShop className="text-xl"/>
                    </Link>

                    <Link to="/user/subscription" className={`flex justify-center items-center rounded h-[44px] w-[44px] px-3 shadow-sm ${
                    location.pathname === "/user/subscription" ? "bg-[#193C36] text-[#01DB98]" : " text-gray-50"
                      } hover:bg-[#193C36]`}
                      >
                    <GrWorkshop className="text-xl"/>
                    </Link>

                    <Link to="/user/coming-soon" className={`flex justify-center items-center rounded h-[44px] w-[44px] px-3 shadow-sm ${
                    location.pathname === "/user/coming-soon" ? "bg-[#193C36] text-[#01DB98]" : " text-gray-50"
                      } hover:bg-[#193C36]`}
                      >
                    <BiSolidOffer className="text-xl"/>
                    </Link>
                    

                    <Link to="/user/wallet" className={`flex justify-center items-center rounded h-[44px] w-[44px] px-3 shadow-sm ${
                    location.pathname === "/user/wallet" ? "bg-[#193C36] text-[#01DB98]" : " text-gray-50"
                      } hover:bg-[#193C36]`}
                      >
                    <PiCreditCardBold className="text-xl"/>
                    </Link>

                    <Link to="/user/notes" className={`flex justify-center items-center rounded h-[44px] w-[44px] px-3 shadow-sm ${
                    location.pathname === "/user/notes" ? "bg-[#193C36] text-[#01DB98]" : " text-gray-50"
                      } hover:bg-[#193C36]`}
                      >
                    <TfiNotepad className="text-xl"/>
                    </Link>


                   

                    <Link to="/user/coming-soon" className={`flex justify-center items-center rounded h-[44px] w-[44px] px-3 shadow-sm ${
                    location.pathname === "/user/coming-soon" ? "bg-[#193C36] text-[#01DB98]" : " text-gray-50"
                      } hover:bg-[#193C36]`}
                      >
                    <BsFilePost className="text-xl"/>
                    </Link>

                    <Link to="/user/coming-soon" className={`flex justify-center items-center rounded h-[44px] w-[44px] px-3 shadow-sm ${
                    location.pathname === "/user/coming-soon" ? "bg-[#193C36] text-[#01DB98]" : " text-gray-50"
                      } hover:bg-[#193C36]`}
                      >
                    <BsFilePost className="text-xl"/>
                    </Link>
                    </div>
                    </div>

                </div>
        </div>
        </div>


    </div>

  );
};

export default UserLayout;