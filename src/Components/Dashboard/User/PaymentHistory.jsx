import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UseAuth from '../../../UseAuth';


const PaymentHistory = () => {
    const { user } = UseAuth();
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/payments/history/${user.email}`)
                .then(res => setPayments(res.data))
                .catch(err => console.error('Error fetching payments:', err));
        }
    }, [user]);

    return (
        <div className="max-w-11/12 mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6">Payment History</h2>

            {payments.length === 0 ? (
                <p className="text-gray-500">No payment history found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-[#00afb9] text-white">
                                <th className="text-lg p-5">#</th>
                                <th className="text-lg p-5">Transaction ID</th>
                                <th className="text-lg p-5">Date</th>
                                <th className="text-lg p-5">Amount</th>
                                <th className="text-lg p-5">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-blue-100 transition">
                                    <td className="p-5">{index + 1}</td>
                                    <td className="p-5">{payment.transactionId}</td>
                                    <td className="p-5">
                                        {new Date(payment.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-5">${payment.price}</td>
                                    <td className="p-5">
                                        <span className={`px-3 py-1 rounded text-white font-semibold text-sm ${payment.status === 'paid' ? 'bg-green-500' : 'bg-yellow-500'}`}>
                                            {payment.status}
                                        </span>
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

export default PaymentHistory;
