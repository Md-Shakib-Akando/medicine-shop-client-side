import React from "react";
import { FaRegClipboard, FaTruck, FaSmile } from "react-icons/fa";

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaRegClipboard size={40} className="text-[#00afb9]" />,
            title: "Browse Medicines",
            description:
                "Explore our wide range of medicines using categories or search to find exactly what you need.",
        },
        {
            icon: <FaTruck size={40} className="text-[#00afb9]" />,
            title: "Fast Delivery",
            description:
                "Place your order and get your medicines delivered quickly and safely to your doorstep.",
        },
        {
            icon: <FaSmile size={40} className="text-[#00afb9]" />,
            title: "Easy & Reliable",
            description:
                "Enjoy a hassle-free experience with secure payment options and excellent customer support.",
        },
    ];

    return (
        <section className="py-20 bg-gray-50 dark:bg-base-100 px-15 md:px-20">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
                    How It Works
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Buying medicines online has never been easier. Just follow these simple steps.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-base-300 rounded-xl p-8 text-center shadow-lg transition hover:shadow-2xl"
                    >
                        <div className="flex justify-center mb-4">{step.icon}</div>
                        <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                            {step.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
