// import { isEmail } from '../regex';

export default function validateForgotPasswordEmail(values){
	let errors = {};
	if (!values.name) {
		errors.name = 'Name is required';
	}
	// else if (isEmail(values.email)) {
	// 	errors.email = 'Invalid format email';
	// }
	return errors;
}
