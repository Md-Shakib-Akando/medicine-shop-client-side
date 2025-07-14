import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LatestMedicine = () => {
    const [latestMedicine, setLatestMedicine] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/medicines/latest')
            .then(res => {
                setLatestMedicine(res.data);
            }).catch(error => {
                console.log(error.message);
            });
    }, []);

    return (
        <div className='max-w-11/12 mx-auto my-10'>
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


                            <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:cursor-pointer transition duration-500">
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
                                <button className='btn text-lg bg-[#00afb9] text-white w-full'>Add to Cart</button>
                            </div>
                        </div>




                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestMedicine;
