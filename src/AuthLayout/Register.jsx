import React from 'react';
import { Link } from 'react-router';

const Register = () => {
    return (
        <div>
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                    Create Account
                </h2>

            </div>

            <form className="mt-8 space-y-6">
                <div className="space-y-4">


                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="name"

                            className="mt-1 block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Profile
                        </label>
                        <input
                            type="file"
                            name="image"

                            className="mt-1 block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
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

                            className="mt-1 block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input

                                name="password"

                                className="block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                required
                            />

                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Role
                        </label>
                        <select
                            name="role"

                            className="mt-1 block w-full px-3 py-2 border border-gray-300 !rounded-button shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        >
                            <option value="">Select a role</option>
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="pharmacist">Pharmacist</option>
                        </select>
                    </div>

                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="acceptTerms"

                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 !rounded-button"
                            required
                        />
                        <label className="ml-2 block text-sm text-gray-700">
                            I accept the{" "}
                            <a href="#" className="text-blue-600 hover:text-blue-500">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent !rounded-button shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer whitespace-nowrap"
                >
                    Create Account
                </button>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?
                        <Link to='/login'><button

                            className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer whitespace-nowrap"
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