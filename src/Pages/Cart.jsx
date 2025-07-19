import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import UseAuth from '../UseAuth';
import { FiMinus, FiPlus } from "react-icons/fi";
import { RxCross2 } from 'react-icons/rx';
import useAxiosSecure from '../Hooks/UseAxiosSecure';

const Cart = () => {
    const { user } = UseAuth();
    const [cart, setCart] = useState([]);
    const axiosSecure = useAxiosSecure();


    const clearAllCarts = async () => {
        try {
            await axiosSecure.delete(`/cart/clear/${user.email}`);
            setCart([]);
            window.dispatchEvent(new Event('cart-updated'));
        } catch (error) {
            console.error("Failed to clear cart:", error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axiosSecure.delete(`/cart/${id}`);
            setCart(prev => prev.filter(item => item._id !== id));
            window.dispatchEvent(new Event('cart-updated'));
        } catch (error) {
            console.error("Failed to delete item:", error);
        }
    };

    const handleIncrease = async (id) => {
        const updatedCart = cart.map(item =>
            item._id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
        setCart(updatedCart);

        const changedItem = updatedCart.find(item => item._id === id);
        try {
            await axiosSecure.patch(`/cart/${id}`, {
                quantity: changedItem.quantity
            });
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };


    const handleDecrease = async (id) => {
        const updatedCart = cart.map(item =>
            item._id === id ? { ...item, quantity: Math.max((item.quantity || 1) - 1, 1) } : item
        );
        setCart(updatedCart);

        const changedItem = updatedCart.find(item => item._id === id);
        try {
            await axiosSecure.patch(`/cart/${id}`, {
                quantity: changedItem.quantity
            });
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };


    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/cart/${user.email}`)
                .then((res) => {
                    setCart(res.data);
                })
                .catch((err) => {
                    console.error("Failed to fetch cart:", err);
                });
        }
    }, [user, axiosSecure]);

    const totalPrice = cart.reduce((acc, item) => {
        const quantity = item.quantity || 1;
        const price = item.price || 0;
        return acc + (price * quantity);
    }, 0);

    return (
        <div className="overflow-x-auto min-h-screen max-w-10/12 mx-auto px-4 py-8">
            <div className="flex justify-end mb-6">
                <button onClick={clearAllCarts} className="bg-[#008c94] text-white py-2 px-6 rounded-md hover:cursor-pointer">
                    Clear All
                </button>
            </div>

            <div className="flex flex-col-reverse lg:flex-row gap-6">

                <div className="overflow-x-auto w-full lg:w-[70%]">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-lg uppercase bg-[#00afb9] text-white">
                                <th> </th>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th className="text-end">SubTotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cart.map((item) => (
                                    <tr key={item._id} className="hover:bg-blue-50">
                                        <td>
                                            <div className="p-2 bg-gray-200 rounded-full hover:bg-red-200 cursor-pointer inline-flex items-center justify-center">
                                                <button onClick={() => deleteItem(item._id)} className='hover:cursor-pointer'>
                                                    <RxCross2 size={18} className="text-black" />
                                                </button>
                                            </div>
                                        </td>
                                        <td>{item.itemName}</td>
                                        <td>{item.company}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>
                                            <div className="flex items-center gap-2">
                                                <button onClick={() => handleDecrease(item._id)} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded font-bold hover:cursor-pointer"><FiMinus /></button>
                                                <span className="min-w-[20px] text-center">{item.quantity || 1}</span>
                                                <button onClick={() => handleIncrease(item._id)} className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded font-bold hover:cursor-pointer"><FiPlus /> </button>
                                            </div>
                                        </td>
                                        <td className="text-end">
                                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>


                <div className="w-full lg:w-[30%] h-[220px] border rounded-lg p-6 shadow-md bg-white order-1 lg:order-none">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">
                        CART TOTALS ({cart.length})
                    </h2>

                    <div className="border-b pb-4 mb-4">
                        <div className="flex justify-between text-lg font-semibold text-gray-700">
                            <span>Total Price</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <Link to="/checkOut">
                        <button className="w-full bg-[#008c94] text-white py-3 rounded-lg text-center font-medium transition duration-300 hover:cursor-pointer">
                            PROCEED TO CHECKOUT
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Cart;
