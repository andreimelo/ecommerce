import firebase from 'firebase';
import { auth, googleAuthProvider } from '../../config/firebase';
import { createOrUpdateUser } from '../../../services/auth';

export async function logInAction(values, history, dispatch){
	try {
		const result = await auth.signInWithEmailAndPassword(
			values.email,
			values.password,
		);
		const { user } = result;
		const idTokenResult = await user.getIdTokenResult();

		createOrUpdateUser(idTokenResult.token);

		dispatch({
			type    : 'LOGGED_IN_USER',
			payload : {
				email : user.email,
				token : idTokenResult,
			},
		});
		return history.push('/');
	} catch (error) {
		alert(error.message);
	}
}

export async function googleLogInAction(history, dispatch){
	try {
		const result = await auth.signInWithPopup(googleAuthProvider);
		const { user } = result;
		const idTokenResult = await user.getIdTokenResult();

		dispatch({
			type    : 'LOGGED_IN_USER',
			payload : {
				email : user.email,
				token : idTokenResult,
			},
		});
		return history.push('/');
	} catch (error) {
		alert(error.message);
	}
}

export async function onAuthStateAction(user, dispatch){
	const idTokenResult = await user.getIdTokenResult();
	return dispatch({
		type    : 'LOGGED_IN_USER',
		payload : {
			email : user.email,
			token : idTokenResult,
		},
	});
}

export async function logOutAction(history, dispatch){
	firebase.auth().signOut();
	dispatch({
		type    : 'LOGOUT',
		payload : null,
	});
	return history.push('/login');
}
