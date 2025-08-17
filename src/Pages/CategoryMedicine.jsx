
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { RxCross2, RxEyeOpen } from 'react-icons/rx';


import UseAuth from '../UseAuth';
import { handleSelect } from '../Hooks/Select';
import { ToastContainer } from 'react-toastify';
import useAxiosSecure from '../Hooks/UseAxiosSecure';

const CategoryMedicine = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const { user } = UseAuth();

    const [medicines, setMedicines] = useState([]);
    const [detailModalMedicine, setDetailModalMedicine] = useState(null);
    const [userRole, setUserRole] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => setUserRole(res.data.userRole))
                .catch(console.error);
        }
    }, [user, axiosSecure]);

    useEffect(() => {
        axiosSecure.get(`/medicines/category/${name}`)
            .then(res => {
                setMedicines(res.data);
            })
            .catch(err => console.error(err));
    }, [name, axiosSecure]);

    return (
        <div className="max-w-11/12 min-h-[calc(100vh-367px)] mx-auto p-4">
            <h1 className="text-3xl font-bold text-center my-6">Medicines in: {name}</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-[#00afb9] dark:bg-base-300 text-white">
                            <th className='text-lg p-5'>Image</th>
                            <th className='text-lg p-5'>Item Name</th>
                            <th className='text-lg p-5'>Generic Name</th>
                            <th className='text-lg p-5'>Category</th>
                            <th className='text-lg p-5'>Company</th>
                            <th className='text-lg p-5'>Price</th>
                            <th className='text-lg p-5 text-center'>Discount (%)</th>
                            <th className='text-lg p-5 text-center'>Mass Unit</th>
                            <th className="text-center text-lg p-5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map(med => (
                            <tr
                                key={med._id}
                                className="hover:bg-blue-100 dark:hover:bg-base-200 transition-colors duration-200"
                            >
                                <td>
                                    <div className="avatar">
                                        <div className="rounded-full w-12 h-12">
                                            <img
                                                src={med.image || 'https://via.placeholder.com/40'}
                                                alt={med.itemName}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td>{med.itemName}</td>
                                <td>{med.genericName || 'N/A'}</td>
                                <td>{med.category}</td>
                                <td>{med.company}</td>
                                <td>${med.price.toFixed(2)}</td>
                                <td className='text-center'>{med.discount || 0}%</td>
                                <td className='text-center'>{med.massUnit || 'N/A'}</td>
                                <td className="text-center">
                                    <div className="inline-flex space-x-2 justify-center items-center">
                                        <button
                                            onClick={() => {
                                                if (!user) {
                                                    navigate('/login');
                                                } else if (userRole === 'user') {
                                                    handleSelect(med, user, navigate, axiosSecure);
                                                }
                                            }}
                                            className={`btn text-lg text-white ${!user || userRole === 'user'
                                                ? 'bg-[#00afb9] hover:bg-[#009ca5]'
                                                : 'bg-gray-400 cursor-not-allowed'
                                                }`}
                                            disabled={userRole === 'admin' || userRole === 'seller'}
                                        >
                                            Select
                                        </button>

                                        <button
                                            className="btn btn-sm bg-blue-600 whitespace-nowrap px-4 py-[19px]"
                                            onClick={() => {
                                                if (!user) {
                                                    navigate('/login');
                                                } else {
                                                    setDetailModalMedicine(med);

                                                }
                                            }}
                                            title="View Details"
                                        >
                                            <RxEyeOpen size={24} className="text-white " />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {medicines.length === 0 && (
                    <p className="text-center py-10">No medicines found in this category.</p>
                )}


                {detailModalMedicine && (
                    <div className="fixed inset-0 bg-black/80 bg-opacity-70 flex justify-center items-center z-50 p-6">
                        <div className="bg-white dark:bg-base-300 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-10 relative">
                            <button
                                onClick={() => setDetailModalMedicine(null)}
                                className="absolute top-5 right-5 text-4xl font-extrabold text-gray-600 hover:text-gray-900 transition dark:text-base-content"
                                aria-label="Close modal"
                            >
                                <RxCross2 size={20} />
                            </button>

                            <div className="flex flex-col justify-center items-center md:space-x-12">

                                <div className=" mb-8 md:mb-0 flex justify-center items-center">
                                    <img
                                        src={detailModalMedicine.image || 'https://via.placeholder.com/400'}
                                        alt={detailModalMedicine.itemName}
                                        className="rounded-lg object-contain max-h-96 w-full shadow-lg"
                                    />
                                </div>


                                <div className="mt-5 flex flex-col">
                                    <h3 className="text-4xl font-semibold mb-6 text-gray-900 dark:text-base-content">{detailModalMedicine.itemName}</h3>

                                    <h4 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1 text-gray-800 dark:text-base-content">Medicine Information</h4>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 text-gray-700 font-medium mb-8 dark:text-base-content">
                                        <p><span className="text-gray-900 font-semibold dark:text-base-content">Generic Name:</span> {detailModalMedicine.genericName || '-'}</p>
                                        <p><span className="text-gray-900 font-semibold dark:text-base-content">Category:</span> {detailModalMedicine.category}</p>
                                        <p><span className="text-gray-900 font-semibold dark:text-base-content">Company:</span> {detailModalMedicine.company}</p>
                                        <p><span className="text-gray-900 font-semibold dark:text-base-content">Mass Unit:</span> {detailModalMedicine.massUnit}</p>
                                        <p className="text-gray-900 text-[17px] font-bold dark:text-base-content">
                                            Price : ${(detailModalMedicine.price - (detailModalMedicine.price * detailModalMedicine.discount / 100)).toFixed(2)}
                                            <span className="text-[15px] line-through text-gray-500 ml-1 dark:text-base-content">${detailModalMedicine.price}</span>
                                        </p>
                                        <p><span className="text-gray-900 font-semibold dark:text-base-content">Discount:</span> {detailModalMedicine.discount}%</p>
                                    </div>

                                    <h4 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1 text-gray-800 dark:text-base-content">Description</h4>
                                    <p className="text-gray-600 whitespace-pre-line leading-relaxed dark:text-base-content">
                                        {detailModalMedicine.description || 'No description available.'}
                                    </p>


                                </div>
                                <button
                                    onClick={() => {
                                        if (!user) {
                                            navigate('/login');
                                        } else if (userRole === 'user') {
                                            handleSelect(detailModalMedicine, user, navigate, axiosSecure);
                                        }
                                    }}
                                    className={`btn text-lg text-white ${!user || userRole === 'user'
                                        ? 'bg-[#00afb9] hover:bg-[#009ca5]'
                                        : 'bg-gray-400 cursor-not-allowed'
                                        }`}
                                    disabled={userRole === 'admin' || userRole === 'seller'}
                                >
                                    Select
                                </button>

                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer position="top-right" reverseOrder={false} />
        </div>
    );
};

export default CategoryMedicine;
