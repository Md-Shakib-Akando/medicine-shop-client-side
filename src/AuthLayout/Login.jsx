import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router';
import UseAuth from '../UseAuth';
import { useForm } from 'react-hook-form';

const Login = () => {
    const {
        register,
        handleSubmit,

    } = useForm();
    const { signInUser, signInGoogle } = UseAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    const onSubmit = (data) => {
        console.log(data)
        signInUser(data.email, data.password)
            .then(result => {
                console.log(result)
                alert("login successful")
                navigate(from);
            }).catch(error => {
                console.log(error.message)
            })
    }
    const handleGoogleLogin = () => {
        signInGoogle()
            .then((result) => {
                const user = result.user
                console.log(user)
                navigate(from);
            }).catch(error => {
                console.log(error.message)
            })
    }
    return (
        <div >
            <div className="text-center">
                <h2 className="text-3xl font-bold text-[#00afb9]">
                    Welcome back
                </h2>
                <p className="mt-2 text-gray-600">
                    Please sign in to your account
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type="email"
                                name="email"
                                {...register('email')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00afb9] focus:border-[#00afb9]"
                                required
                            />
                            <i className="fas fa-envelope absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type='password'
                                name="password"
                                {...register('password')}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#00afb9] focus:border-[#00afb9]"
                                required
                            />

                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="rememberMe"

                                className="h-4 w-4 text-[#00afb9] focus:ring-[#00afb9]border-gray-300 !rounded-button"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-[#00afb9] hover:text-[#00afb9]"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent !rounded-button shadow-sm text-sm font-medium text-white bg-[#00afb9] hover:bg-[#00afb9] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00afb9] cursor-pointer whitespace-nowrap"
                >
                    Sign in
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
                        Don't have an account?
                        <Link to='/register'>

                            <button

                                className="font-medium text-[#00afb9] hover:text-[#00afb9] cursor-pointer whitespace-nowrap"
                            >
                                Register now
                            </button>
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;