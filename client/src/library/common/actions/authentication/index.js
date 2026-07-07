import { auth, googleAuthProvider } from '../../config/firebase';
import { signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createOrUpdateUser, currentUser, logoutUser } from '../../../services/auth';
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
		console.error('Login error:', error);
		const errorMessage = error.message || 'Failed to login';
		alert(errorMessage);
		throw error;
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
		console.error('Google login error:', error.code);
		const errorMessage = error.message || 'Failed to login with Google';
		alert(errorMessage);
		throw error;
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
		console.error('Auth state action error:', error);
		// Silent fail - user will be treated as logged out
	}
}

export async function logOutAction(history, dispatch){
try {
		// Get current user from Firebase to get their token
		const currentFirebaseUser = auth.currentUser;
		if (currentFirebaseUser) {
			const idTokenResult = await currentFirebaseUser.getIdTokenResult();
			// Call server logout to clear session cookies
			try {
				await logoutUser(idTokenResult.token);
			} catch (logoutError) {
				console.error('Server logout error:', logoutError);
				// Continue with Firebase signout even if server logout fails
			}
		}
	} catch (error) {
		console.error('Logout error:', error);
	}

	// Sign out from Firebase
	try {
		await signOut(auth);
	} catch (error) {
		console.error('Firebase signout error:', error);
	}

	// Clear Redux state
	dispatch({
		type    : 'LOGOUT',
		payload : null,
	});

	return history.push('/');
}
