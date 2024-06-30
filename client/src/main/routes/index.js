import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './../../library/components/Header';
import Footer from '../../library/components/Footer';
import env from '../../library/common/config/env';
import SideDrawer from '../../library/components/SideDrawer';

//Lazy-loaded pages
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
const Orders = lazy(async () => {
	const module = await import('../../pages/user/Orders');
	return module;
});
const Profile = lazy(async () => {
	const module = await import('../../pages/user/Profile');
	return module;
});
const ShopByCategory = lazy(async () => {
	const module = await import('../../pages/default/ShopByCategory');
	return module;
});
const SubCategory = lazy(async () => {
	const module = await import('../../pages/default/SubCategory');
	return module;
});
const ViewProduct = lazy(async () => {
	const module = await import('../../pages/default/ViewProduct');
	return module;
});
const Checkout = lazy(async () => {
	const module = await import('../../pages/default/Checkout');
	return module;
});
const Payment = lazy(async () => {
	const module = await import('../../pages/default/Payment');
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
const AdminProducts = lazy(async () => {
	const module = await import('../../pages/admin/Products');
	return module;
});
const AdminProductsUpdate = lazy(async () => {
	const module = await import('../../pages/admin/Products/ProductsUpdate');
	return module;
});
const AdminCoupon = lazy(async () => {
	const module = await import('../../pages/admin/Coupon');
	return module;
});
const AdminAccounts = lazy(async () => {
	const module = await import('../../pages/admin/Accounts');
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

const InitialRoutes = ({ store }) => {
	const { user } = store;
	const { role, imageURL } = user || '';
	const isUnderMaintenance = env.under_maintenance === 'true';
	const [
		loading,
		setLoading,
	] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 1000); // timeout in milliseconds

		return () => clearTimeout(timer);
	}, []);

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
				path    : '/admin/products',
				element : AdminProducts,
			},
			{
				path    : '/admin/products/:slug',
				element : AdminProductsUpdate,
			},
			{
				path    : '/admin/coupon',
				element : AdminCoupon,
			},
			{
				path    : '/admin/accounts',
				element : AdminAccounts,
			},
			{
				path    : '*',
				element : Error404,
			},
		],
		subscriber : [
			{
				path    : '/',
				element : Home,
			},
			{
				path    : '/user/orders',
				element : Orders,
			},
			{
				path    : '/user/profile',
				element : Profile,
			},
			{
				path    : '/product/:slug',
				element : ViewProduct,
			},
			{
				path    : '/category/:slug',
				element : ShopByCategory,
			},
			{
				path    : '/sub-category/:slug',
				element : SubCategory,
			},
			{
				path    : '/user/change-password',
				element : ChangePassword,
			},
			{
				path    : '/user/wishlist',
				element : Wishlist,
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
				path    : '/checkout',
				element : Checkout,
			},
			{
				path    : '/payment',
				element : Payment,
			},
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
			path    : '/product/:slug',
			element : ViewProduct,
		},
		{
			path    : '/category/:slug',
			element : ShopByCategory,
		},
		{
			path    : '/sub-category/:slug',
			element : SubCategory,
		},
		{
			path    : '/checkout',
			element : Checkout,
		},
		{
			path    : '/payment',
			element : Payment,
		},
		{
			path    : '*',
			element : Error404,
		},
	];
	const noRole = role === undefined || !role;
	const mappingRoutes =
		noRole ? publicRoutes :
		roleRoutes[role];

	return (
		<Suspense fallback={<h2>🌀 Loading....</h2>}>
			<BrowserRouter>
				<Header role={role} imageURL={imageURL} />
				<SideDrawer />
				<div className='app'>
					<Switch>
						{mappingRoutes.map((route, index) => (
							<Route
								key={index}
								exact
								path={route.path}
								render={(props) =>
									// refactor


										loading ? '' :
										<route.element {...props} {...user} />}
							/>
						))}
					</Switch>
				</div>
				<Footer />
			</BrowserRouter>
		</Suspense>
	);
};

export default InitialRoutes;
