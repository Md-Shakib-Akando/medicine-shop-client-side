import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaDollarSign, FaClock, FaMoneyBillWave } from 'react-icons/fa';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import UseAuth from '../../../UseAuth';

const SellerHome = () => {
    const { user } = UseAuth();

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
            const res = await axios.get('http://localhost:5000/payments');
            const payments = res.data;

            const sellerPayments = payments.filter(p =>
                Array.isArray(p.sellerEmail) &&
                p.sellerEmail.some(email => email.toLowerCase() === user.email.toLowerCase())
            );

            const totalRevenue = sellerPayments.reduce((sum, p) => sum + p.price, 0);

            const paidTotal = sellerPayments
                .filter(p => typeof p.status === 'string' && p.status.toLowerCase() === 'approved')
                .reduce((sum, p) => sum + p.price, 0);

            const pendingTotal = sellerPayments
                .filter(p => typeof p.status === 'string' && p.status.toLowerCase() === 'pending')
                .reduce((sum, p) => sum + p.price, 0);

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

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Seller Dashboard</h2>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

                {/* Total Revenue */}
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-blue-500">
                    <div className="bg-blue-500 text-white p-3 rounded-full">
                        <FaDollarSign size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 text-sm">Total Sales Revenue</h4>
                        <p className="text-2xl font-bold text-gray-800">${salesData.totalRevenue.toFixed(2)}</p>
                    </div>
                </div>

                {/* Paid Total */}
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-green-500">
                    <div className="bg-green-500 text-white p-3 rounded-full">
                        <FaMoneyBillWave size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 text-sm">Total Paid</h4>
                        <p className="text-2xl font-bold text-gray-800">${salesData.paidTotal.toFixed(2)}</p>
                    </div>
                </div>

                {/* Pending Total */}
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-yellow-500">
                    <div className="bg-yellow-500 text-white p-3 rounded-full">
                        <FaClock size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 text-sm">Total Pending</h4>
                        <p className="text-2xl font-bold text-gray-800">${salesData.pendingTotal.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-xl shadow-md w-full">
                <h3 className="text-xl font-semibold mb-4 text-center">Sales Overview</h3>

                <div className="w-full h-[300px] lg:h-[500px]">
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
                                <Tooltip />
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
