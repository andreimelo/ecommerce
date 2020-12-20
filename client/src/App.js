import React from 'react';
import Routes from '../src/main/routes';
import Header from './library/components/Header';

function App(){
	return (
		<React.Fragment>
			<Header />
			<Routes />
		</React.Fragment>
	);
}

export default App;
