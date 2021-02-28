import React from 'react';
import { type } from '../../../library/common/constants/types';
import CustomButton from '../../../library/components/Button';
import CustomLabel from '../../../library/components/Label';
import CustomInput from '../../../library/components/Input';
import useInput from '../../../library/hooks/useInput';
import { registerUserEmail } from '../../../library/utilities/auth/register';
import validateRegisterEmail from '../../../library/utilities/validators/registerEmailValidator';
import '../../../resources/styles/global.css';
import { string } from '../../../library/common/constants/strings';

function Register() {
	
	const { values, handleChange, handleSubmit ,errors } = useInput(registerUserEmail,validateRegisterEmail);
	
	return (
		<div className="container default"> 
			<CustomLabel variant={"register-label default-color"} title="Register your email"/>
			<CustomInput
				type={type.input.default}
				value={values.email || ""}
				name="email"
				variant={ errors && errors.email ?"inp no-size error-border":"inp no-size"}
				placeHolder={string.placeHolders.input.exampleOfEmail}
				onChange={handleChange}
				errorMessage={errors && errors.email}
			/>
			<CustomButton title={"Submit"} onClick={() => handleSubmit()} />
		</div>
	);
}

export default Register;
