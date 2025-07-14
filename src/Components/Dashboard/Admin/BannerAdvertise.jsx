import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const BannerAdvertise = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/advertisements')
            .then(res => setAds(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleToggle = async (id, currentStatus) => {
        try {
            await axios.patch(`http://localhost:5000/advertisements/${id}`, {
                status: !currentStatus
            });

            toast.success(` ${!currentStatus ? 'Approved' : 'Removed from'} Slider`);

            setAds(prev =>
                prev.map(ad =>
                    ad._id === id ? { ...ad, status: !currentStatus } : ad
                )
            );
        } catch (error) {
            console.log(error.message)
            toast.error('Failed to update advertisement status');
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Advertisements</h2>

            <div className="overflow-x-auto">
                <table className="table w-full ">
                    <thead>
                        <tr className="bg-[#00afb9] text-white">
                            <th className="p-4 text-[16px]">Image</th>
                            <th className="p-4 text-[16px]">Name</th>
                            <th className="p-4 text-[16px]">Description</th>
                            <th className="p-4 text-[16px]">Seller Email</th>
                            <th className="p-4 text-[16px] text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ads.map(ad => (
                            <tr key={ad._id} className="hover:bg-gray-100">
                                <td className="p-3">
                                    <img src={ad.image} alt={ad.name} className="w-12 h-12 rounded-full" />
                                </td>
                                <td className="p-3">{ad.name}</td>
                                <td className="p-3">{ad.description}</td>
                                <td className="p-3">{ad.sellerEmail}</td>
                                <td className="p-3 text-center">
                                    <button
                                        onClick={() => handleToggle(ad._id, ad.status)}
                                        className={`px-3 py-1 rounded text-white ${ad.status ? 'bg-red-500' : 'bg-green-500'
                                            }`}
                                    >
                                        {ad.status ? 'Remove from Slide' : 'Add to Slide'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <ToastContainer />
        </div>
    );
};

export default BannerAdvertise;
