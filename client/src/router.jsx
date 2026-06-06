import { createBrowserRouter } from "react-router-dom";
import Home from './pages/Home/index'
import Register from './pages/Register/index'
import Login from './pages/Login/index'
import Admin from "./pages/Admin";


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <Home/>
    },
    {
        path: '/register',
        element: <Register/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/admin',
        element: <Admin/>
    }
])