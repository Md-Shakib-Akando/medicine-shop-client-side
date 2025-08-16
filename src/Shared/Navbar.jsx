import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import UseAuth from '../UseAuth';
import Swal from 'sweetalert2';
import { FaCartPlus } from "react-icons/fa";
import useAxiosSecure from '../Hooks/UseAxiosSecure';

const Navbar = () => {
    const { user, logOut } = UseAuth();

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [role, setRole] = useState('');
    const [cartCount, setCartCount] = useState(0);
    const axiosSecure = useAxiosSecure();






    const NavItem = <>

        <li><NavLink to='/' className={({ isActive }) =>
            isActive
                ? "text-white  flex items-center  rounded-md  justify-center  bg-[#00afb9]  "
                : "flex items-center justify-center  hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md "
        }>Home</NavLink></li>
        <li><NavLink to='/shop' className={({ isActive }) =>
            isActive
                ? "text-white  flex items-center  rounded-md  justify-center  bg-[#00afb9]  "
                : "flex items-center justify-center  hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md "
        }>Shop</NavLink></li>
        <li tabIndex={0}>
            <details className="dropdown">
                <summary className="   ">Language</summary>
                <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-40">
                    <li><NavLink to="/en">English</NavLink></li>
                    <li><NavLink to="/bn">বাংলা</NavLink></li>
                </ul>
            </details>
        </li>




    </>

    const handleCartClick = () => {
        if (!user) {
            navigate('/login');
        } else if (role === 'user') {
            navigate('/cart');
        }

    };




    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('Logged out');
                Swal.fire({
                    icon: "success",
                    title: "Log Out Success",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/login');
            })
            .catch(err => {
                console.error('Logout failed', err);
            });
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => setRole(res.data.userRole))
                .catch(console.error);
        }
    }, [user, axiosSecure]);

    useEffect(() => {
        const fetchCartCount = () => {
            if (user?.email) {
                axiosSecure.get(`/cart/${user.email}`)
                    .then(res => setCartCount(res.data.length))
                    .catch(console.error);
            } else {
                setCartCount(0);
            }
        };

        fetchCartCount();

        const handler = () => fetchCartCount();

        window.addEventListener('cart-updated', handler);
        return () => window.removeEventListener('cart-updated', handler);
    }, [user, axiosSecure]);


    return (
        <div className=''>
            <div className='fixed top-0 z-50 bg-blue-100/50 dark:bg-base-300 backdrop-blur-md w-full shadow-sm'>
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

                    <div className="navbar-end space-x-2">
                        <button
                            onClick={handleCartClick}
                            className="relative inline-block"
                            disabled={role === 'admin' || role === 'seller'}
                        >
                            <FaCartPlus size={28} className={`${(role === 'admin' || role === 'seller') ? ' cursor-not-allowed' : ''}`} />
                            {role === 'user' && (
                                <span
                                    className="absolute -top-2 -right-2 bg-[#00afb9] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center select-none"
                                >
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {
                            user ?
                                <div className=" relative hidden lg:flex justify-center items-center group w-[50px] sm:w-[70px] h-[70px]">

                                    {
                                        user &&

                                        <div className="dropdown dropdown-end">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                    <img
                                                        referrerPolicy="no-referrer"
                                                        src={user?.photoURL || "/default-avatar.png"}
                                                        alt="User Avatar"
                                                    />
                                                </div>
                                            </div>
                                            <ul tabIndex={0} className="mt-3 z-50 p-2 shadow menu menu-sm    dropdown-content bg-blue-100 dark:bg-base-200 rounded-box w-52 -left-20 ">
                                                <li className=' text-lg  mt-2'><Link to="/updateProfile" className='text-lg'>Update Profile</Link></li>
                                                <li className='   mt-2'><Link to="/dashBoard" className='text-lg'>Dashboard</Link></li>

                                                <li className='text-lg  mt-2'><button
                                                    onClick={handleLogOut} className='btn mr-2 text-white shadow-none bg-[#00afb9] border-[#00afb9] hover:text-[#00afb9] hover:bg-blue-100/70'>Logout</button></li>
                                            </ul>
                                        </div>





                                    }
                                </div>

                                :

                                <div className='hidden lg:flex'>
                                    <Link to='/login'>
                                        <button className='btn mr-2 text-white shadow-none bg-[#00afb9] border-[#00afb9] hover:text-[#00afb9] hover:bg-blue-100/70'>Join Us</button>
                                    </Link>
                                </div>

                        }


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
                        <div className='flex justify-center items-center'>

                            {
                                user ?
                                    <div className="relative flex justify-center items-center group w-[50px] sm:w-[70px] h-[70px]  ">

                                        {
                                            user &&

                                            <div className="dropdown dropdown-end ">
                                                <div tabIndex={0} role="button" className="btn btn-ghost   btn-circle avatar">
                                                    <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                        <img
                                                            referrerPolicy="no-referrer"
                                                            src={user?.photoURL || "/default-avatar.png"}
                                                            alt="User Avatar"
                                                        />
                                                    </div>
                                                </div>
                                                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm    dropdown-content bg-blue-200 dark:bg-base-200 rounded-box w-52 -left-20 ">
                                                    <li className=' text-lg  mt-2'><Link to="/updateProfile" className='text-lg'>Update Profile</Link></li>
                                                    <li className='   mt-2'><Link to="/dashBoard" className='text-lg'>Dashboard</Link></li>

                                                    <li className='text-lg  mt-2'><button
                                                        onClick={handleLogOut} className='btn mr-2 text-white shadow-none bg-[#00afb9] border-[#00afb9] hover:text-[#00afb9] hover:bg-blue-100/70'>Logout</button></li>
                                                </ul>
                                            </div>





                                        }
                                    </div>

                                    :

                                    <div className=' flex lg:hidden'>
                                        <Link to='/login'>
                                            <button className='btn mr-2 text-white shadow-none bg-[#00afb9] border-[#00afb9] hover:text-[#00afb9] hover:bg-blue-100/70'>Join Us</button>
                                        </Link>
                                    </div>

                            }
                        </div>
                        <ul className="space-y-7 mt-4 text-center">
                            {NavItem}
                        </ul>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;