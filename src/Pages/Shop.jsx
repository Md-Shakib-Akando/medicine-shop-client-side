import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RxCross2 } from "react-icons/rx";

const Shop = () => {
    const [medicines, setMedicines] = useState([]);
    const [sortedMedicines, setSortedMedicines] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [detailModalMedicine, setDetailModalMedicine] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/medicines')
            .then(res => {
                setMedicines(res.data);
                setSortedMedicines(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        if (!selectedCategory) {
            setSortedMedicines(medicines);
        } else {
            const filtered = medicines.filter(med => med.category === selectedCategory);
            setSortedMedicines(filtered);
        }
    }, [selectedCategory, medicines]);

    return (
        <div className="max-w-11/12 min-h-[calc(100vh-367px)] mx-auto p-6">
            <div className="mb-4 flex justify-end">
                <label className="mr-2 font-medium">Sort by Category:</label>
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="border rounded px-3 py-1"
                >
                    <option value="">All</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                </select>
            </div>

            <div className=" ">
                <table className="table w-full ">
                    <thead>
                        <tr className="bg-[#00afb9] text-white " >
                            <th className='text-lg p-5'>Image</th>
                            <th className='text-lg p-5'>Item Name</th>
                            <th className='text-lg p-5'>Category</th>
                            <th className='text-lg p-5'>Price</th>
                            <th className='text-lg p-5 text-center'>Discount (%)</th>
                            <th className='text-lg p-5 text-center'>Mass Unit</th>
                            <th className="text-center text-lg p-5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedMedicines.map(med => (
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
                                <td>{med.category}</td>
                                <td>${med.price.toFixed(2)}</td>
                                <td className='text-center'>{med.discount}%</td>
                                <td className='text-center'>{med.massUnit}</td>
                                <td className="text-center">
                                    <div className="inline-flex space-x-2 flex-wrap justify-center">
                                        <button
                                            className="btn btn-sm btn-success whitespace-nowrap"
                                        >
                                            Select
                                        </button>
                                        <button
                                            className="btn btn-sm btn-primary whitespace-nowrap"
                                            onClick={() => setDetailModalMedicine(med)}
                                            title="View Details"
                                        >
                                            &#128065;
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
                                    <p><span className="text-gray-900 font-semibold">Price:</span> ${detailModalMedicine.price.toFixed(2)}</p>
                                    <p><span className="text-gray-900 font-semibold">Discount:</span> {detailModalMedicine.discount}%</p>
                                </div>

                                <h4 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1 text-gray-800">Description</h4>
                                <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                    {detailModalMedicine.description || 'No description available.'}
                                </p>


                            </div>
                            <button
                                className="btn btn-sm btn-success whitespace-nowrap"
                            >
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default Shop;
