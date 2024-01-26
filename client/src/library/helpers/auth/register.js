import {
	auth,
	registerConfig,
	forgotPasswordConfig,
} from '../../../library/common/config/firebase';
import { updatePassword } from 'firebase/auth';
import { saveToStorage } from '../storage';
import { createOrUpdateUser } from '../../services/auth';
import {
	sendPasswordResetEmail,
	sendSignInLinkToEmail,
	signInWithEmailLink,
} from 'firebase/auth';

export async function forgotPassword(values){
	try {
		const result = await sendPasswordResetEmail(
			auth,
			values.email,
			forgotPasswordConfig,
		);
		// add component success
		alert(`Check your email for password reset link`);
		return result;
	} catch (error) {
		alert(error.message);
	}
}

export async function registerUserEmail(values){
	try {
		const result = await sendSignInLinkToEmail(auth, values.email, registerConfig);
		// add component success
		saveToStorage('emailRegistration', values.email);
		alert(
			`Email is sent to ${values.email}. Click the link to complete your registration`,
		);
		return result;
	} catch (error) {
		// add component error
		alert(error.message);
	}
}

export async function registerUserComplete(values, history, dispatch){
	try {
		let { user: { emailVerified } } = await signInWithEmailLink(
			auth,
			values.email,
			window.location.href,
		);
		if (emailVerified) {
			let user = auth.currentUser;
			await updatePassword(auth, values.password);

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

			return history.push('/');
		}
	} catch (error) {
		alert(error);
	}
}
