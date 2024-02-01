import React, { useEffect } from 'react';
import Routes from '../src/main/routes';
import { auth } from '../src/library/common/config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateAction } from './library/common/actions/authentication';
import './index.css';

function App(){
	const dispatch = useDispatch();
	const storeData = useSelector((state) => state);
	
	useEffect(
		() => {
			const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
			<Routes store={storeData} />
		</React.Fragment>
	);
}

export default App;
