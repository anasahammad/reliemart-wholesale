import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import avatar from "../assets/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUserByIdForUser } from "../services/index/users";

import { customerLogout } from "../store/actions/userLogout";
import toast from "react-hot-toast";

const UserDropdown = ({  photoUrl }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const userState = useSelector((state) => state.user);
  const [accounts, setAccounts] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const userInfo =
  userState?.customerInfo || JSON.parse(localStorage.getItem("customerAccount"));
const userId = userInfo?.user?._id;
//console.log(resellerId);
useEffect(() => {
  const fetchUser = async () => {
    try {
      const userData = await getUserByIdForUser(userId);
      //console.log(userData.user);
      setAccounts(userData.user);
    } catch (err) {
      // setError(err.message);
    }
  };

  fetchUser();
}, [userId]);

 const logoutHandler = () => {
    dispatch(customerLogout());
    navigate("/login");
    closeDropdown();
    setAccounts(null);
    toast.success("সফলভাবে লগআউট হয়েছে");
  };
console.log("accounts ",accounts);
  return (
    <div className="relative">
      {/* Profile Icon */}
      <div
        className="relative cursor-pointer mr-[15px] bottom-[2px]"
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          
            {accounts ? (
              <img
                src={photoUrl || avatar}
                alt="avatar"
                className="w-[33px] h-[33px] rounded-full object-cover"
              />
            ) : (
              <CgProfile size={27} color="#fff" />
            )}
          
        </div>
      </div>

      {/* Dropdown Menu */}
      {dropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
          onMouseLeave={closeDropdown}
        >
          <ul className="py-2">
            <li>
              <Link
                to="/my-orders"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                My Orders
              </Link>
            </li>
            
            {!accounts && (
                <li>
                <Link
                  to="/my-orders"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Link>
              </li>
            )}
            {accounts && (
            <>
             <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>

              <li>
              <button
               onClick={logoutHandler}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </li>
            </>
              
            )}
           
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
