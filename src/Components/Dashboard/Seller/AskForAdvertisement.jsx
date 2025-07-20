import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UseAuth from '../../../UseAuth';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { ReTitle } from 're-title';


const AskForAdvertisement = () => {
    const [modal, setModal] = useState(false);
    const [itemName, setItemName] = useState('');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const { user } = UseAuth();
    const [ads, setAds] = useState([]);
    const axiosSecure = useAxiosSecure();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!itemName || !description || !imageFile) {
            alert('Please fill out all fields.');
            return;
        }

        try {

            const formData = new FormData();
            formData.append('image', imageFile);

            const imgbbKey = import.meta.env.VITE_Image_Upload_Key;
            const imgbbRes = await axios.post(
                `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
                formData,
            );

            const imageUrl = imgbbRes.data.data.url;


            const adData = {
                name: itemName,
                description,
                image: imageUrl,
                sellerEmail: user?.email,
                status: 'pending',
                createdAt: new Date()
            };

            const res = await axiosSecure.post('/advertisements', adData);


            setAds(prev => [...prev, { ...adData, _id: res.data.insertedId }]);
            toast.success('Advertisement request submitted!');

            setModal(false);

        } catch (error) {
            console.error('Error submitting advertisement:', error);
            toast.error('Failed to submit advertisement!');
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/advertisements/${id}`)

                    .then(res => {
                        if (res.data.deletedCount > 0) {



                            Swal.fire(
                                'Deleted!',
                                'Your medicine has been deleted.',
                                'success'
                            );

                            setAds(prev => prev.filter(m => m._id !== id));

                        }
                    })
                    .catch(() => {
                        Swal.fire(
                            'Error!',
                            'Something went wrong while deleting.',
                            'error'
                        );
                    });
            }
        });
    };



    useEffect(() => {
        if (!user?.email) return;

        axiosSecure.get(`/advertisements/seller/${user.email}`)
            .then(res => setAds(res.data))
            .catch(console.error)

    }, [user?.email, user, axiosSecure]);

    return (
        <div>
            <button
                onClick={() => setModal(true)}
                className='bg-[#00afb9] text-white rounded-md py-2 px-4 my-3 hover:cursor-pointer'>
                Add Advertise
            </button>

            <div className="overflow-x-auto">
                <ReTitle title="Dashboard | Advertisement"></ReTitle>
                <table className="table w-full ">
                    <thead>
                        <tr className="bg-[#00afb9] text-white " >
                            <th className='text-lg p-5'>Image</th>
                            <th className='text-lg p-5'> Name</th>
                            <th className='text-lg p-5'>Description</th>
                            <th className='text-lg p-5'>Status</th>

                            <th className="text-center text-lg p-5">Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            ads.map(ad => (
                                <tr
                                    key={ad._id}
                                    className="hover:bg-blue-100 transition-colors duration-200"
                                >
                                    <td>
                                        <div className="avatar">
                                            <div className="rounded-full w-12 h-12">
                                                <img
                                                    src={ad.image || 'https://via.placeholder.com/40'}
                                                    alt={ad.itemName}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{ad.name}</td>
                                    <td>{ad.description}</td>
                                    <td>
                                        <span
                                            className={`px-2 py-1 rounded text-sm font-semibold ${ad.status?.toLowerCase() === 'approved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                        >
                                            {ad.status?.toLowerCase() === 'approved' ? 'Approved' : 'Pending'}

                                        </span>
                                    </td>




                                    <td className="text-center">
                                        <div className="inline-flex space-x-2  justify-center">


                                            <button onClick={() => handleDelete(ad._id)} className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 hover:cursor-pointer transition">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>





            </div>

            {modal && (
                <div className="fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <button
                            onClick={() => setModal(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold hover:cursor-pointer"
                        >
                            &times;
                        </button>

                        <h3 className="text-xl font-semibold mb-4">Add Banner</h3>

                        <form
                            className="space-y-4 max-h-[70vh] overflow-y-auto"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label className="block mb-1 font-medium">Item Name </label>
                                <input
                                    type="text"
                                    value={itemName}
                                    onChange={(e) => setItemName(e.target.value)}
                                    placeholder="Item name"
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Short Description</label>
                                <textarea
                                    placeholder="Short description"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Upload Medicine Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImageFile(e.target.files[0])}
                                    className="w-full border rounded px-3 py-2"
                                    required
                                />
                            </div>

                            <div className="flex justify-end space-x-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 hover:cursor-pointer rounded hover:bg-gray-600"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className='bg-[#00afb9] text-white hover:cursor-pointer rounded-md py-2 px-4'
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default AskForAdvertisement;
