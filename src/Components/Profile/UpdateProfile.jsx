import React from 'react';
import UseAuth from '../../UseAuth';
import useRole from '../../Hooks/useRole';
import Swal from 'sweetalert2';
import axios from 'axios';

import { useForm } from 'react-hook-form';

const UpdateProfile = () => {
    const { user, setUser, updateUserProfile } = UseAuth();
    const { role } = useRole();

    const imgUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_Key}`

    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try {
            let photoURL = user?.photoURL;

            if (data.image[0]) {
                const formData = new FormData();
                formData.append('image', data.image[0]);

                const res = await axios.post(imgUrl, formData);
                photoURL = res.data.data.display_url;
            }


            await updateUserProfile(data.name, photoURL);

            setUser({
                ...user,
                displayName: data.name,
                photoURL: photoURL
            });
            await axios.patch(`http://localhost:5000/users/${user.email}`, {
                userName: data.name,
                userphoto: photoURL
            });

            Swal.fire({
                icon: "success",
                title: "Profile updated",
                timer: 1500,
                showConfirmButton: false
            });


        } catch (error) {
            console.error(error);

        }
    };

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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"

                        {...register("name")}
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
                        {...register("image")}
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