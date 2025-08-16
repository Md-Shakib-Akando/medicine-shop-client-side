import React, { useEffect, useState } from 'react';

import { FaDollarSign, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import UseAuth from '../../../UseAuth';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { ReTitle } from 're-title';

const SellerHome = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    const [salesData, setSalesData] = useState({
        totalRevenue: 0,
        paidTotal: 0,
        pendingTotal: 0,
    });

    useEffect(() => {
        if (user?.email) {
            fetchSellerData();
        }
    }, [user?.email]);


    const fetchSellerData = async () => {
        try {
            const res = await axiosSecure.get('/payments');
            const payments = res.data;

            const sellerPayments = payments.filter(p => {
                if (Array.isArray(p.sellerEmail)) {
                    return p.sellerEmail.includes(user.email);
                } else {
                    return p.sellerEmail === user.email;
                }
            });

            const totalRevenue = sellerPayments.reduce((sum, p) => sum + (p.totalprice || 0), 0);
            const paidTotal = sellerPayments
                .filter(p => p.status === 'Approved')
                .reduce((sum, p) => sum + (p.totalprice || 0), 0);
            const pendingTotal = sellerPayments
                .filter(p => p.status === 'Pending')
                .reduce((sum, p) => sum + (p.totalprice || 0), 0);

            setSalesData({ totalRevenue, paidTotal, pendingTotal });
        } catch (err) {
            console.error('Error fetching seller data:', err);
        }
    };



    const chartData = [
        { name: 'Total Revenue', value: salesData.totalRevenue },
        { name: 'Paid Total', value: salesData.paidTotal },
        { name: 'Pending Total', value: salesData.pendingTotal },
    ];
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="p-3 rounded-lg shadow-md border 
                      bg-gray-900 text-white
                      dark:bg-base-200 dark:text-base-content dark:border-gray-700">
                    <p className="font-semibold">{label}</p>
                    <p>{`Value: ${payload[0].value}`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <ReTitle title="Dashboard | Seller"></ReTitle>
            <h2 className="text-3xl dark:text-base-content font-semibold mb-6">Seller Dashboard</h2>


            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">


                <div className="bg-white dark:bg-base-200 rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-blue-500">
                    <div className="bg-blue-500 text-white p-3 rounded-full">
                        <FaDollarSign size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 dark:text-base-content text-sm">Total Sales Revenue</h4>
                        <p className="text-2xl font-bold dark:text-base-content text-gray-800">${salesData.totalRevenue.toFixed(2)}</p>
                    </div>
                </div>


                <div className="bg-white dark:bg-base-200 rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-green-500">
                    <div className="bg-green-500 text-white p-3 rounded-full">
                        <FaMoneyBillWave size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 dark:text-base-content  text-sm">Total Paid</h4>
                        <p className="text-2xl font-bold dark:text-base-content text-gray-800">${salesData.paidTotal.toFixed(2)}</p>
                    </div>
                </div>


                <div className="bg-white dark:bg-base-200 rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-yellow-500">
                    <div className="bg-yellow-500 text-white p-3 rounded-full">
                        <FaClock size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 dark:text-base-content text-sm">Total Pending</h4>
                        <p className="text-2xl font-bold dark:text-base-content text-gray-800">${salesData.pendingTotal.toFixed(2)}</p>
                    </div>
                </div>
            </div>


            <div className="bg-white dark:bg-base-200 rounded-xl shadow-md w-full">
                <h3 className="text-xl font-semibold dark:text-base-content mb-4 text-center">Sales Overview</h3>

                <div className="w-full h-[300px] lg:h-[500px]  ">
                    {chartData.every(item => item.value === 0) ? (
                        <p className="text-center text-gray-500 pt-10">No sales data available yet.</p>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={chartData}
                                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}

                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend />
                                <Bar dataKey="value" fill="#00afb9" barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SellerHome;
