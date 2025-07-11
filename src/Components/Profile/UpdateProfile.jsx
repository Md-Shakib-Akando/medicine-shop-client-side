import React from 'react';
import UseAuth from '../../UseAuth';
import useRole from '../../Hooks/useRole';

const UpdateProfile = () => {
    const { user } = UseAuth();
    const { role } = useRole();
    return (
        <div className=" max-w-3xl  mx-auto  p-6 mt-20 mb-10  bg-blue-100 rounded-lg shadow-md ">



            <div className='mb-10 flex flex-col justify-center items-center'>

                <div className="avatar px-8 pb-5 flex justify-center  sm:block">
                    <div className="ring-[#00afb9] ring-offset-base-100 w-16 sm:w-24 lg:w-24 rounded-full ring ring-offset-2">
                        <img src={user?.photoURL} alt="Profile" />
                    </div>
                </div>
                <div className='px-6 text-center'>
                    <h1>Name: {user?.displayName}</h1>
                    <h1>Email: {user?.email}</h1>
                    <h1>Role: {role}</h1>
                </div>
            </div>





            <h2 className="text-2xl font-semibold text-center mb-6 text-[#00afb9]">
                Update Profile
            </h2>
            <form className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"


                        placeholder="Enter your full name"
                        className="w-full px-3 py-2 border border-[#00afb9]  rounded-md focus:outline-none focus:ring-2 focus:ring-[#00afb9]"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        accept="image/*"

                        className="w-full text-sm px-3 py-2 border border-[#00afb9]  rounded-md focus:outline-none focus:ring-2 focus:ring-[#00afb9] text-gray-600"
                    />

                </div>

                <button
                    type="submit"

                    className='bg-[#00afb9]  text-white rounded-md py-2 px-4 hover:cursor-pointer'
                >
                    Update
                </button>
            </form>

        </div>
    );
};

export default UpdateProfile;