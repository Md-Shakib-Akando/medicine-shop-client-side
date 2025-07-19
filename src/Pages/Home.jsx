import React from 'react';
import AllCategory from '../Components/Category/AllCategory';
import DiscountMedicine from '../Components/Category/DiscountMedicine/DiscountMedicine';
import LatestMedicine from '../Components/LatestMedicine';
import Banner from '../Components/Category/Banner';
import Faq from '../Components/Extra/Faq';
import WhyChoose from '../Components/Extra/WhyChoose';


const Home = () => {
    return (
        <>

            <div className='min-h-[calc(100vh-367px)]'>
                <Banner></Banner>
                <AllCategory></AllCategory>
                <DiscountMedicine></DiscountMedicine>
                <LatestMedicine></LatestMedicine>
                <WhyChoose></WhyChoose>
                <Faq></Faq>
            </div>
        </>
    );
};

export default Home;