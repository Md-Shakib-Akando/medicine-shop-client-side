import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UseAuth from '../../../UseAuth';

const ManagePayment = () => {
    const { user } = UseAuth();
    const [payments, setPayments] = useState([]);
    const [sellerPayments, setSellerPayments] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        axios.get('http://localhost:5000/payments')
            .then(res => {
                setPayments(res.data);
            })
            .catch(err => console.error(err));
    }, [user]);

    useEffect(() => {
        if (payments.length === 0 || !user?.email) return;

        // seller এর payment filter করো
        const filtered = payments.filter(payment =>
            payment.sellerEmail?.includes(user.email)
        ).map(payment => {
            // যেই index গুলো sellerEmail এর সাথে মেলে, শুধু সেই আইটেমগুলো filter করো
            const filteredIndexes = payment.sellerEmail
                .map((email, i) => email === user.email ? i : -1)
                .filter(i => i !== -1);

            return {
                ...payment,
                name: filteredIndexes.map(i => payment.name[i]),
                image: filteredIndexes.map(i => payment.image[i]),
                cartIds: filteredIndexes.map(i => payment.cartIds[i]),
                menuItemIds: filteredIndexes.map(i => payment.menuItemIds[i]),
            };
        });

        setSellerPayments(filtered);
    }, [payments, user]);

    return (
        <div className="max-w-11/12 mx-auto p-6">
            <h2 className="text-3xl font-semibold mb-6">Seller Payment History</h2>

            {sellerPayments.length === 0 ? (
                <p className="text-gray-500">No payment history found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-[#00afb9] text-white">
                                <th className="p-4 border border-gray-300">Buyer Email</th>
                                <th className="p-4 border border-gray-300">Transaction ID</th>
                                <th className="p-4 border border-gray-300">Items</th>
                                <th className="p-4 border border-gray-300">Total Price</th>
                                <th className="p-4 border border-gray-300">Date</th>
                                <th className="p-4 border border-gray-300">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellerPayments.map(payment => (
                                <tr key={payment._id} className="hover:bg-gray-100 transition">
                                    <td className="p-4 border border-gray-300">{payment.email}</td>
                                    <td className="p-4 border border-gray-300">{payment.transactionId}</td>
                                    <td className="p-4 border border-gray-300 max-w-xs truncate" title={payment.name?.join(', ')}>
                                        {payment.name?.length > 0 ? payment.name.join(', ') : 'No items'}
                                    </td>
                                    <td className="p-4 border border-gray-300">${payment.price}</td>
                                    <td className="p-4 border border-gray-300">{new Date(payment.date).toLocaleDateString()}</td>
                                    <td className={`p-4 border border-gray-300 font-semibold text-white text-center ${payment.status === 'Approved' ? 'bg-green-600' : 'bg-yellow-500'}`}>
                                        {payment.status}
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

export default ManagePayment;
