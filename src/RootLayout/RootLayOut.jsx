import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';

const RootLayOut = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='mt-28'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayOut;