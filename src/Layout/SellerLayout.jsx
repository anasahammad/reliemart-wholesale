import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logout } from "../store/actions/userLogout";
import { useSelector ,useDispatch } from "react-redux";

import SiteNavBar from "../Component/Default/RootCommon/SiteNavBar";
import { RxCross2 } from "react-icons/rx";
import DashboardHeader from "../Component/Default/RootCommon/DashboardHeader";
import Footer from "../Component/Default/Footer";
import toast from "react-hot-toast";




const SellerLayout = () => {

  const router = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const userState = useSelector((state) => state.user);
  const userInfo = userState?.userInfo || JSON.parse(localStorage.getItem("resellerAccount"));
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

const [expanded, setExpanded] = useState(null); // For dropdown toggles

const toggleExpand = (index) => {
  setExpanded(expanded === index ? null : index);
};
// console.log(userState)
const [callNotifiction, setCallNotifiction] = useState(false);
  // Ensure hooks are not conditionally used
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (userInfo?.user) {
          setIsAdmin(true);
        } else {
        navigate("/seller/login");
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
const [callNav, setCallNav] = useState(false);

// Toggle sidebar
const handleCallNav = (data) => {
  setCallNav(data);
};
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
      <div className="w-full h-screen flex justify-center items-center">
        <h3 className="text-2xl text-slate-700">Loading...</h3>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <>


    <div className="bg-gray-100 shadow-md relative w-full flex h-screen">
      <div 
        className={`w-full ${
          callNav ? "left-0" : "-left-[100%]"
        } absolute md:static z-[999999999] min-w-[260px] max-w-[260px] lg:max-w-[220px] lg:min-w-[200px]   border-0 sm:border-r bg-white min-h-screen overflow-y-auto`}
      >
        <span
          onClick={() => handleCallNav(false)}
          className="p-1 block md:hidden  cursor-pointer rounded-md absolute top-2 right-2 border"
        >
          <RxCross2 />
        </span>
        <SiteNavBar handleCallNav={handleCallNav} />
      </div>
      <div className="w-full flex flex-col">
        <DashboardHeader handleCallNav={handleCallNav} />
        <div className="w-full h-[calc(100vh-90px)] overflow-y-auto lg:p-3 p-1">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>

    </>

  );
};

export default SellerLayout;