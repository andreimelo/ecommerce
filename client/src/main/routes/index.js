import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../../library/components/Footer';
import Header from '../../library/components/Header';
import { route } from '../../library/utilities/routes';
import PrivateRoute from '../routes/PrivateRoute';

function initialRoutes(){
	return (
		<Suspense fallback={<div>Loading....</div>}>
			<BrowserRouter>
				<Header />
				<Switch>
					{route.map((item, key) => {
						if (item.path === '/user/history') {
							return (
								<PrivateRoute
									key={key}
									path={item.path}
									component={item.component}
								/>
							);
						}
						else {
							return (
								<Route
									key={key}
									exact
									path={item.path}
									component={item.component}
								/>
							);
						}
					})}
				</Switch>
				<Footer />
			</BrowserRouter>
		</Suspense>
	);
}

export default initialRoutes;
