import React from 'react';
import AllCategory from '../Components/Category/AllCategory';
import DiscountMedicine from '../Components/Category/DiscountMedicine/DiscountMedicine';


const Home = () => {
    return (
        <>
            <div className='min-h-[calc(100vh-367px)]'>
                <AllCategory></AllCategory>
                <DiscountMedicine></DiscountMedicine>
            </div>
        </>
    );
};

export default Home;