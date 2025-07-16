import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaDollarSign, FaClock, FaShoppingCart, FaReceipt } from 'react-icons/fa';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const AdminHome = () => {
    const [salesData, setSalesData] = useState({
        totalRevenue: 0,
        totalPendingAmount: 0,
        pendingOrdersCount: 0,
        totalOrdersCount: 0,
    });

    useEffect(() => {
        fetchSalesData();
    }, []);

    const fetchSalesData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/payments');
            const payments = res.data;

            const totalRevenue = payments.reduce((sum, p) => sum + p.price, 0);

            const totalPendingAmount = payments
                .filter(p => p.status?.toLowerCase() === 'pending')
                .reduce((sum, p) => sum + p.price, 0);

            const pendingOrdersCount = payments.filter(p => p.status?.toLowerCase() === 'pending').length;

            const totalOrdersCount = payments.length;

            setSalesData({
                totalRevenue,
                totalPendingAmount,
                pendingOrdersCount,
                totalOrdersCount,
            });
        } catch (err) {
            console.error('Error fetching sales data:', err);
        }
    };


    const chartData = [
        { name: 'Total Revenue', value: salesData.totalRevenue },
        { name: 'Total Pending Amount', value: salesData.totalPendingAmount },
        { name: 'Pending Orders', value: salesData.pendingOrdersCount },
        { name: 'Total Orders', value: salesData.totalOrdersCount },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">


                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-[#00afb9]">
                    <div className="bg-[#00afb9] text-white p-3 rounded-full">
                        <FaDollarSign size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 text-sm">Total Revenue</h4>
                        <p className="text-2xl font-bold text-gray-800">${salesData.totalRevenue.toFixed(2)}</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-yellow-500">
                    <div className="bg-yellow-500 text-white p-3 rounded-full">
                        <FaClock size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 text-sm">Total Pending Amount</h4>
                        <p className="text-2xl font-bold text-gray-800">${salesData.totalPendingAmount.toFixed(2)}</p>
                    </div>
                </div>


                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-red-500">
                    <div className="bg-red-500 text-white p-3 rounded-full">
                        <FaShoppingCart size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 text-sm">Pending Orders</h4>
                        <p className="text-2xl font-bold text-gray-800">{salesData.pendingOrdersCount}</p>
                    </div>
                </div>


                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-green-500">
                    <div className="bg-green-500 text-white p-3 rounded-full">
                        <FaReceipt size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 text-sm">Total Orders</h4>
                        <p className="text-2xl font-bold text-gray-800">{salesData.totalOrdersCount}</p>
                    </div>
                </div>
            </div>


            <div className="bg-white rounded-xl shadow-md w-full">
                <h3 className="text-xl font-semibold mb-4 text-center">Sales Overview</h3>


                <div className="w-full h-[300px] lg:h-[500px]">
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
                </div>
            </div>

        </div>
    );
};

export default AdminHome;
