
import React, { useEffect, useState } from 'react';
import UseAuth from '../../UseAuth';
import AdminHome from './Admin/AdminHome';
import SellerHome from './Seller/SellerHome';
import PaymentHistory from './User/PaymentHistory';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';

const DashHome = () => {
    const { user } = UseAuth();
    const [userRole, setUserRole] = useState('');
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => setUserRole(res.data.userRole))
                .catch(console.error);
        }
    }, [user, axiosSecure]);
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