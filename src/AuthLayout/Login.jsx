import React from 'react';
import { Link } from 'react-router';

const Login = () => {
    return (
        <div >
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                    Welcome back
                </h2>
                <p className="mt-2 text-gray-600">
                    Please sign in to your account
                </p>
            </div>

            <form className="mt-8 space-y-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="mt-1 relative">
                            <input
                                type="email"
                                name="email"

                                className="appearance-none block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

                                className="appearance-none block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />

                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="rememberMe"

                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 !rounded-button"
                            />
                            <label className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <a
                                href="#"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent !rounded-button shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer whitespace-nowrap"
                >
                    Sign in
                </button>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?
                        <Link to='/register'>

                            <button

                                className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer whitespace-nowrap"
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