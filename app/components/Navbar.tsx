
import React from 'react';
import { CiSearch } from "react-icons/ci";

const Navbar: React.FC = () => {

    return (
        <nav className="flex  bg-white text-black py-1 shadow-md">
            <div className='w-[330px]'></div>
            <div className='flex justify-around w-full  pt-7'>
                <div className=" mr-32    ">
                   <h1 className='text-2xl font-extrabold'> Add Items </h1> 
                    <p className='text-[#A2A1A8]'>add itmms dataill information</p>
                </div>
                <div className="flex  gap-14">


                    <div className="relative flex items-center border-2 rounded-xl hover:border hover:border-blue-500  ">
                        <span className="ml-2 text-black text-3xl">
                            <CiSearch />
                        </span>
                        <input
                            type="text"

                            placeholder="Search..."
                            className=" p-2 w-full focus:outline-none"
                        />

                    </div>

                    <div className=' flex items-center w-40 px-5 border rounded-xl'>
                        <h1>Ahmed Aly</h1>
                        <img className='pl-5' src="direction-down 01.png" alt="" />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
