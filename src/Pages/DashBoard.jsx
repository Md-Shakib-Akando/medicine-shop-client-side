import React from 'react';
import Sidebar from '../Components/Dashboard/Sidebar';
import { Outlet } from 'react-router';

const DashBoard = () => {
    return (
        <div className='md:flex'>


            <Sidebar></Sidebar>

            <div className='flex-1  '>
                <div className='p-5'>

                    <Outlet></Outlet>
                </div>
            </div>

        </div>
    );
};

export default DashBoard;