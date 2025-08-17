import React, { useEffect, useState } from 'react';
import UseAuth from '../UseAuth';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from '../Components/Dashboard/Payment/CheckOutForm';
import useAxiosSecure from '../Hooks/UseAxiosSecure';

import LoadingSpinner from '../Components/LoadingSpinner';
import { ReTitle } from 're-title';

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
const CheckOut = () => {
    const { user } = UseAuth();
    const [cart, setCart] = useState([]);
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/cart/${user.email}`)
                .then((res) => {
                    setCart(res.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.error("Cart fetch error:", err)
                    setLoading(false)
                });
        }
    }, [user, axiosSecure]);

    const totalPrice = cart.reduce((acc, item) => {
        const quantity = item.quantity || 1;
        const price = item.price || 0;
        return acc + (price * quantity);
    }, 0);

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    return (
        <div className="max-w-10/12 min-h-[calc(100vh-367px)] mx-auto md:px-4 py-10">
            <ReTitle title="Cart Page | Check out"></ReTitle>
            <div className="flex flex-col-reverse lg:flex-row gap-8">


                <div className="w-full lg:w-[70%] space-y-6">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-base-content">Order Summary</h2>
                    <div className="bg-white dark:bg-base-300 p-6 rounded-lg shadow space-y-4">
                        {cart.map(item => (
                            <div key={item._id} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <p className="font-medium">{item.itemName}</p>
                                    <p className="text-sm text-gray-500 dark:text-base-content">{item.company}</p>
                                    <p className="text-sm text-gray-600 dark:text-base-content">Quantity: {item.quantity || 1}</p>
                                </div>
                                <p className="font-semibold">${(item.price * (item.quantity || 1)).toFixed(2)}</p>
                            </div>
                        ))}
                        <div className="flex justify-between text-lg font-bold pt-4">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                </div>


                <div className="w-full lg:w-[40%]">
                    <div className="bg-white dark:bg-base-300 p-3 md:p-6 rounded-lg shadow-md h-fit">
                        <h2 className="text-xl font-semibold mb-4 dark:text-base-content">Payment Info</h2>

                        <div className=" rounded text-center text-gray-500 dark:text-base-content   ">
                            <Elements stripe={stripePromise} >
                                <CheckOutForm cart={cart} totalPrice={totalPrice} ></CheckOutForm>
                            </Elements>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    );
};

export default CheckOut;
