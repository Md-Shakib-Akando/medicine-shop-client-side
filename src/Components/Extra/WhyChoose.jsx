import React from 'react';
import img from '../../assets/wimg.jpg'
const WhyChoose = () => {
    return (
        <div>
            <div className="bg-blue-100/40 dark:bg-base-200 py-12 px-4 sm:px-6 lg:px-20 2xl:px-36">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
                    <div>
                        <h2 className="text-3xl dark:text-base-content sm:text-4xl font-bold text-[#1B1F2A] mb-6">
                            Why Choose <span className="text-[#00AFB9]">Our Medicine Shop?</span>
                        </h2>
                        <p className="text-gray-700 dark:text-base-content text-lg leading-relaxed mb-4">
                            We are committed to delivering high-quality healthcare products to your doorstep with the utmost care and efficiency.
                        </p>
                        <ul className="list-disc list-inside dark:text-base-content text-gray-800 space-y-2 text-base">
                            <li>Trusted pharmacy with verified medicines</li>
                            <li>Fast and reliable home delivery</li>
                            <li>24/7 customer support and consultation</li>
                            <li>Easy online ordering system</li>
                            <li>Attractive discounts and loyalty programs</li>
                        </ul>
                    </div>
                    <div>
                        <img
                            src={img}
                            alt="Online Medicine Delivery"
                            className="w-full rounded-lg shadow-md"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WhyChoose;