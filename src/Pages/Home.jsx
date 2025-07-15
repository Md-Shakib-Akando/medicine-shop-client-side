import React from 'react';
import AllCategory from '../Components/Category/AllCategory';
import DiscountMedicine from '../Components/Category/DiscountMedicine/DiscountMedicine';
import LatestMedicine from '../Components/LatestMedicine';
import Banner from '../Components/Category/Banner';


const Home = () => {
    return (
        <>
            <div className='min-h-[calc(100vh-367px)]'>
                <Banner></Banner>
                <AllCategory></AllCategory>
                <DiscountMedicine></DiscountMedicine>
                <LatestMedicine></LatestMedicine>
            </div>
        </>
    );
};

export default Home;