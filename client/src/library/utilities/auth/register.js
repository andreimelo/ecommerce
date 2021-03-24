import { auth, registerConfig } from '../../../library/common/config/firebase';
import { saveToStorage } from '../storage';

export async function registerUserEmail(values){
	try {
		const result = await auth.sendSignInLinkToEmail(values.email, registerConfig);
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

export async function registerUserComplete(values, history){
	try {
		let { user: { emailVerified } } = await auth.signInWithEmailLink(
			values.email,
			window.location.href,
		);
		if (emailVerified) {
			let user = auth.currentUser;
			await user.updatePassword(values.password);
			// const idTokenResult = await user.getIdTokenResult();
			return history.push('/');
		}
	} catch (error) {
		alert(error);
	}
}
