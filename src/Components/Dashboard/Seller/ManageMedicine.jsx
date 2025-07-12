import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import UseAuth from '../../../UseAuth';
import Swal from 'sweetalert2';
import { RxCross2 } from 'react-icons/rx';

const ManageMedicine = () => {
    const { user } = UseAuth();

    const [showModal, setShowModal] = useState(false);
    const [medicinePhoto, setMedicinePhoto] = useState('')
    const [loading, setLoading] = useState(false);
    const [medicines, setMedicines] = useState([]);
    const [updateMedicine, setUpdateMedicine] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false)
    const [updateMedicinePhoto, setUpdateMedicinePhoto] = useState('');
    const [detailModalMedicine, setDetailModalMedicine] = useState(null);



    const {
        register,
        handleSubmit,

    } = useForm();

    const handleUploadPhoto = async (e) => {
        setLoading(true);
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_Key}`;

        try {
            const res = await axios.post(imageUrl, formData);
            setMedicinePhoto(res.data.data.url);
        } catch (err) {
            console.error("Image upload failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const addMedicine = async (data) => {
        try {


            const medicineData = {
                itemName: data.itemName,
                genericName: data.genericName,
                description: data.description,
                image: medicinePhoto,
                category: data.category,
                company: data.company,
                massUnit: data.massUnit,
                price: parseFloat(data.price),
                discount: parseFloat(data.discount || 0),
                userEmail: user.email
            };

            const res = await axios.post('http://localhost:5000/medicines', medicineData);
            if (res.data.insertedId) {
                toast.success('Medicine Added Successful');

                setMedicines(prev => [...prev, medicineData]);
                setShowModal(false);
            }
        } catch (err) {
            console.error(err);

            toast.success('Failed to add medicine');
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
                axios.delete(`http://localhost:5000/medicines/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {



                            Swal.fire(
                                'Deleted!',
                                'Your medicine has been deleted.',
                                'success'
                            );

                            setMedicines(prev => prev.filter(m => m._id !== id));
                            setShowModal(false);
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

    const handleUpdate = (data) => {
        const imageToUse = updateMedicinePhoto || updateMedicine.image;


        const updatedData = {
            ...updateMedicine,
            itemName: data.itemName,
            genericName: data.genericName,
            description: data.description,
            category: data.category,
            company: data.company,
            massUnit: data.massUnit,
            price: parseFloat(data.price),
            discount: parseFloat(data.discount || 0),
            image: imageToUse
        };

        axios.put(`http://localhost:5000/medicines/${updateMedicine._id}`, updatedData)
            .then((res) => {
                if (res.data.modifiedCount > 0) {
                    toast.success('Medicine updated successfully');
                    setMedicines((prev) =>
                        prev.map((m) =>
                            m._id === updateMedicine._id ? { ...m, ...updatedData } : m
                        )
                    );

                    setShowUpdateModal(false);

                } else {
                    toast.warn('No changes detected.');
                }
            })
            .catch((err) => {
                toast.error('Update failed');
                console.error(err);
            });
    }


    const handleUploadPhotoUpdate = async (e) => {
        setLoading(true);
        const image = e.target.files[0];
        const formData = new FormData();
        formData.append('image', image);
        const imageUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_Key}`;

        try {
            const res = await axios.post(imageUrl, formData);
            setUpdateMedicinePhoto(res.data.data.url);
        } catch (err) {
            console.error("Image upload failed:", err);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (user.email) {
            axios.get(`http://localhost:5000/medicines?email=${user.email}`)
                .then(res => {
                    setMedicines(res.data)
                }).catch(error => {
                    console.log(error);
                })
        }
    }, [user.email])

    return (
        <div className=" mx-auto p-6">
            <h2 className="text-3xl text-[#00afb9] text-center font-bold mb-6">Manage Medicines</h2>

            <button
                onClick={() => setShowModal(true)}
                className='bg-[#00afb9]  text-white rounded-md py-2 px-4 hover:cursor-pointer mb-3'
            >
                Add Medicine
            </button>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
                    <thead className="bg-gray-100 ">
                        <tr >
                            <th className="px-4 py-3 border border-gray-300">Image</th>
                            <th className="px-4 py-3 border border-gray-300">Item Name</th>
                            <th className="px-4 py-3 border border-gray-300">Generic Name</th>
                            <th className="px-4 py-3 border border-gray-300">Category</th>

                            <th className="px-4 py-3 border border-gray-300">Mass Unit</th>
                            <th className="px-4 py-3 border border-gray-300">Price</th>
                            <th className="px-4 py-3 border border-gray-300">Discount (%)</th>
                            <th className="px-4 py-3 border border-gray-300">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines.map(medicine => (
                                <tr
                                    key={medicine._id}
                                    className="hover:bg-blue-100 cursor-pointer transition-colors"
                                >
                                    <td className="px-4 py-2 border border-gray-300">
                                        <img
                                            src={medicine.image || undefined}
                                            alt='medicineImage'
                                            className="w-12 h-12 object-cover rounded-full"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border border-gray-300">{medicine.itemName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{medicine.genericName}</td>
                                    <td className="px-4 py-2 border border-gray-300">{medicine.category}</td>

                                    <td className="px-4 text-center py-2 border border-gray-300">{medicine.massUnit}</td>
                                    <td className="px-4 py-2 text-center border border-gray-300">${medicine.price}</td>
                                    <td className="px-4 text-center py-2 border border-gray-300">{medicine.discount}%</td>
                                    <td className="px-4 py-2 text-center space-x-5 border border-gray-300">

                                        <button
                                            onClick={() => setDetailModalMedicine(medicine)}
                                            className="px-2 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 hover:cursor-pointer  transition">
                                            View
                                        </button>
                                        <button onClick={() => {
                                            setUpdateMedicine(medicine)
                                            setShowUpdateModal(true)
                                        }
                                        } className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 hover:cursor-pointer transition">
                                            Update
                                        </button>
                                        <button onClick={() => handleDelete(medicine._id)} className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 hover:cursor-pointer transition">
                                            Delete
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>


            {
                showModal && (
                    <div className="fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                            <button
                                onClick={() => setShowModal(false)}
                                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl hover:cursor-pointer  font-bold"
                            >
                                &times;
                            </button>

                            <h3 className="text-xl font-semibold mb-4">Add Medicine</h3>

                            <form onSubmit={handleSubmit(addMedicine)} className="space-y-4 max-h-[70vh] overflow-y-auto">
                                <div>
                                    <label className="block mb-1 font-medium">Item Name *</label>
                                    <input
                                        type="text"
                                        placeholder="Item name"
                                        {...register('itemName', { required: true })}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Generic Name</label>
                                    <input
                                        type="text"
                                        placeholder="Generic name"
                                        {...register('genericName', { required: true })}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Short Description</label>
                                    <textarea
                                        placeholder="Short description"
                                        rows={3}
                                        {...register('description', { required: true })}
                                        className="w-full border px-3 py-2 rounded"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Upload Medicine Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleUploadPhoto}
                                        required
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Medicine Category *</label>
                                    <select {...register('category', { required: true })} className="w-full border px-3 py-2 rounded">
                                        <option value="">Select Category</option>
                                        <option value="Capsule">Capsule</option>
                                        <option value="Tablet">Tablet</option>
                                        <option value="Syrup">Syrup</option>
                                        <option value="Injection">Injection</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Medicine Company *</label>
                                    <select {...register('company', { required: true })} className="w-full border px-3 py-2 rounded">
                                        <option value="">Select Company</option>
                                        <option value="ACI Pharmaceuticals Limited.">ACI Pharmaceuticals Limited.</option>
                                        <option value="ACME Laboratories Ltd.">ACME Laboratories Ltd.</option>
                                        <option value="Renata Limited.">Renata Limited.</option>
                                        <option value=" Opsonin Pharma Ltd."> Opsonin Pharma Ltd.</option>
                                        <option value="Beximco Pharmaceuticals Ltd.">Beximco Pharmaceuticals Ltd.</option>
                                        <option value="Square Pharmaceuticals Ltd.">Square Pharmaceuticals Ltd.</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Item Mass Unit *</label>
                                    <input
                                        type="text"
                                        {...register('massUnit', { required: true })}
                                        placeholder='eg.. 500mg or 200ml'
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Per Unit Price *</label>
                                    <input
                                        type="number"
                                        {...register('price', { required: true })}
                                        min="0"
                                        step="0.01"
                                        placeholder="Price"
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Discount Percentage</label>
                                    <input
                                        type="number"
                                        {...register('discount')}
                                        min="0"
                                        max="100"
                                        placeholder="Discount (default 0)"
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="mt-3 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:cursor-pointer  transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className='bg-[#00afb9]  text-white rounded-md py-2 px-4 hover:cursor-pointer ml-2'
                                >
                                    Add
                                </button>
                            </form>
                        </div>

                    </div>
                )
            }

            {
                showUpdateModal && updateMedicine && (
                    <div className="fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl hover:cursor-pointer  font-bold"
                            >
                                &times;
                            </button>

                            <h3 className="text-xl font-semibold mb-4">Update Medicine</h3>

                            <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4 max-h-[70vh] overflow-y-auto">
                                <div>
                                    <label className="block mb-1 font-medium">Item Name *</label>
                                    <input
                                        type="text"
                                        defaultValue={updateMedicine.itemName}
                                        placeholder="Item name"
                                        {...register('itemName', { required: true })}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Generic Name</label>
                                    <input
                                        type="text"
                                        defaultValue={updateMedicine.genericName}
                                        placeholder="Generic name"
                                        {...register('genericName', { required: true })}
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Short Description</label>
                                    <textarea
                                        placeholder="Short description"
                                        rows={3}
                                        defaultValue={updateMedicine.description}
                                        {...register('description', { required: true })}
                                        className="w-full border px-3 py-2 rounded"
                                    ></textarea>
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Upload Medicine Image</label>
                                    <input
                                        type="file"
                                        accept="image/*"

                                        onChange={handleUploadPhotoUpdate}

                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Medicine Category *</label>
                                    <select defaultValue={updateMedicine.category} {...register('category', { required: true })} className="w-full border px-3 py-2 rounded">
                                        <option value="">Select Category</option>
                                        <option value="Capsule">Capsule</option>
                                        <option value="Tablet">Tablet</option>
                                        <option value="Syrup">Syrup</option>
                                        <option value="Injection">Injection</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Medicine Company *</label>
                                    <select defaultValue={updateMedicine.company} {...register('company', { required: true })} className="w-full border px-3 py-2 rounded">
                                        <option value="">Select Company</option>
                                        <option value="ACI Pharmaceuticals Limited.">ACI Pharmaceuticals Limited.</option>
                                        <option value="ACME Laboratories Ltd.">ACME Laboratories Ltd.</option>
                                        <option value="Renata Limited.">Renata Limited.</option>
                                        <option value=" Opsonin Pharma Ltd."> Opsonin Pharma Ltd.</option>
                                        <option value="Beximco Pharmaceuticals Ltd.">Beximco Pharmaceuticals Ltd.</option>
                                        <option value="Square Pharmaceuticals Ltd.">Square Pharmaceuticals Ltd.</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Item Mass Unit *</label>
                                    <input
                                        type="text"
                                        defaultValue={updateMedicine.massUnit}
                                        {...register('massUnit', { required: true })}
                                        placeholder='eg.. 500mg or 200ml'
                                        className="w-full border rounded px-3 py-2"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Per Unit Price *</label>
                                    <input
                                        type="number"
                                        defaultValue={updateMedicine.price}
                                        {...register('price', { required: true })}
                                        min="0"
                                        step="0.01"
                                        placeholder="Price"
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>

                                <div>
                                    <label className="block mb-1 font-medium">Discount Percentage</label>
                                    <input
                                        type="number"
                                        defaultValue={updateMedicine.discount}
                                        {...register('discount')}
                                        min="0"
                                        max="100"
                                        placeholder="Discount (default 0)"
                                        className="w-full border px-3 py-2 rounded"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowUpdateModal(false)}
                                    className="mt-3 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 hover:cursor-pointer  transition"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className='bg-[#00afb9]  text-white rounded-md py-2 px-4 hover:cursor-pointer ml-2'
                                >
                                    Update
                                </button>
                            </form>
                        </div>

                    </div>
                )
            }
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
                            <div className="mb-8 md:mb-0 flex justify-center items-center">
                                <img
                                    src={detailModalMedicine.image || 'https://via.placeholder.com/400'}
                                    alt={detailModalMedicine.itemName}
                                    className="rounded-lg object-contain max-h-96 w-full shadow-lg"
                                />
                            </div>

                            <div className="mt-5 flex flex-col">
                                <h3 className="text-4xl font-semibold mb-6 text-gray-900">
                                    {detailModalMedicine.itemName}
                                </h3>

                                <h4 className="text-xl font-semibold mb-3 border-b border-gray-300 pb-1 text-gray-800">
                                    Medicine Information
                                </h4>
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


                        </div>
                    </div>
                </div>
            )}

            <ToastContainer position="top-right" reverseOrder={false} />
        </div >
    );
};

export default ManageMedicine;