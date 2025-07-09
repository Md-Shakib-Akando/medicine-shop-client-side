import { createBrowserRouter } from "react-router";
import RootLayOut from "../RootLayout/RootLayOut";
import Home from "../Pages/Home";
import AuthLayout from "../AuthLayout/AuthLayout";
import Login from "../AuthLayout/Login";
import Register from "../AuthLayout/Register";
import PrivateRoute from "../Private/PrivateRoute";
import DashBoard from "../Pages/DashBoard";


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
                path: 'dashBoard',
                element: (
                    <PrivateRoute><DashBoard></DashBoard></PrivateRoute>
                )
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
    }
]);