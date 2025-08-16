import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#00afb9] dark:bg-base-300 text-white px-6 py-10">
            <div className="max-w-11/12 mx-auto flex flex-col lg:flex-row gap-5 md:gap-10 lg:gap-0">


                <div className="space-y-4 lg:w-[40%] flex flex-col md:justify-center md:items-center  lg:justify-start lg:items-start">
                    <Link to='/' className="flex items-center space-x-3">
                        <img src="/logo.png" alt="Medicine Shop Logo" className="h-12" />
                        <span className="text-2xl font-bold">Medicine Shop</span>
                    </Link>
                    <p className="text-[16px] max-w-xs md:text-center lg:text-start">
                        Your trusted online pharmacy providing quality medicines and health products with fast delivery.
                    </p>
                </div>

                <div className='w-full lg:w-[60%] flex flex-col md:flex-row gap-10 md:justify-center lg:justify-between'>

                    <div>
                        <h3 className="uppercase font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-[16px] md:text-center">
                            <li><Link to="/" className="hover:underline">Home</Link></li>
                            <li><Link to="/shop" className="hover:underline">Shop</Link></li>
                            <li><Link to="/" className="hover:underline">FAQ</Link></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="uppercase font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2 text-[16px]">
                            <li><a href="tel:+880123456789" className="hover:underline">Call Us: +880 1234 56789</a></li>
                            <li><a href="mailto:support@medicineshop.com" className="hover:underline">support@medicineshop.com</a></li>

                            <li><Link to="/" className="hover:underline">Privacy Policy</Link></li>
                        </ul>
                    </div>


                    <div>
                        <h3 className="uppercase font-semibold mb-4">Follow Us</h3>
                        <div className="flex space-x-4 text-white text-lg">
                            <a href="https://www.facebook.com/sha.kib.493731" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/md-shakib-akando/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                                <FaLinkedinIn size={24} />
                            </a>
                            <a href="https://github.com/Md-Shakib-Akando" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200">
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-10 border-t border-white/30 pt-6 text-center text-[16px]">
                © 2025 Medicine Shop. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
