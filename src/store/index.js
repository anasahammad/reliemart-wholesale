import { configureStore } from "@reduxjs/toolkit";

import { userReducer, customerReducer } from "./reducers/userReducer";
import { cartReducer } from "./Cart";
import { wishlistReducer } from "./Wishlist";

// Retrieve user and vendor data from localStorage
const userInfoFromStorage = localStorage.getItem("resellerAccount")
  ? JSON.parse(localStorage.getItem("resellerAccount"))
  : null;

const customerInfoFromStorage = localStorage.getItem("customerAccount")
  ? JSON.parse(localStorage.getItem("customerAccount"))
  : null;

// Define the initial state
const initialState = {
  user: { userInfo: userInfoFromStorage },
  customer: { customerInfo: customerInfoFromStorage },
};

// Configure the store with all reducers and initial state
const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    customer: customerReducer,
  },
  preloadedState: initialState, // Set the initial state
});

export default store;
