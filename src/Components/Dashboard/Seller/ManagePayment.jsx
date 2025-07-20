import React, { useEffect, useState } from 'react';
import UseAuth from '../../../UseAuth';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { ReTitle } from 're-title';

const ManagePayment = () => {
    const { user } = UseAuth();
    const [payments, setPayments] = useState([]);
    const [sellerPayments, setSellerPayments] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const axiosSecure = useAxiosSecure();

    const itemsPerPage = 15;

    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get('/payments')
            .then(res => {
                setPayments(res.data);
            })
            .catch(err => console.error(err));
    }, [user, axiosSecure]);

    useEffect(() => {
        if (payments.length === 0 || !user?.email) return;

        const filtered = payments.filter(payment =>
            payment.sellerEmail?.includes(user.email)
        ).map(payment => {
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

    const totalPages = Math.ceil(sellerPayments.length / itemsPerPage);

    const paginatedPayments = sellerPayments.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    return (
        <div className="max-w-11/12 mx-auto p-6">
            <ReTitle title="Dashboard | Seller-Payment"></ReTitle>
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
                            {paginatedPayments.map(payment => (
                                <tr key={payment._id} className="hover:bg-gray-100 transition">
                                    <td className="p-4 border border-gray-300">{payment.email}</td>
                                    <td className="p-4 border border-gray-300">{payment.transactionId}</td>
                                    <td className="p-4 border border-gray-300 max-w-xs truncate" title={payment.name?.join(', ')}>
                                        {payment.name?.length > 0 ? payment.name.join(', ') : 'No items'}
                                    </td>
                                    <td className="p-4 border border-gray-300">
                                        ${payment.totalprice || '0.00'}
                                    </td>
                                    <td className="p-4 border border-gray-300">
                                        {new Date(payment.date).toLocaleDateString()}
                                    </td>
                                    <td className={`p-4 border border-gray-300 font-semibold text-white text-center ${payment.status === 'Approved' ? 'bg-green-600' : 'bg-yellow-500'}`}>
                                        {payment.status}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {totalPages > 0 && (
                        <div className="flex justify-center mt-6 space-x-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-[#00afb9] text-white'}`}
                            >
                                Prev
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-[#00afb9] text-white' : 'bg-gray-200'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-[#00afb9] text-white'}`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ManagePayment;
