import axios from "axios";


// Make a POST request to the server's registration endpoint
export const signup = async ({ name, email, password , phone, logo}) => {
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_GSMART_BASE_URL}/auth/merchant/register`, {
      name,
      email,
      password ,
      phone,
      logo,
      
    });
    return data;  // Return the data received from the server
  } catch (error) {
    // Handle errors during the registration process
    if (error.response && error.response.data.message)

      // If the server responds with an error message, throw that message
      throw new Error(error.response.data.message);

    // If there is no specific error message from the server, throw the general error message
    throw new Error(error.message);
  }
};





// admin login
export const login = async ({ phone,  password }) => {
  try {
    const { data } = await axios.post(
      `https://reseller-backend-zeta.vercel.app/api/v4/reseller/login`,
      {
        phone,
        password,
      },
      {
        withCredentials: true, // useCredential true
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
// user login
export const loginUser = async ({ email,  password }) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/wholeSaleCustomer/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true, // useCredential true
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};


// reseller details
export const getUserByIdForReseller = async (resellerId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/reseller/${resellerId}`,
      {
        withCredentials: true,
      }

    );
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

//get user
export const getUserByIdForUser = async (userId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/wholeSaleCustomer/${userId}`,
      
      {
        withCredentials: true,
      }

    );

    console.log("response",response.data)
    return response.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

export const loginVendor = async ({ email, password }) => {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_GSMART_BASE_URL}/auth/merchant/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true, // useCredential true
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message)
      throw new Error(error.response.data.message);
    throw new Error(error.message);
  }
};
