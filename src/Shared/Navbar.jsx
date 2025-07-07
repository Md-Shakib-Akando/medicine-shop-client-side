import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const NavItem = <>

        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/shop'>Shop</NavLink></li>
        <li><NavLink to='/contact'>Contact Us</NavLink></li>




    </>

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <div className=''>
            <div className=' bg-blue-100/50 backdrop-blur-md w-full shadow-sm'>
                <div className="navbar  md:max-w-11/12   mx-auto  py-3 ">
                    <div className="navbar-start">
                        <Link className='flex items-center ' to='/'><img className='h-[50px] md:h-[70px] ' src="/logo.png" alt="" /> <span className='text-lg md:text-2xl font-bold'>Medicine Shop</span></Link>
                    </div>

                    <div className='navbar-center'>
                        <div className='hidden lg:flex'>
                            <ul className="menu menu-horizontal px-1 md:gap-3 xl:gap-6 text-lg">
                                {NavItem}
                            </ul>
                        </div>
                    </div>

                    <div className="navbar-end">


                        <div className='hidden lg:flex'>
                            <Link to='/login'>
                                <button className='btn mr-2 text-white shadow-none bg-[#00afb9] border-[#00afb9] hover:text-[#00afb9] hover:bg-blue-100/70'>Join Us</button>
                            </Link>
                        </div>

                        <button onClick={() => setOpen(true)} className="btn bg-[#1b1f2a]/10 outline-none border-none shadow-none backdrop-blur-md text-white lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>


            {open && (
                <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-end lg:hidden">
                    <div className="w-3/4 sm:w-1/2 md:w-1/3 bg-blue-100 p-6 shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold">Menu</h2>
                            <button onClick={() => setOpen(false)} className="text-2xl">&times;</button>
                        </div>
                        <ul className="space-y-10 text-center">
                            {NavItem}
                        </ul>
                        <div className='lg:hidden  flex justify-center mt-10'>
                            <Link to='/login'>
                                <button className='btn mr-2 text-white shadow-none bg-[#00afb9] border-[#00afb9] hover:text-[#00afb9] hover:bg-blue-100/70'>Join Us</button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;