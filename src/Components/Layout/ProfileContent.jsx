import React from "react";

import Profile from "./ProfileContent/Profile";
import ChangePassword from "./ProfileContent/ChangePassword";
import Address from "./ProfileContent/Address";
import MyLoginOrders from "../../Pages/MyLoginOrders";

const ProfileContent = ({ active, setViewProfile }) => {
  // get the address data from local storage
  const addresses = JSON.parse(localStorage.getItem("newAddressCreate"));

  return (
    <div className="w-full">
      {active === 1 && <Profile setViewProfile={setViewProfile} />}
      {active === 2 && <MyLoginOrders/>}
      {/* {active === 6 && <ChangePassword />} */}
      {active === 7 && <Address addresses={addresses} />}
    </div>
  );
};

export default ProfileContent;
