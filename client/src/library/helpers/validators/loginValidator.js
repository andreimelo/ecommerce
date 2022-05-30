import { isEmail } from '../regex';

export default function validateLogin(values){
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
	return errors;
}
