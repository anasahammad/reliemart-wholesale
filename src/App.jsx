
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./Router/route"
import Aos from "aos";
import "aos/dist/aos.css";
import "./App.css"
import { useEffect } from "react";

const App = () => {
    useEffect(()=>{
        Aos.init({
          duration:1000,
          once:true,
        })
      },[])
    return (
        <div className="overflow-x-hidden">
     
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false}></Toaster>
    
        </div>
    );
}

export default App;
