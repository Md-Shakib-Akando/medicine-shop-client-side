
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import UseAuth from '../../UseAuth';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';

const AllCategory = () => {

    const [categories, setCategories] = useState([]);
    const [medicines, setMedicines] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/categories')
            .then(res => {
                setCategories(res.data)

            })
            .catch(err => console.error(err));

        axiosSecure.get('/medicines', {

        })
            .then(res => setMedicines(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);




    return (
        <>
            <div className='max-w-11/12 mx-auto mt-15'>
                <h1 className='text-center font-bold text-3xl md:text-5xl my-5'>Shop by Category</h1>
                <div className=" px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5">
                    {categories.map(category => {
                        const productCount = medicines.filter(med => med.category === category.name).length;
                        return (
                            (
                                <Link key={category._id} to={`/category/${category.name}`}>
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
                                                {category.name} <span className="text-sm ">({productCount} Products)</span>
                                            </h3>
                                        </div>
                                    </div>
                                </Link>
                            )
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default AllCategory;
