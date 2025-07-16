import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UseAuth from '../../UseAuth';
import AdminHome from './Admin/AdminHome';
import SellerHome from './Seller/SellerHome';
import PaymentHistory from './User/PaymentHistory';

const DashHome = () => {
    const { user } = UseAuth();
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        if (user?.email) {
            axios.get(`http://localhost:5000/users/role/${user.email}`)
                .then(res => setUserRole(res.data.userRole))
                .catch(console.error);
        }
    }, [user]);
    return (
        <div>
            {userRole === 'admin' && (
                <AdminHome></AdminHome>
            )}
            {
                userRole === "seller" && (
                    <SellerHome></SellerHome>
                )
            }
            {
                userRole === 'user' && (
                    <PaymentHistory></PaymentHistory>
                )
            }
        </div>
    );
};

export default DashHome;