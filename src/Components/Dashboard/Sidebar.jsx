import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import UseAuth from '../../UseAuth';
import { IoClose, IoHomeOutline, IoMenu, IoSettingsSharp } from 'react-icons/io5';
import { BsEnvelopeOpenHeart } from 'react-icons/bs';
import { PiFlagBanner } from 'react-icons/pi';
import { MdLogout, MdPayment } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa';
import { TbCategory, TbFileReport } from 'react-icons/tb';

const Sidebar = () => {
    const { user } = UseAuth();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const location = useLocation();
    useEffect(() => {
        if (location.pathname.includes('/dashboard')) {
            setIsDrawerOpen(true);
        }
    }, [location]);

    return (
        <div>

            <button
                className="text-2xl p-2 fixed top-0 left-2 z-50 lg:hidden"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
                {isDrawerOpen ? <IoClose className='border border-[#00afb9] text-3xl rounded-full' /> : <IoMenu className=' border  border-[#00afb9] text-3xl rounded-full' />}
            </button>


            <div
                className={`fixed top-0 left-0 min-h-screen h-auto z-20 bg-gray-100 w-80 transition-transform transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
                    } lg:translate-x-0 lg:static '`}
            >

                <Link to={'/'}>
                    <div className="flex bg-blue-100 mx-auto py-2 justify-center items-center mb-8 gap-1">
                        <img className="sm:w-[60px] w-[40px] rounded-full" src='/logo.png' alt="Logo" />
                        <h1 className="font-bold">Medicine Shop</h1>
                    </div>
                </Link>


                <div className='mb-10 flex flex-col justify-center items-center'>

                    <div className="avatar px-8 pb-5 flex justify-center  sm:block">
                        <div className="ring-[#00afb9] ring-offset-base-100 w-16 sm:w-24 lg:w-24 rounded-full ring ring-offset-2">
                            <img src={user?.photoURL} alt="Profile" />
                        </div>
                    </div>
                    <div className='px-6 text-center'>
                        <h1>Name: {user?.displayName}</h1>
                        <h1>Email: {user?.email}</h1>
                        <h1>Role: {user?.role}</h1>
                    </div>
                </div>





                <div>

                    <div>

                        <NavLink
                            to="/dashBoard/adminHome"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                                    : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                            }
                        >
                            <IoHomeOutline className="text-xl" />
                            Admin Homepage
                        </NavLink>
                        <NavLink
                            to="/dashBoard/manageUsers"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                                    : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                            }
                        >
                            <FaUsers className="text-xl" />
                            Manage Users
                        </NavLink>
                        <NavLink
                            to="/dashBoard/manageCategory"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                                    : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                            }
                        >
                            <TbCategory className="text-xl" />
                            Manage Category
                        </NavLink>
                        <NavLink
                            to="/dashBoard/paymentManage"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                                    : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                            }
                        >
                            <MdPayment className="text-xl" />
                            Payment management
                        </NavLink>
                        <NavLink
                            to="/dashBoard/salesReport"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                                    : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                            }
                        >
                            <TbFileReport className="text-xl" />
                            Sales Report
                        </NavLink>
                        <NavLink
                            to="/dashBoard/bannerAdvertise"
                            className={({ isActive }) =>
                                isActive
                                    ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                                    : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                            }
                        >
                            <PiFlagBanner className="text-xl" />
                            Manage banner Advertise
                        </NavLink>
                    </div>

                </div>








                <div>
                    <NavLink
                        to="/dashBoard/sellerHome"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                                : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                        }
                    >
                        <IoHomeOutline className="text-xl" />
                        Seller Homepage
                    </NavLink>


                    <NavLink
                        to="/dashBoard/manageMedicine"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                                : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                        }
                    >
                        <BsEnvelopeOpenHeart className="text-xl" />
                        Manage Medicines
                    </NavLink>

                    <NavLink
                        to="/dashBoard/sellerPaymentManage"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                                : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                        }
                    >
                        <MdPayment className="text-xl" />
                        Payment History
                    </NavLink>
                    <NavLink
                        to="/dashBoard/askForAdvertise"
                        className={({ isActive }) =>
                            isActive
                                ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                                : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                        }
                    >
                        <PiFlagBanner className="text-xl" />
                        Ask For Advertisement
                    </NavLink>
                </div>




                <NavLink
                    to="/dashBoard/paymentHistory"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                            : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                    }
                >
                    <MdPayment className="text-xl" />
                    Payment history
                </NavLink>



                <div className="divider mb-2 xl:mb-14"></div>


                <NavLink
                    to="/updateprofile"
                    className={({ isActive }) =>
                        isActive
                            ? "text-white  flex items-center pl-3 font-bold rounded-md mx-5 py-2 justify-start mb-5 gap-3 bg-[#00afb9]  border-secondary"
                            : "flex items-center justify-start py-2 hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 gap-3 mb-5"
                    }
                >
                    <IoSettingsSharp className="text-xl" />
                    Profile
                </NavLink>
                <button

                    className={"flex items-center w-[87%]  justify-start hover:bg-[#00afb9]  hover:text-white duration-300 rounded-md mx-5 border border-gray-300 pl-3 py-2 gap-3 mb-5"}
                >
                    <MdLogout className="text-xl" />
                    Logout
                </button>

            </div>
        </div>
    );
};

export default Sidebar;