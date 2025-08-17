import React, { useEffect, useState } from 'react';
import AllCategory from '../Components/Category/AllCategory';
import DiscountMedicine from '../Components/Category/DiscountMedicine/DiscountMedicine';
import LatestMedicine from '../Components/LatestMedicine';
import Banner from '../Components/Category/Banner';
import Faq from '../Components/Extra/Faq';
import WhyChoose from '../Components/Extra/WhyChoose';
import { ReTitle } from 're-title';
import LoadingSpinner from '../Components/LoadingSpinner';
import Review from '../Components/Extra/Review';



const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <ReTitle title="Medicine Shop | Home"></ReTitle>

            {
                loading ? (
                    <LoadingSpinner> </LoadingSpinner>
                ) : (
                    <div className='min-h-[calc(100vh-367px)]'>

                        <Banner></Banner>
                        <AllCategory></AllCategory>
                        <DiscountMedicine></DiscountMedicine>
                        <LatestMedicine></LatestMedicine>
                        <WhyChoose></WhyChoose>
                        <Faq></Faq>
                        <Review></Review>
                    </div>
                )
            }
        </>
    );
};

export default Home;