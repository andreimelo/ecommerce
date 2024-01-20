import { lazy } from 'react';
const ChangePassword = lazy(() => import('../../modules/user/ChangePassword'));
const Wishlist = lazy(() => import('../../modules/user/Wishlist'));
const NotFound = lazy(() => import('../../modules/default/404'));
const Home = lazy(() => import('../../modules/default/Home'));
const Login = lazy(() => import('../../modules/auth/Login'));
const ForgotPassword = lazy(() => import('../../modules/auth/ForgotPassword'));
const Register = lazy(() => import('../../modules/auth/Register'));
const CompleteRegistration = lazy(() =>
	import('../../modules/auth/CompleteRegistration'),
);
const Shop = lazy(() => import('../../modules/default/Shop'));
const Cart = lazy(() => import('../../modules/default/Cart'));
const History = lazy(() => import('../../modules/user/History'));
const AdminDashboard = lazy(() => import('../../modules/admin/AdminDashboard'));

export const route = [
	{
		path      : '/',
		component : Home,
	},
	{
		path      : '/login',
		component : Login,
	},
	{
		path      : '/forgot/password',
		component : ForgotPassword,
	},
	{
		path      : '/user/history',
		component : History,
	},
	{
		path      : '/user/change-password',
		component : ChangePassword,
	},
	{
		path      : '/user/wishlist',
		component : Wishlist,
	},
	{
		path      : '/register',
		component : Register,
	},
	{
		path      : '/register/complete',
		component : CompleteRegistration,
	},
	{
		path      : '/shop',
		component : Shop,
	},
	{
		path      : '/cart',
		component : Cart,
	},
	{
		path      : '/admin/dashboard',
		component : AdminDashboard,
	},
	{
		path      : '*',
		component : NotFound,
	},
];
