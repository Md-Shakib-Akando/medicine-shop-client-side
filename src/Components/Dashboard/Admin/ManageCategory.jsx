import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

const ManageCategory = () => {
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [categories, setCategories] = useState([]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (!data.image[0]) return;

        setUploading(true);

        try {

            const formData = new FormData();
            formData.append('image', data.image[0]);

            const imgbbApi = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Image_Upload_Key}`;
            const uploadRes = await axios.post(imgbbApi, formData);
            const imageUrl = uploadRes.data.data.url;


            const newCategory = {
                name: data.category,
                image: imageUrl,
            };

            const categoryRes = await axios.post('http://localhost:5000/categories', newCategory);

            if (categoryRes.data.insertedId) {

                setCategories(prev => [
                    ...prev,
                    { _id: categoryRes.data.insertedId, ...newCategory }
                ]);

                Swal.fire({
                    icon: 'success',
                    title: 'Category added successfully!',
                    showConfirmButton: false,
                    timer: 1500,
                });

                reset();
                setShowModal(false);
            }
        } catch (error) {
            console.error("Error during category creation:", error);
            Swal.fire({
                icon: 'error',
                title: 'Failed to add category!',
                text: error.message || "Unknown error",
            });
        } finally {
            setUploading(false);
        }
    };


    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            .then(res => setCategories(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <h2 className="text-3xl text-[#00afb9] text-center font-bold mb-6">Manage Category</h2>

            <div className="mb-4 flex justify-center items-center my-7 md:my-10">
                <button
                    onClick={() => setShowModal(true)}
                    className='bg-[#00afb9] text-white rounded-md py-2 px-4'
                >
                    Add Category
                </button>
            </div>



            <div className='overflow-x-auto'>
                <table className="table max-w-6xl mx-auto ">
                    <thead>
                        <tr className="bg-[#00afb9] text-white">
                            <th className="text-lg p-5 ">Image</th>
                            <th className="text-lg p-5 text-center">Category Name</th>
                            <th className="text-lg p-5 text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="2" className="text-center text-xl py-8 text-gray-500">
                                    No Categories Found
                                </td>
                            </tr>
                        ) : (
                            categories.map(cat => (
                                <tr key={cat._id} className="hover:bg-blue-100 transition-colors duration-200">
                                    <td>
                                        <div className="avatar">
                                            <div className="rounded-full  w-12 h-12 ">
                                                <img
                                                    src={cat.image || 'https://via.placeholder.com/40'}
                                                    alt={cat.name}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center text-lg'>{cat.name}</td>
                                    <td className='text-center'>
                                        <div className="inline-flex space-x-2  justify-center">

                                            <button
                                                className="px-2 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 hover:cursor-pointer transition">
                                                Update
                                            </button>
                                            <button className="px-2 py-1 bg-red-500 text-white rounded-md hover:bg-red-700 hover:cursor-pointer transition">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl font-bold"
                        >
                            &times;
                        </button>

                        <h3 className="text-xl font-semibold mb-4">Add Category</h3>

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto">

                            <div>
                                <label className="block mb-1 font-medium">Upload Image *</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("image", { required: true })}
                                    className="w-full border rounded px-3 py-2"
                                />
                                {errors.image && <p className='text-red-600 text-sm'>Image is required</p>}
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">Medicine Category *</label>
                                <select
                                    {...register("category", { required: true })}
                                    className="w-full border px-3 py-2 rounded"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Capsule">Capsule</option>
                                    <option value="Tablet">Tablet</option>
                                    <option value="Syrup">Syrup</option>
                                    <option value="Injection">Injection</option>
                                    <option value="Powder">Powder</option>
                                    <option value="Drops">Drops</option>
                                </select>
                                {errors.category && <p className='text-red-600 text-sm'>Category is required</p>}
                            </div>

                            <div className="flex justify-end space-x-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className='bg-[#00afb9] text-white px-4 py-2 rounded'
                                >
                                    Add
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageCategory;
