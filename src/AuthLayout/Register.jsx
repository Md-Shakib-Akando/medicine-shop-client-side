import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../UseAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { auth } from '../firebase.config';
import Swal from 'sweetalert2';

const Register = () => {

    const { signInGoogle, createUser, updateUserProfile, setUser } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const [profilePic, SetProfilePic] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const onSubmit = data => {

        createUser(data.email, data.password)
            .then(result => {


                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic,
                };

                updateUserProfile(userProfile)
                    .then(async () => {
                        await auth.currentUser.reload();
                        setUser({ ...auth.currentUser });


                        const userBody = {
                            userName: data.name,
                            userEmail: data.email,
                            userphoto: profilePic,
                            userRole: data.role
                        };

                        axios.post('http://localhost:5000/users', userBody)
                            .then(res => {

                                if (res.data.insertedId) {
                                    Swal.fire({

                                        icon: "success",
                                        title: "Your account is created",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate(from);
                                }

                            })
                            .catch(error => {
                                console.error("Error saving user to DB:", error);
                            });

                    });
            })
            .catch(error => {
                console.log(error.message);
            });
    }
    const handleUploadPhoto = async (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_Key}`
        const res = await axios.post(imageUrl, formData)
        SetProfilePic(res.data.data.url)
    }
    const handleGoogleLogin = () => {
        signInGoogle()
            .then((result) => {
                const user = result.user
                console.log(user)
                Swal.fire({

                    icon: "success",
                    title: "LogIn successful.",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from);
            }).catch(error => {
                console.log(error.message)
            })
    }
    return (
        <div>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[#00afb9]">
                    Create Account
                </h2>

            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <div className="space-y-4">


                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"

                            {...register('name', { required: true, minLength: 3 })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00afb9] focus:border-[#00afb9]"

                        />
                        {errors.name && <span className='text-red-800 pt-3'>Name must be 3+ characters</span>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Profile
                        </label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleUploadPhoto}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00afb9] focus:border-[#00afb9]"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            {...register('email', { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00afb9] focus:border-[#00afb9]"
                            required
                        />
                        {errors.email && <span className='text-red-800 pt-3'>Email is required</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input

                                name="password"
                                {...register('password', { required: true, minLangth: 6 })}
                                className="block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00afb9] focus:border-[#00afb9]"
                                required
                            />
                            {errors.password?.type === "minLength" && <p className='text-red-800 pt-3'>Password must be 6+ characters</p>}

                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            name="role"
                            {...register("role", { required: true })}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00afb9] focus:border-[#00afb9]"

                        >
                            <option value="">Select a role</option>
                            <option value="user">User</option>
                            <option value="seller">Seller</option>

                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="acceptTerms"

                            className="h-4 w-4 text-[#00afb9] focus:[#00afb9] border-gray-300 !rounded-button"
                            required
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                            I accept the{" "}
                            <a href="#" className="text-[#00afb9] ">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent !rounded-button shadow-sm text-sm font-medium text-white bg-[#00afb9] hover:bg-[#00afb9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00afb9] cursor-pointer whitespace-nowrap"
                >
                    Create Account
                </button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">
                            Or continue with
                        </span>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="flex  w-full items-center justify-center px-4 py-3 border border-[#00afb9]  text-[#00afb9]  rounded-lg hover:bg-[#00afb9]  cursor-pointer hover:text-white !rounded-button whitespace-nowrap"
                >
                    <FcGoogle size={32} className='mr-5'></FcGoogle>
                    Google
                </button>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                        <Link to='/login'><button

                            className="font-medium text-[#00afb9] hover:text-[#63c77cf6] cursor-pointer whitespace-nowrap"
                        >
                            Sign in
                        </button></Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;