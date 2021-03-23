import React, { useEffect } from 'react';
import Routes from '../src/main/routes';
import { auth } from '../src/library/common/config/firebase';
import { useDispatch } from 'react-redux';
import { onAuthStateAction } from './library/common/actions/authentication';

function App(){
	const dispatch = useDispatch();

	useEffect(
		() => {
			const unsubscribe = auth.onAuthStateChanged(async (user) => {
				if (user) {
					onAuthStateAction(user, dispatch);
				}
			});
			return () => unsubscribe();
		},
		[
			dispatch,
		],
	);

	return (
		<React.Fragment>
			<Routes />
		</React.Fragment>
	);
}

export default App;
