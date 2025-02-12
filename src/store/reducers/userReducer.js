import { createSlice } from "@reduxjs/toolkit";

const userInitialState = { userInfo: null };
const customerInitialState = { customerInfo: null };



// Create a Redux slice for managing user-related state
const userSlice = createSlice({
  name: "user",                   // Specify the slice name
  initialState: userInitialState, // Set the initial state
  reducers: {                     
                                  // Action to set user information in the state
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    resetUserInfo(state, action) {    // Action to reset user information in the state
      state.userInfo = null;
    },
  },
});





// Create a Redux slice for managing vendor-related state
const customerSlice = createSlice({
  name: "customer",                 // Specify the slice name
  initialState: customerInitialState, // Set the initial state
  reducers: {                     
                                  // Action to set vendor information in the state
    setCustomerInfo(state, action) {
      state.customerInfo = action.payload;
    },
    resetCustomerInfo(state, action) { // Action to reset vendor information in the state
      state.customerInfo = null;
    },
  },
});



// Extract the actions and reducer from the user slice
const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

// Extract the actions and reducer from the vendor slice
const customerActions = customerSlice.actions;
const customerReducer = customerSlice.reducer;

export { userActions, userReducer , customerActions , customerReducer};