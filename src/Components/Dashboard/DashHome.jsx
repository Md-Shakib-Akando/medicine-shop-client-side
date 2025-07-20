
import React, { useEffect, useState } from 'react';
import UseAuth from '../../UseAuth';
import AdminHome from './Admin/AdminHome';
import SellerHome from './Seller/SellerHome';
import PaymentHistory from './User/PaymentHistory';
import useAxiosSecure from '../../Hooks/UseAxiosSecure';
import LoadingSpinner from '../LoadingSpinner';


const DashHome = () => {
    const { user } = UseAuth();
    const [userRole, setUserRole] = useState('');
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axiosSecure.get(`/users/role/${user.email}`)
                .then(res => {
                    setUserRole(res.data.userRole)
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false)
                });
        }
    }, [user, axiosSecure]);
    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    }
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