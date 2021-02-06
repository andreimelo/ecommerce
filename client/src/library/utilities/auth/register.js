import {auth, registerConfig} from '../../../library/common/config/firebase';

export async function registerUserEmail(values){
	try {
		const result = await auth.sendSignInLinkToEmail(
			values.email,
			registerConfig,
		);
		// add component success
		console.log(result, 'register email');
		return result;
	} catch (error) {
		// add component error
		alert(error.message);
	}
}
