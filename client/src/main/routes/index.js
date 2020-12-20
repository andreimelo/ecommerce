import React, { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
const Home = lazy(() => import('../../modules/default/Home'));
const Login = lazy(() => import('../../modules/auth/Login'));
const Register = lazy(() => import('../../modules/auth/Register'));

function initialRoutes(){
	return (
		<Suspense fallback={<div>Loading....</div>}>
			<BrowserRouter>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route path='/login' component={Login} />
					<Route path='/register' component={Register} />
				</Switch>
			</BrowserRouter>
		</Suspense>
	);
}

export default initialRoutes;
