import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Components
import Header from './../../library/components/Header';
import Footer from '../../library/components/Footer';
import env from '../../library/common/config/env';

// User/Subscriber pages
const Home = lazy(async () => {
	const module = await import('../../modules/default/Home');
	return module;
});
const Login = lazy(async () => {
	const module = await import('../../modules/auth/Login');
	return module;
});
const ForgotPassword = lazy(async () => {
	const module = await import('../../modules/auth/ForgotPassword');
	return module;
});
const SignUp = lazy(async () => {
	const module = await import('../../modules/auth/SignUp');
	return module;
});
const CompleteRegistration = lazy(async () => {
	const module = await import('../../modules/auth/CompleteRegistration');
	return module;
});
const ChangePassword = lazy(async () => {
	const module = await import('../../modules/user/ChangePassword');
	return module;
});
const Wishlist = lazy(async () => {
	const module = await import('../../modules/user/Wishlist');
	return module;
});

const Shop = lazy(async () => {
	const module = await import('../../modules/default/Shop');
	return module;
});
const Cart = lazy(async () => {
	const module = await import('../../modules/default/Cart');
	return module;
});
const History = lazy(async () => {
	const module = await import('../../modules/user/History');
	return module;
});

// Admin pages
const AdminDashboard = lazy(async () => {
	const module = await import('../../modules/admin/AdminDashboard');
	return module;
});
const AdminCategory = lazy(async () => {
	const module = await import('../../modules/admin/Category');
	return module;
});
const AdminCategoryUpdate = lazy(async () => {
	const module = await import('../../modules/admin/Category/Update');
	return module;
});
const AdminSubCategory = lazy(async () => {
	const module = await import('../../modules/admin/SubCategory');
	return module;
});

// Error Pages
const Error404 = lazy(async () => {
	const module = await import('../../modules/default/Error/Error404');
	return module;
});
const Error503 = lazy(async () => {
	const module = await import('../../modules/default/Error/Error503');
	return module;
});

function initialRoutes({ store }){
	const { user } = store;
	// Get role
	const { role, imageURL } = user || '';
	const isUnderMaintenance = env.under_maintenance === 'true';

	// 503 - Website under maintenance page
	if (isUnderMaintenance) {
		return (
			<Suspense fallback={<h2>🌀 Loading....</h2>}>
				<Error503 />
			</Suspense>
		);
	}

	const roleRoutes = {
		admin      : [
			{
				path    : '/',
				element : AdminDashboard,
			},
			{
				path    : '/admin/category',
				element : AdminCategory,
			},
			{
				path    : '/admin/category/:slug',
				element : AdminCategoryUpdate,
			},
			{
				path    : '/admin/sub-category',
				element : AdminSubCategory,
			},
			{
				path    : '*',
				element : Error404,
			},
		],
		subscriber : [
			{
				path    : '/',
				element : History,
			},
			{
				path    : '/user/change-password',
				element : ChangePassword,
			},
			{
				path    : '/user/wishlist',
				element : Wishlist,
			},
			// needs to be in subscriber page as well
			{
				path    : '/shop',
				element : Shop,
			},
			{
				path    : '/cart',
				element : Cart,
			},
			//
			{
				path    : '*',
				element : Error404,
			},
		],
	};

	const publicRoutes = [
		{
			path    : '/',
			element : Home,
		},
		{
			path    : '/home',
			element : Home,
		},
		{
			path    : '/login',
			element : Login,
		},
		{
			path    : 'signup',
			element : SignUp,
		},
		{
			path    : '/register/complete',
			element : CompleteRegistration,
		},
		{
			path    : '/forgot/password',
			element : ForgotPassword,
		},
		{
			path    : '/shop',
			element : Shop,
		},
		{
			path    : '/cart',
			element : Cart,
		},
		{
			path    : '*',
			element : Error404,
		},
	];

	const noRole = role === undefined || !role;
	const userRoutes = roleRoutes[role] || [];
	const mappingRoutes =
		noRole ? publicRoutes :
		userRoutes;

	return (
		<Suspense fallback={<h2>🌀 Loading....</h2>}>
			<BrowserRouter>
				<Header role={role} imageURL={imageURL} />
				<Switch>
					{mappingRoutes.map((route, index) => {
						return (
							<Route
								key={index}
								exact
								path={route.path}
								render={(props) => <route.element {...props} {...user} />}
							/>
						);
					})}
				</Switch>
				<Footer />
			</BrowserRouter>
		</Suspense>
	);
}

export default initialRoutes;
