import React, { useEffect, useState } from 'react';

import UseAuth from '../../../UseAuth';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';

const PaymentManage = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        setLoading(true);
        axiosSecure.get('/payments')
            .then(res => {
                setPayments(res.data);
            })
            .catch(err => {
                console.error('Error fetching payments:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [user, axiosSecure]);

    const handleApprove = (id) => {
        axiosSecure.patch(`/payments/${id}`, { status: 'Approved' })
            .then(() => {
                setPayments(prev =>
                    prev.map(payment => payment._id === id ? { ...payment, status: 'Approved' } : payment)
                );
            })
            .catch(err => {
                console.error('Error approving payment:', err);
            });
    };

    return (
        <div className="max-w-11/12 mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6">Manage Payments</h2>

            {loading ? (
                <p>Loading payments...</p>
            ) : payments.length === 0 ? (
                <p className="text-gray-500">No payment records found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-[#00afb9] text-white">
                                <th className="p-4 border border-gray-300">Buyer Email</th>
                                <th className="p-4 border border-gray-300">Transaction ID</th>
                                <th className="p-4 border border-gray-300">Total Items</th>
                                <th className="p-4 border border-gray-300">Total Price</th>
                                <th className="p-4 border border-gray-300">Date</th>
                                <th className="p-4 border border-gray-300">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map(payment => (
                                <tr key={payment._id} className="hover:bg-gray-100 transition">
                                    <td className="p-4 border border-gray-300">{payment.email}</td>
                                    <td className="p-4 border border-gray-300">{payment.transactionId}</td>
                                    <td className="p-4 border border-gray-300 text-center">{payment.name?.length || 0}</td>
                                    <td className="p-4 border border-gray-300">${payment.totalprice}</td>
                                    <td className="p-4 border border-gray-300">
                                        {new Date(payment.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 border border-gray-300">
                                        {payment.status === 'Approved' ? (
                                            <span className="px-3 py-1 rounded bg-green-600 text-white font-semibold text-sm">
                                                Approved
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() => handleApprove(payment._id)}
                                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm font-semibold transition"
                                            >
                                                Approve
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentManage;
