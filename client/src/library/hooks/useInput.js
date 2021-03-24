import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

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

	const history = useHistory();
	const dispatch = useDispatch();

	useEffect(
		() => {
			if (Object.keys(errors).length === 0 && isSubmitting) {
				callback(values, history, dispatch);
			}
		},
		[
			values,
			errors,
			dispatch,
			callback,
			history,
			isSubmitting,
		],
	);

	const handleSubmit = (event) => {
		if (event) event.preventDefault();
		setErrors(validate(values));
		setIsSubmitting(true);
	};

	const handleChange = (name, value) => {
		setValues((values) => ({
			...values,
			[name] : value,
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
