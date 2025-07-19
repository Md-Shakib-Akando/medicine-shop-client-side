import React, { useEffect, useState } from 'react';

import { FaDollarSign, FaClock, FaShoppingCart, FaReceipt } from 'react-icons/fa';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

import useAxiosSecure from '../../../Hooks/UseAxiosSecure';

const AdminHome = () => {

    const [salesData, setSalesData] = useState({
        totalRevenue: 0,
        totalPendingAmount: 0,

        totalPaid: 0,
        totalPaymentsCount: 0,
    });
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetchSalesData();
    }, []);

    const fetchSalesData = async () => {
        try {
            const res = await axiosSecure.get('/payments');
            const payments = res.data;

            if (!Array.isArray(payments)) {
                throw new Error("Payments data is not an array");
            }

            const totalRevenue = payments.reduce((sum, p) => sum + (Number(p.totalprice) || 0), 0);

            const totalPendingAmount = payments
                .filter(p => p.status?.toLowerCase() === 'pending')
                .reduce((sum, p) => sum + (Number(p.totalprice) || 0), 0);

            const totalPaid = payments
                .filter(p => {
                    const status = p.status?.toLowerCase();
                    return status === 'approved' || status === 'paid';
                })
                .reduce((sum, p) => sum + (Number(p.totalprice) || 0), 0);

            const totalPaymentsCount = payments.length;

            setSalesData({
                totalRevenue,
                totalPendingAmount,
                totalPaid,
                totalPaymentsCount
            });
        } catch (err) {
            console.error('Error fetching sales data:', err);
        }
    };




    const chartData = [
        { name: 'Total sales Revenue', value: salesData.totalRevenue },
        { name: 'Total Paid', value: salesData.totalPaid },
        { name: 'Total Pending Amount', value: salesData.totalPendingAmount },

        { name: 'Total Payments', value: salesData.totalPaymentsCount },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">Admin Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">


                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-[#00afb9]">
                    <div className="bg-[#00afb9] text-white p-3 rounded-full">
                        <FaDollarSign size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 text-sm">Total sales Revenue</h4>
                        <p className="text-2xl font-bold text-gray-800">${salesData.totalRevenue.toFixed(2)}</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-blue-500">
                    <div className="bg-blue-500 text-white p-3 rounded-full">
                        <FaDollarSign size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 text-sm">Total Paid</h4>
                        <p className="text-2xl font-bold text-gray-800">${salesData.totalPaid.toFixed(2)}</p>
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





                <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-4 border-l-4 border-green-500">
                    <div className="bg-green-500 text-white p-3 rounded-full">
                        <FaReceipt size={24} />
                    </div>
                    <div>
                        <h4 className="text-gray-600 text-sm">Total Payments</h4>
                        <p className="text-2xl font-bold text-gray-800">{salesData.totalPaymentsCount}</p>
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
