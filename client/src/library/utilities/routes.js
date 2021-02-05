import { lazy } from 'react';
const Home = lazy(() => import('../../modules/default/Home'));
const Login = lazy(() => import('../../modules/auth/Login'));
const Register = lazy(() => import('../../modules/auth/Register'));

export const route = [
    {
        path: '/',
        component : Home
    }, 
    {
        path: "/login",
        component:  Login,
    },
    {
        path:"/register",
        component : Register
    }
];