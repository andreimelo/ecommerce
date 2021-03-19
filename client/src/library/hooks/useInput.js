import { useEffect, useState } from 'react';

const useInput = (callback, validate) => {
	const [
		values,
		setValues,
	] = useState({});
	const [
		errors,
		setErrors,
	] = useState({});
	const [
		isSubmitting,
		setIsSubmitting,
	] = useState(false);

	useEffect(
		() => {
			if (Object.keys(errors).length === 0 && isSubmitting) {
				callback(values);
			}
		},
		[
			values,
			errors,
			callback,
			isSubmitting,
		],
	);

	const handleSubmit = (event) => {
		if (event) event.preventDefault();
		setErrors(validate(values));
		setIsSubmitting(true);
	};

	const handleChange = (name, event) => {
		setValues((values) => ({
			...values,
			[name] : event,
		}));
	};

	return {
		handleChange,
		handleSubmit,
		values,
		errors,
	};
};

export default useInput;
