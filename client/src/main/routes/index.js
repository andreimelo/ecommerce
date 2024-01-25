import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Components
import Header from './../../library/components/Header';
import Footer from '../../library/components/Footer';
//Routes
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';
import PublicRoute from './PublicRoute';
import env from '../../library/common/config/env';

// Pages
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
const Register = lazy(async () => {
	const module = await import('../../modules/auth/Register');
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

const AdminDashboard = lazy(async () => {
	const module = await import('../../modules/admin/AdminDashboard');
	return module;
});
const AdminCategory = lazy(async () => {
	const module = await import('../../modules/admin/Category');
	return module;
});

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
	const { role } = user || '';
	const isUnderMaintenance = env.under_maintenance === true;

	// 503 - Website under maintenance page
	if (isUnderMaintenance) {
		return (
			<Suspense fallback={<h2>🌀 Loading....</h2>}>
				<Error503 />
			</Suspense>
		);
	}

	return (
		<Suspense fallback={<h2>🌀 Loading....</h2>}>
			<BrowserRouter>
				<Header role={role} />
				<Switch>
					<PublicRoute exact path='/' component={Home} />
					<PublicRoute exact path='/home' component={Home} />
					{/* User Authentication */}
					<PublicRoute exact path='/login' component={Login} />
					<PublicRoute exact path='/register' component={Register} />
					<PublicRoute
						exact
						path='/register/complete'
						component={CompleteRegistration}
					/>
					<PublicRoute
						exact
						path='/forgot/password'
						component={ForgotPassword}
					/>
					{/* User Profile */}
					<UserRoute exact path='/user/history' component={History} />
					<UserRoute
						exact
						path='/user/change-password'
						component={ChangePassword}
					/>
					<UserRoute exact path='/user/wishlist' component={Wishlist} />
					<PublicRoute exact path='/shop' component={Shop} />
					<PublicRoute exact path='/cart' component={Cart} />
					{/* Admin Dashboard*/}
					<AdminRoute
						exact
						path='/admin/dashboard'
						component={AdminDashboard}
						{...user}
					/>
					<AdminRoute
						exact
						path='/admin/category'
						component={AdminCategory}
						{...user}
					/>
					<Route exact path='*' component={Error404} />
				</Switch>
				<Footer />
			</BrowserRouter>
		</Suspense>
	);
}

export default initialRoutes;
