import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import UseAuth from '../UseAuth';
import { useNavigate } from 'react-router';

const LatestMedicine = () => {
    const { user } = UseAuth();
    const [latestMedicine, setLatestMedicine] = useState([]);
    const [detailModalMedicine, setDetailModalMedicine] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/medicines/latest')
            .then(res => {
                setLatestMedicine(res.data);
            }).catch(error => {
                console.log(error.message);
            });
    }, []);

    return (
        <div className='max-w-11/12 mx-auto my-15'>
            <h1 className='text-center font-bold text-3xl md:text-5xl my-10'>Latest Medicine</h1>
            <div className='grid grid-cols-1 md:grid-cols-2  xl:grid-cols-4 gap-6'>
                {latestMedicine.map(med => (
                    <div
                        key={med._id}
                        className="card bg-base-100 shadow-sm w-full h-full group relative overflow-hidden transition duration-500 "
                    >
                        <figure className='relative p-5 '>
                            <img
                                src={med.image}
                                className='h-[250px] w-full object-cover rounded-md transition duration-500 group-hover:brightness-40 '
                                alt="latestMedicine"
                            />
                            <span className="absolute top-2 left-2 bg-[#00afb9] text-white px-2 py-1 text-xs rounded">New</span>


                            <button
                                onClick={() => {
                                    if (!user) {
                                        navigate('/login');
                                    } else {
                                        setDetailModalMedicine(med);
                                    }
                                }}
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:cursor-pointer transition duration-500">
                                <span className='bg-[#00afb9] text-white px-4 py-2 rounded shadow-md'>View</span>
                            </button>
                        </figure>

                        <div className="card-body -mt-7 transition-all duration-500">


                            <div className='flex justify-between items-start gap-2'>
                                <h2 className="card-title font-bold truncate w-2/3">{med.itemName}</h2>
                                <div className='text-right w-1/3'>
                                    <p className="text-gray-900 text-[17px] font-bold">
                                        ${(med.price - (med.price * med.discount / 100)).toFixed(2)}
                                        <span className="text-[15px] line-through text-gray-500 ml-1">${med.price}</span>
                                    </p>
                                </div>
                            </div>
                            <p className='font-medium text-[15px] truncate'>Company: <span className='font-normal'>{med.company}</span></p>
                            <p className='font-medium text-[15px]'>Category: <span className='font-normal'>{med.category}</span></p>

                            <div className="mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                                <button className='btn text-lg bg-[#00afb9] text-white w-full'>Select</button>
                            </div>
                        </div>




                    </div>
                ))}

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
                                <button
                                    className="btn btn-sm bg-[#00afb9] text-white  whitespace-nowrap"
                                >
                                    Select
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestMedicine;
