import React,{ useEffect } from 'react';
import { type } from '../../../library/common/constants/types';
import CustomButton from '../../../library/components/Button';
import CustomLabel from '../../../library/components/Label';
import CustomInput from '../../../library/components/Input';
import useInput from '../../../library/hooks/useInput';
import { registerUserEmail } from '../../../library/helpers/auth/register';
import validateRegisterEmail from '../../../library/helpers/validators/registerEmailValidator';
import '../../../resources/styles/global.css';
import { string } from '../../../library/common/constants/strings';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function SignUp() {
	
	const { values, handleChange, handleSubmit ,errors } = useInput(registerUserEmail,validateRegisterEmail);
	
	const user = useSelector(({ user }) => user);
	const history = useHistory();

	useEffect(() => {
		if (user && user.token) {
			return history.push('/')
		}
	}, [history, user]);

	return (
		<div className="container default"> 
			<CustomLabel variant={"label default-color"} title={string.label.register.email}/>
			<CustomInput
				type={type.input.default}
				value={values.email || ""}
				name="email"
				variant={ errors && errors.email ?"inp no-size error-border":"inp border border-gray-500 no-size"}
				placeHolder={string.placeHolders.input.exampleOfEmail}
				onChange={(event)=>handleChange(event.target.name,event.target.value)}
				errorMessage={errors && errors.email}
			/>
			<CustomButton variant={"button mt-10 bg-default-color no-size"} title={"Submit"} onClick={() => handleSubmit()} />
		</div>
	);
}

export default SignUp;
