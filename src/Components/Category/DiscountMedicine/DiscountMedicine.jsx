
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { useNavigate } from 'react-router';
import UseAuth from '../../../UseAuth';
import { RxCross2 } from 'react-icons/rx';
import { handleSelect } from '../../../Hooks/Select';
import useAxiosSecure from '../../../Hooks/UseAxiosSecure';

const DiscountMedicine = () => {
    const { user } = UseAuth();
    const [discountMedicines, setDiscountMedicines] = useState([]);
    const [detailModalMedicine, setDetailModalMedicine] = useState(null);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`,)
                .then(res => setUserRole(res.data.userRole))
                .catch(console.error);
        }
    }, [axiosSecure, user]);

    useEffect(() => {
        axiosSecure.get('/medicines',)
            .then(res => {
                const discounted = res.data.filter(med => med.discount && med.discount > 0);
                setDiscountMedicines(discounted);
            })
            .catch(err => console.error(err));
    }, [axiosSecure]);

    return (
        <div className='bg-base-200 my-10 p-7'>
            <div className='max-w-11/12 mx-auto'>
                <h1 className='text-center font-bold text-3xl md:text-5xl my-10'>Discount Products</h1>

                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    navigation

                    className="w-full  mx-auto px-4"
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                        1280: { slidesPerView: 4 },
                    }}
                >
                    {discountMedicines.map((med) => (
                        <SwiperSlide key={med._id}>
                            <div className="card bg-base-100 shadow-sm w-full h-full">
                                <figure className='relative p-5'>
                                    <img
                                        src={med.image}
                                        className='h-[250px] w-full object-cover rounded-md'
                                        alt="discountMedicine"
                                    />
                                    {med.discount && (
                                        <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                                            {med.discount}% OFF
                                        </span>
                                    )}
                                </figure>
                                <div className="card-body -mt-7">
                                    <div className='flex justify-between'>
                                        <h2 className="card-title font-bold">{med.itemName}</h2>
                                        <div>
                                            <p className="text-gray-900 text-[17px] font-bold">
                                                ${(med.price - (med.price * med.discount / 100)).toFixed(2)}
                                                <span className="text-[17px] line-through text-gray-500 ml-2">${med.price}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <p className='text-[15px] mt-4'>
                                        {med.description.length > 30
                                            ? (
                                                <>
                                                    {med.description.slice(0, 40)}...
                                                    <button
                                                        onClick={() => {
                                                            if (!user) {
                                                                navigate('/login');
                                                            } else {
                                                                setDetailModalMedicine(med);
                                                            }
                                                        }}
                                                        className="text-[#00afb9] ml-1 hover:underline hover:cursor-pointer">
                                                        See More
                                                    </button>
                                                </>
                                            )
                                            : med.description
                                        }
                                    </p>


                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {detailModalMedicine && (
                    <div className="fixed inset-0 bg-black/80 bg-opacity-70 flex justify-center items-center z-50 p-6">
                        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-10 relative">
                            <button
                                onClick={() => setDetailModalMedicine(null)}
                                className="absolute top-5 right-5 text-4xl font-extrabold text-gray-600 hover:text-gray-900 transition"
                                aria-label="Close modal"
                            >
                                <RxCross2 size={20} />
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
                )}
            </div>
        </div>
    );
};

export default DiscountMedicine;
