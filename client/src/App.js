import React from 'react';
import Routes from '../src/main/routes';
import Footer from './library/components/Footer';
import Header from './library/components/Header';

function App(){
	return (
		<React.Fragment>
			<Header />
			<Routes />
			<Footer />
		</React.Fragment>
	);
}

export default App;
