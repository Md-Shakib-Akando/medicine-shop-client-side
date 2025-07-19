import React from 'react';
import Sidebar from '../Components/Dashboard/Sidebar';
import { Outlet } from 'react-router';

const DashBoard = () => {
    return (
        <div className="flex flex-col xl:flex-row overflow-x-hidden">

            <div className="w-full md:w-64 lg:w-80">
                <Sidebar />
            </div>

            <div className="flex-1 mt-5 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;
