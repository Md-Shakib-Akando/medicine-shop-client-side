import React from 'react';
import { Link } from 'react-router';
import image from '../../assets/404-error-explained.jpeg'

const Error = () => {


    return (
        <div className=" h-[850px] flex flex-col items-center justify-center bg-gray-100 px-4 text-center">
            <img
                src={image}
                alt="404 Error"
                className="relative w-full "
            />

            <Link className='absolute top-10 left-20' to='/'>
                <button

                    className="hover:cursor-pointer px-6 py-2 bg-[#00afb9] text-white rounded-md hover:bg-[#007d86] transition"
                >
                    Back to Home
                </button></Link>
        </div>
    );
};

export default Error;
