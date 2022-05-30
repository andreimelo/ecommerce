import { isEmail } from '../regex';

export default function validateRegisterComplete(values){
	let errors = {};
	if (!values.email) {
		errors.email = 'Email is required';
	}
	else if (isEmail(values.email)) {
		errors.email = 'Invalid format email';
	}
	if (!values.password) {
		errors.password = 'Password is required';
	}
	else if (values.password.length < 6) {
		errors.password = 'Password must be at least 6 characters long';
	}
	return errors;
}
