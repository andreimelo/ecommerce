import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../../library/components/Footer';
import Header from '../../library/components/Header';
const Home = lazy(() => import('../../modules/default/Home'));
const Login = lazy(() => import('../../modules/auth/Login'));
const Register = lazy(() => import('../../modules/auth/Register'));

function initialRoutes(){
	return (
		<Suspense fallback={<div>Loading....</div>}>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
				</Switch>
				<Footer />
			</BrowserRouter>
		</Suspense>
	);
}

export default initialRoutes;
