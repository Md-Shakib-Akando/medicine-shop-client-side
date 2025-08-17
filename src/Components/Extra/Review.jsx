import React from 'react';
import { BsPersonCircle } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';

const Review = () => {
    return (
        <div className='bg-blue-50 dark:bg-base-200 py-15 px-5 md:px-10'>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-base-content mb-4">
                    Customer Reviews
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Hear from our happy customers who bought medicines from our shop.
                </p>
            </div>

            <div className="carousel w-full">


                <div id="slide1" className="carousel-item relative w-full">
                    <div className="bg-white dark:bg-base-300 max-w-4xl mx-auto p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm h-fit text-center">
                        <div className="flex justify-center items-center mb-6">
                            <BsPersonCircle className=' dark:text-white' size={28} />
                            <h4 className="ml-2 text-lg font-bold text-gray-800 dark:text-base-content">
                                John Doe
                            </h4>
                        </div>
                        <blockquote className="text-gray-700 italic mb-4 dark:text-base-content">
                            "Excellent service! The medicines were delivered on time and well-packed. Highly recommended!"
                        </blockquote>
                        <div className="flex justify-center items-center gap-2 text-yellow-400">
                            <FaStar size={24} />
                            <FaStar size={24} />
                            <FaStar size={24} />
                            <FaStar size={24} />
                            <FaStar size={24} />
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>


                <div id="slide2" className="carousel-item relative w-full">
                    <div className="bg-white dark:bg-base-300 max-w-4xl mx-auto p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm h-fit text-center">
                        <div className="flex justify-center items-center mb-6">
                            <BsPersonCircle className=' dark:text-white' size={28} />
                            <h4 className="ml-2 text-lg font-bold text-gray-800 dark:text-base-content">
                                Mary Smith
                            </h4>
                        </div>
                        <blockquote className="text-gray-700 italic mb-4 dark:text-base-content">
                            "Great experience! The shop has all the medicines I needed and the staff is very helpful."
                        </blockquote>
                        <div className="flex justify-center items-center gap-2 text-yellow-400">
                            <FaStar size={24} />
                            <FaStar size={24} />
                            <FaStar size={24} />
                            <FaStar size={24} />
                            <FaStar size={24} />
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>


                <div id="slide3" className="carousel-item relative w-full">
                    <div className="bg-white dark:bg-base-300 max-w-4xl mx-auto p-6 md:p-8 rounded-xl border border-gray-200 shadow-sm h-fit text-center">
                        <div className="flex justify-center items-center mb-6">
                            <BsPersonCircle className='dark:text-white' size={28} />
                            <h4 className="ml-2 text-lg font-bold text-gray-800 dark:text-base-content">
                                Alex Johnson
                            </h4>
                        </div>
                        <blockquote className="text-gray-700 italic mb-4 dark:text-base-content">
                            "Fast delivery and quality medicines. I will definitely order again!"
                        </blockquote>
                        <div className="flex justify-center items-center gap-2 text-yellow-400">
                            <FaStar size={24} />
                            <FaStar size={24} />
                            <FaStar size={24} />
                            <FaStar size={24} />
                            <FaStar size={24} />
                        </div>
                    </div>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Review;
