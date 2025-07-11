import { createBrowserRouter } from "react-router";
import RootLayOut from "../RootLayout/RootLayOut";
import Home from "../Pages/Home";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../AuthLayout/Login";
import Register from "../AuthLayout/Register";
import PrivateRoute from "../Private/PrivateRoute";
import DashBoard from "../Pages/DashBoard";
import AdminHome from "../Components/Dashboard/Admin/AdminHome";
import BannerAdvertise from "../Components/Dashboard/Admin/BannerAdvertise";
import ManageCategory from "../Components/Dashboard/Admin/ManageCategory";
import PaymentManage from "../Components/Dashboard/Admin/PaymentManage";
import SalesReport from "../Components/Dashboard/Admin/SalesReport";
import SellerHome from "../Components/Dashboard/Seller/SellerHome";
import AskForAdvertisement from "../Components/Dashboard/Seller/AskForAdvertisement";
import ManageMedicine from "../Components/Dashboard/Seller/ManageMedicine";
import PaymentHistory from "../Components/Dashboard/User/PaymentHistory";
import ManagePayment from "../Components/Dashboard/Seller/ManagePayment";
import ManageUsers from "../Components/Dashboard/Admin/ManageUsers";
import UpdateProfile from "../Components/Profile/UpdateProfile";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayOut,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'updateProfile',
                Component: UpdateProfile,
            }


        ]
    },

    {
        path: '/',
        Component: AuthLayout,
        children: [
            {
                path: 'login',
                Component: Login,

            },
            {
                path: 'register',
                Component: Register,
            },

        ]
    },
    {
        path: '/dashBoard',
        element: (
            <PrivateRoute><DashBoard></DashBoard></PrivateRoute>
        ),
        children: [
            {
                path: 'adminHome',
                Component: AdminHome,
            },
            {
                path: 'manageUsers',
                Component: ManageUsers,
            },

            {
                path: 'bannerAdvertise',
                Component: BannerAdvertise,
            },
            {
                path: 'paymentManage',
                Component: PaymentManage,
            },

            {
                path: 'manageCategory',
                Component: ManageCategory,
            },

            {
                path: 'salesReport',
                Component: SalesReport,
            },

            {
                path: 'sellerHome',
                Component: SellerHome,
            },



            {
                path: 'askForAdvertise',
                Component: AskForAdvertisement,
            },
            {
                path: 'sellerPaymentManage',
                Component: ManagePayment,
            },
            {
                path: 'manageMedicine',
                Component: ManageMedicine,
            },
            {
                path: 'paymentHistory',
                Component: PaymentHistory,
            },
            {
                path: 'updateProfile',
                Component: UpdateProfile,
            }

        ]
    }
]);