import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllCategory = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/categories')
            .then(res => {
                setCategories(res.data)

            })
            .catch(err => console.error(err));
    }, []);

    return (
        <>
            <div className='max-w-11/12 mx-auto'>
                <h1 className='text-center font-bold text-3xl my-5'>Shop by Category</h1>
                <div className=" px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
                    {categories.map(category => (
                        <Link key={category._id}>
                            <div

                                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 cursor-pointer"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img
                                        src={category.image}
                                        alt={category.name}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div className="bg-[#00afb9] text-center text-white px-4 py-3">
                                    <h3 className="text-lg font-semibold">
                                        {category.name} <span className="text-sm font-normal">(0 Products)</span>
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllCategory;
