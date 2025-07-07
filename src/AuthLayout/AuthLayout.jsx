import React from 'react';
import { Link, Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div >
            <div className='md:hidden p-4'>
                <Link to='/'>
                    <button className='btn mr-2 text-white shadow-none bg-[#00afb9] border-[#00afb9] hover:text-[#00afb9] hover:bg-blue-100/70'>Back to Home</button>
                </Link>
            </div>
            <div className="flex min-h-screen" >

                <div className="hidden md:flex w-1/2 px-20 bg-blue-100 rounded-l-xl items-center justify-center">
                    <Link to='/' className="flex flex-col justify-center items-center">
                        <img src="/logo.png" alt="Logo" />
                        <h1 className="text-2xl font-bold mt-4">Medicine Shop</h1>
                    </Link>
                </div>


                <div className="w-full md:w-1/2 px-6 md:px-14 flex items-center justify-center ">

                    <div className="w-full max-w-xl">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
