

import { Outlet } from 'react-router-dom';

import PhoneNav from '../Components/components/Navbar/PhoneNav';



const Main = () => {

    return (
        <div className=''>
            

         
         
                <div className=''>
                    <Outlet />
                </div>  
                <PhoneNav></PhoneNav>
             
        </div>
    );
};

export default Main;