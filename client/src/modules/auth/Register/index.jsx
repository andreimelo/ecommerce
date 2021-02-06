import React from 'react';
import { type } from '../../../library/common/constants/types';
import CustomButton from '../../../library/components/Button';
import CustomInput from '../../../library/components/Input';
import useInput from '../../../library/hooks/useInput';
import { registerUserEmail } from '../../../library/utilities/auth/register';
import validateRegisterEmail from '../../../library/utilities/validators/registerEmailValidator';

function Register() {
	
	const { values, handleChange, handleSubmit ,errors } = useInput(registerUserEmail,validateRegisterEmail);
	
	return (
		<div> 
			<div>
				Welcome to Register
			</div>
			<CustomInput
				type={type.input.default}
				value={values.email || ""}
				name="email"
				onChange={handleChange}
			/>
			{errors && <div>{errors?.email}</div>}
			<CustomButton title={"Submit"} onClick={() => handleSubmit()} />
		</div>
	);
}

export default Register;
