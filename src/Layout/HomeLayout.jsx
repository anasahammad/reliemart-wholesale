import React, { useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import toast from 'react-hot-toast';

const HomeLayout = () => {
    const navigate = useNavigate();
 
    const userState = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);

    const [isAdmin, setIsAdmin] = useState(false);
 
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        if (userState && userState.userInfo && userState.userInfo.data.user.email) {
          setIsAdmin(true);
        } else {
          navigate("/");
          toast.error("You are not allowed to access the User panel.");
        }
      } catch (error) {
        console.error(error);
        navigate("/");
        toast.error("Failed to check User status.");
      } finally {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [userState, navigate]);

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
        <div >
            <Navbar></Navbar>
            <div className='py-16 min-h-screen'>
                    <Outlet></Outlet>
            </div>
          
            
            
        </div>
    );
}

export default HomeLayout;
