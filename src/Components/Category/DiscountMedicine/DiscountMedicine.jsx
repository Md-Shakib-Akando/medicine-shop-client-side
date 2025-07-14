import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const DiscountMedicine = () => {
    const [discountMedicines, setDiscountMedicines] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/medicines')
            .then(res => {
                const discounted = res.data.filter(med => med.discount && med.discount > 0);
                setDiscountMedicines(discounted);
            })
            .catch(err => console.error(err));
    }, []);

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
                                    <p className='font-medium text-[15px] truncate'>Company: <span className='font-normal'>{med.company}</span></p>
                                    <p className='font-medium text-[15px]'>Category: <span className='font-normal'>{med.category}</span></p>

                                    <div className="card-actions justify-end mt-4">
                                        <button className='btn btn-sm'>Select</button>
                                        <button className='btn btn-sm'>View</button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default DiscountMedicine;
