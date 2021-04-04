import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Footer from '../../library/components/Footer';
import Header from '../../library/components/Header';
import { route } from '../../library/utilities/routes';
import UserRoute from './UserRoute';

function initialRoutes(){
	return (
		<Suspense fallback={<div>Loading....</div>}>
			<BrowserRouter>
				<Header />
				<Switch>
					{route.map(
						(item, key) =>

								item.path === '/user/history' ? <UserRoute
									key={key}
									path={item.path}
									component={item.component}
								/> :
								<Route
									key={key}
									exact
									path={item.path}
									component={item.component}
								/>,
					)}
				</Switch>
				<Footer />
			</BrowserRouter>
		</Suspense>
	);
}

export default initialRoutes;
