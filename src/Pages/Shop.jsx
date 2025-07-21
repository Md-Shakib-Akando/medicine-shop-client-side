import React, { useEffect, useState } from 'react';
import { RxCross2, RxEyeOpen } from "react-icons/rx";
import { useNavigate } from 'react-router';
import UseAuth from '../UseAuth';
import { handleSelect } from '../Hooks/Select';
import useAxiosSecure from '../Hooks/UseAxiosSecure';
import { ToastContainer } from 'react-toastify';

import LoadingSpinner from '../Components/LoadingSpinner';
import { ReTitle } from 're-title';


const Shop = () => {
    const { user } = UseAuth();
    const [medicines, setMedicines] = useState([]);
    const [sortedMedicines, setSortedMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);


    const [detailModalMedicine, setDetailModalMedicine] = useState(null);
    const [userRole, setUserRole] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;

    const totalPages = Math.ceil(sortedMedicines.length / itemsPerPage);
    const paginatedMedicines = sortedMedicines.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );


    useEffect(() => {
        axiosSecure.get('/medicines',)
            .then(res => {
                setMedicines(res.data);
                setSortedMedicines(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error(err)
                setLoading(false);
            });
    }, [axiosSecure]);

    useEffect(() => {
        let filtered = medicines;


        if (searchTerm.trim() !== '') {
            const lowerSearch = searchTerm.toLowerCase();
            filtered = filtered.filter(med =>
                (med.itemName && med.itemName.toLowerCase().includes(lowerSearch)) ||
                (med.genericName && med.genericName.toLowerCase().includes(lowerSearch)) ||
                (med.company && med.company.toLowerCase().includes(lowerSearch)) ||
                (med.category && med.category.toLowerCase().includes(lowerSearch))
            );
        }


        if (sortOrder === 'asc') {
            filtered = filtered.slice().sort((a, b) => a.price - b.price);
        } else if (sortOrder === 'desc') {
            filtered = filtered.slice().sort((a, b) => b.price - a.price);
        }

        setSortedMedicines(filtered);
        setCurrentPage(1);
    }, [medicines, searchTerm, sortOrder]);
    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => setUserRole(res.data.userRole))
                .catch(console.error);
        }
    }, [user, axiosSecure]);

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }


    return (
        <div className="max-w-11/12 min-h-[calc(100vh-367px)] mx-auto p-6">
            <ReTitle title="Medicine Shop | Shop Page"></ReTitle>
            <div className="mb-4 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0">
                <p className="mb-4 font-semibold text-lg text-gray-700">
                    Total Medicines: {medicines.length}
                </p>
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <label className="mr-2 font-medium">Search:</label>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={e => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search item, generic name, company, category"
                        className="border rounded px-3 py-1 w-full sm:w-auto"
                    />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <label className="mr-2 font-medium">Sort by Price:</label>
                    <select
                        value={sortOrder}
                        onChange={e => {
                            setSortOrder(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border rounded px-3 py-1 w-full sm:w-auto"
                    >
                        <option value="">All</option>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>
            </div>



            <div className="overflow-x-auto">
                <table className="table w-full ">
                    <thead>
                        <tr className="bg-[#00afb9] text-white " >
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
                        {paginatedMedicines.map(med => (
                            <tr
                                key={med._id}
                                className="hover:bg-blue-100 transition-colors duration-200"
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
                                <td>{med.genericName}</td>
                                <td>{med.category}</td>
                                <td>{med.company}</td>
                                <td>${med.price.toFixed(2)}</td>
                                <td className='text-center'>{med.discount}%</td>
                                <td className='text-center'>{med.massUnit}</td>
                                <td className="text-center">
                                    <div className="inline-flex space-x-2  justify-center">
                                        <div>
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

                                        </div>
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

                {totalPages > 0 && (
                    <div className="flex justify-center mt-6 space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className={`px-3 py-1 rounded ${currentPage === 1 ? 'bg-gray-300  hover:cursor-pointer' : 'bg-[#00afb9] text-white  hover:cursor-pointer'}`}
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentPage(index + 1)}
                                className={`px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-[#00afb9] text-white  hover:cursor-pointer' : 'bg-gray-200  hover:cursor-pointer'}`}
                            >
                                {index + 1}
                            </button>
                        ))}

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className={`px-3 py-1 rounded ${currentPage === totalPages ? 'bg-gray-300  hover:cursor-pointer' : 'bg-[#00afb9] text-white  hover:cursor-pointer'}`}
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>

            {detailModalMedicine && (
                <div className="fixed inset-0 bg-black/80 bg-opacity-70 flex justify-center items-center z-50 p-6">
                    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-10 relative">
                        <button
                            onClick={() => setDetailModalMedicine(null)}
                            className="absolute top-5 right-5 text-4xl font-extrabold text-gray-600 hover:text-gray-900 transition"
                            aria-label="Close modal"
                        >
                            <RxCross2 />
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
                                <h3 className="text-4xl font-semibold mb-6 text-gray-900">{detailModalMedicine.itemName}</h3>

                                <h4 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1 text-gray-800">Medicine Information</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 text-gray-700 font-medium mb-8">
                                    <p><span className="text-gray-900 font-semibold">Generic Name:</span> {detailModalMedicine.genericName || '-'}</p>
                                    <p><span className="text-gray-900 font-semibold">Category:</span> {detailModalMedicine.category}</p>
                                    <p><span className="text-gray-900 font-semibold">Company:</span> {detailModalMedicine.company}</p>
                                    <p><span className="text-gray-900 font-semibold">Mass Unit:</span> {detailModalMedicine.massUnit}</p>
                                    <p className="text-gray-900 text-[17px] font-bold">
                                        Price : ${(detailModalMedicine.price - (detailModalMedicine.price * detailModalMedicine.discount / 100)).toFixed(2)}
                                        <span className="text-[15px] line-through text-gray-500 ml-1">${detailModalMedicine.price}</span>
                                    </p>
                                    <p><span className="text-gray-900 font-semibold">Discount:</span> {detailModalMedicine.discount}%</p>
                                </div>

                                <h4 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1 text-gray-800">Description</h4>
                                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                    {detailModalMedicine.description || 'No description available.'}
                                </p>


                            </div>
                            <div>
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
                </div>
            )}

            <ToastContainer position="top-right" reverseOrder={false} />
        </div>
    );
};

export default Shop;
