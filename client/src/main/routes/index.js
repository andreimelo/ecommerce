import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../../library/components/Footer';
// import { route } from '../../library/helpers/routes';
import UserRoute from './UserRoute';
import AdminRoute from './AdminRoute';
import Header from './../../library/components/Header';
import PublicRoute from './PublicRoute';
// Pages
const Home = lazy(() => import('../../modules/default/Home'));
const Login = lazy(() => import('../../modules/auth/Login'));
const ForgotPassword = lazy(() => import('../../modules/auth/ForgotPassword'));
const Register = lazy(() => import('../../modules/auth/Register'));
const CompleteRegistration = lazy(() =>
	import('../../modules/auth/CompleteRegistration'),
);
const ChangePassword = lazy(() => import('../../modules/user/ChangePassword'));
const Wishlist = lazy(() => import('../../modules/user/Wishlist'));
const NotFound = lazy(() => import('../../modules/default/404'));

const Shop = lazy(() => import('../../modules/default/Shop'));
const Cart = lazy(() => import('../../modules/default/Cart'));
const History = lazy(() => import('../../modules/user/History'));

const AdminDashboard = lazy(() => import('../../modules/admin/AdminDashboard'));

function initialRoutes({ store }){
	const { user } = store;
	// Get role
	const { role } = user || '';
	return (
		<Suspense fallback={<div>Loading....</div>}>
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
					<Route exact path='*' component={NotFound} />
				</Switch>
				<Footer />
			</BrowserRouter>
		</Suspense>
	);
}

export default initialRoutes;
