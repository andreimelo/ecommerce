// import { isEmail } from '../regex';

export default function validateAdminCategory(values){
	let errors = {};
	if (!values.name) {
		errors.name = 'Category is required';
	}
	// else if (isEmail(values.email)) {
	// 	errors.email = 'Invalid format email';
	// }
	return errors;
}
