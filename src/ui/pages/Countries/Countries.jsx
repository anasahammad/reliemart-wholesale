import React from 'react';
import { Link } from 'react-router-dom';

const Countries = () => {
    return (
        <div className='pt-16 md:py-20 text-center'>
            <h1 className='text-xl md:text-3xl font-semibold'>Start shopping from</h1>

            {/* countries */}
            <div className=' grid grid-cols-5 md:flex justify-center  mx-auto mt-5 md:mt-10 gap-3 lg:gap-10 w-11/12 md:w-8/12'>
                  {/* 4 */}
                  <div className='mb-5'>
                    <Link to={"/search-product"}>
                        <img className='w-full' src="https://s3.Ali2BD.net/files/2022/12/19/ac8af036-3111-4ed1-b109-25d0755b34ea.jpeg" alt="" />
                        <p className='font-semibold text-xs md:text-base mt-3'>India</p>
                    </Link>
                </div>

                {/* 5 */}
                <div className='mb-5'>
                    <Link to={"/search-product"}>
                        <img className='w-full' src="https://s3.Ali2BD.net/files/2022/12/19/ac8af036-3111-4ed1-b109-25d0755b34ea.jpeg" alt="" />
                        <p className='font-semibold text-[10px] lg:block md:block hidden md:text-base mt-3'>India (WholeSale)</p>
                        <div className='font-semibold text-xs md:hidden flex flex-col justify-center items-center lg:hidden md:text-base mt-3 text-center'>India 
                       <span>(WholeSale)</span>
                        </div>
                    </Link>
                </div>
                {/* 1 */}
                <div className='mb-5'>
                    <Link to={"/search-product"}>
                        <img className='w-full' src="https://s3.Ali2BD.net/files/2022/11/23/b218e924-b15b-4d82-8809-0dc483fca7d2.png" alt="" />
                        <p className='font-semibold text-xs md:text-base mt-3'>China</p>
                    </Link>
                </div>

                {/* 2 */}
                <div className='mb-5'>
                    <Link to={"/search-product"}>
                        <img className='w-full' src="https://s3.Ali2BD.net/files/2022/11/23/79a33e7c-3887-4b61-b961-555c2f001f77.png" alt="" />
                        <p className='font-semibold text-xs md:text-base mt-3'>USA</p>
                    </Link>
                </div>

                {/* 3 */}
                <div className='mb-5'>
                    <Link to={"/search-product"}>
                        <img className='w-full' src="https://s3.Ali2BD.net/files/2022/11/23/16e1b060-46c4-49bb-b10f-3a2e0399d9ca.png" alt="" />
                        <p className='font-semibold text-xs md:text-base mt-3'>Dubai</p>
                    </Link>
                </div>

              

            </div>
        </div>
    );
};

export default Countries;