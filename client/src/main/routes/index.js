import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Components
import Header from './../../library/components/Header';
import Footer from '../../library/components/Footer';
import env from '../../library/common/config/env';

// User/Subscriber pages
const Home = lazy(async () => {
	const module = await import('../../pages/default/Home');
	return module;
});
const Login = lazy(async () => {
	const module = await import('../../pages/auth/Login');
	return module;
});
const ForgotPassword = lazy(async () => {
	const module = await import('../../pages/auth/ForgotPassword');
	return module;
});
const SignUp = lazy(async () => {
	const module = await import('../../pages/auth/SignUp');
	return module;
});
const CompleteRegistration = lazy(async () => {
	const module = await import('../../pages/auth/CompleteRegistration');
	return module;
});
const ChangePassword = lazy(async () => {
	const module = await import('../../pages/user/ChangePassword');
	return module;
});
const Wishlist = lazy(async () => {
	const module = await import('../../pages/user/Wishlist');
	return module;
});

const Shop = lazy(async () => {
	const module = await import('../../pages/default/Shop');
	return module;
});
const Cart = lazy(async () => {
	const module = await import('../../pages/default/Cart');
	return module;
});
const History = lazy(async () => {
	const module = await import('../../pages/user/History');
	return module;
});

// Admin pages
const AdminDashboard = lazy(async () => {
	const module = await import('../../pages/admin/AdminDashboard');
	return module;
});
const AdminCategory = lazy(async () => {
	const module = await import('../../pages/admin/Category');
	return module;
});
const AdminCategoryUpdate = lazy(async () => {
	const module = await import('../../pages/admin/Category/CategoryUpdate');
	return module;
});
const AdminSubCategory = lazy(async () => {
	const module = await import('../../pages/admin/SubCategory');
	return module;
});
const AdminSubCategoryUpdate = lazy(async () => {
	const module = await import('../../pages/admin/SubCategory/SubCategoryUpdate');
	return module;
});

const AdminProduct = lazy(async () => {
	const module = await import('../../pages/admin/Product');
	return module;
});

// Error Pages
const Error404 = lazy(async () => {
	const module = await import('../../pages/default/Error/Error404');
	return module;
});
const Error503 = lazy(async () => {
	const module = await import('../../pages/default/Error/Error503');
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
				path    : '/admin/sub-category/:slug',
				element : AdminSubCategoryUpdate,
			},
			{
				path    : '/admin/product',
				element : AdminProduct,
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
			path    : '/signup',
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
