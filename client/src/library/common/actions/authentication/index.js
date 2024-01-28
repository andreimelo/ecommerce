import { auth, googleAuthProvider } from '../../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createOrUpdateUser, currentUser } from '../../../services/auth';
import { roleBasedRedirect } from '../../../helpers/auth/role';

export async function logInAction(values, history, dispatch){
	try {
		const result = await signInWithEmailAndPassword(
			auth,
			values.email,
			values.password,
		);
		const { user } = result;
		const idTokenResult = await user.getIdTokenResult();

		let { name, role, _id } = await createOrUpdateUser(idTokenResult.token);

		dispatch({
			type    : 'LOGGED_IN_USER',
			payload : {
				name  : name,
				email : user.email,
				token : idTokenResult.token,
				role  : role,
				_id   : _id,
			},
		});

		return roleBasedRedirect(role, history);
	} catch (error) {
		alert(error.message);
	}
}

export async function googleLogInAction(history, dispatch){
	try {
		const result = await signInWithPopup(auth, googleAuthProvider);
		const { user } = result;
		const idTokenResult = await user.getIdTokenResult();

		const { name, role, _id } = await createOrUpdateUser(idTokenResult.token);

		dispatch({
			type    : 'LOGGED_IN_USER',
			payload : {
				name     : name,
				email    : user.email,
				token    : idTokenResult.token,
				role     : role,
				_id      : _id,
				imageURL : user.photoURL,
			},
		});
		return roleBasedRedirect(role, history);
	} catch (error) {
		alert(error.message);
	}
}

export async function onAuthStateAction(user, dispatch){
	try {
		const idTokenResult = await user.getIdTokenResult();
		const { name, role, _id } = await currentUser(idTokenResult.token);

		return dispatch({
			type    : 'LOGGED_IN_USER',
			payload : {
				name     : name,
				email    : user.email,
				token    : idTokenResult.token,
				role     : role,
				_id      : _id,
				imageURL : user.photoURL,
			},
		});
	} catch (error) {
		console.log('Auth State Action Log', error);
	}
}

export async function logOutAction(history, dispatch){
	signOut(auth);
	dispatch({
		type    : 'LOGOUT',
		payload : null,
	});
	return history.push('/login');
}
