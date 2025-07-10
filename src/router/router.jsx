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


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayOut,
        children: [
            {
                index: true,
                Component: Home,
            },

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
                path: '/dashBoard/adminHome',
                Component: AdminHome,
            },
            {
                path: '/dashBoard/manageUsers',
                Component: ManageUsers,
            },

            {
                path: '/dashBoard/bannerAdvertise',
                Component: BannerAdvertise,
            },
            {
                path: '/dashBoard/paymentManage',
                Component: PaymentManage,
            },

            {
                path: '/dashBoard/manageCategory',
                Component: ManageCategory,
            },

            {
                path: '/dashBoard/salesReport',
                Component: SalesReport,
            },

            {
                path: '/dashBoard/sellerHome',
                Component: SellerHome,
            },



            {
                path: '/dashBoard/askForAdvertise',
                Component: AskForAdvertisement,
            },
            {
                path: '/dashBoard/sellerPaymentManage',
                Component: ManagePayment,
            },
            {
                path: '/dashBoard/manageMedicine',
                Component: ManageMedicine,
            },
            {
                path: '/dashBoard/paymentHistory',
                Component: PaymentHistory,
            },

        ]
    }
]);