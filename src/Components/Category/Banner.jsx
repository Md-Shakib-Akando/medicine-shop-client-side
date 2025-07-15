import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';
import { Link } from 'react-router';

const Banner = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/advertisements/approved')
            .then(res => setAds(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className=" mx-auto rounded-lg overflow-hidden shadow-lg h-[70vh]">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500 }}
                loop={ads.length > 1}
                slidesPerView={1}
                className="h-full"
            >
                {ads.map(ad => (
                    <SwiperSlide key={ad._id} className="relative h-[70vh] w-full">

                        <div className="relative h-full w-full">

                            <img
                                src={ad.image}
                                alt={ad.name}
                                className="absolute inset-0 w-full h-full object-cover z-0"
                            />


                            <div className="absolute inset-0 bg-black/40 z-10"></div>


                            <div className="relative z-20 flex h-full items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24">
                                <div className="text-white text-center space-y-5 max-w-xl">
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold drop-shadow-xl leading-tight">{ad.name}</h1>
                                    <p className="text-sm sm:text-base md:text-lg lg:text-xl drop-shadow leading-relaxed">{ad.description}</p>
                                    <Link to="/shop">

                                        <button className="bg-gradient-to-r from-[#00afb9] to-[#007a85] text-white rounded-md py-2 px-6 hover:from-[#008b94] hover:to-[#005f66] transition hover:cursor-pointer">
                                            Shop Now
                                        </button>


                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Banner;
