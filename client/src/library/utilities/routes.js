import { lazy } from 'react';
const Home = lazy(() => import('../../modules/default/Home'));
const Login = lazy(() => import('../../modules/auth/Login'));
const Register = lazy(() => import('../../modules/auth/Register'));
const CompleteRegistration = lazy(() =>
	import('../../modules/auth/CompleteRegistration'),
);
const Shop = lazy(() => import('../../modules/default/Shop'));
const Cart = lazy(() => import('../../modules/default/Cart'));

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
];
