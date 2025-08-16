import React, { useEffect, useState } from 'react';
import UseAuth from '../../../UseAuth';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { ReTitle } from 're-title';



const PaymentHistory = () => {
    const { user } = UseAuth();
    const [payments, setPayments] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/payments/history/${user.email}`)
                .then(res => setPayments(res.data))
                .catch(err => console.error('Error fetching payments:', err));
        }
    }, [user, axiosSecure]);

    return (
        <div className="max-w-11/12 mx-auto p-6">
            <ReTitle title="Dashboard | User"></ReTitle>
            <h2 className="text-3xl font-semibold mb-6">Payment History</h2>

            {payments.length === 0 ? (
                <p className="text-gray-500">No payment history found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-[#00afb9] dark:bg-base-300 text-white">
                                <th className="text-lg p-5">#</th>
                                <th className="text-lg p-5">Transaction ID</th>
                                <th className="text-lg p-5">Total Item</th>
                                <th className="text-lg p-5">Date</th>
                                <th className="text-lg p-5">Amount</th>
                                <th className="text-lg p-5">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id} className="hover:bg-gray-900 transition">
                                    <td className="p-5">{index + 1}</td>

                                    <td className="p-5">{payment.transactionId}</td>
                                    <td className="p-5 ">{payment.name?.length || 0}</td>
                                    <td className="p-5">
                                        {new Date(payment.date).toLocaleDateString()}
                                    </td>
                                    <td className="p-5">${payment.totalprice}</td>
                                    <td className="p-5">
                                        <span
                                            className={`px-3 py-1 rounded text-white font-semibold text-sm ${payment.status.toLowerCase() === 'approved'
                                                ? 'bg-green-500'
                                                : payment.status.toLowerCase() === 'pending'
                                                    ? 'bg-yellow-500'
                                                    : 'bg-gray-500'
                                                }`}
                                        >
                                            {payment.status.toLowerCase() === 'approved' ? 'Paid' : payment.status}
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
