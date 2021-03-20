import React from 'react';
import '../../../resources/styles/global.css';
import CustomLabel from '../../../library/components/Label';
import CustomInput from '../../../library/components/Input';
import CustomButton from '../../../library/components/Button';
import { string } from '../../../library/common/constants/strings';
import { type } from '../../../library/common/constants/types';
import validateLogin from '../../../library/utilities/validators/loginValidator';
import useInput from '../../../library/hooks/useInput';

function Login() {

	const { values, handleChange, handleSubmit, errors } = useInput("",validateLogin);

	return(
		<div className="container default">
			<CustomLabel variant={"label default-color"} title={string.label.login.email} />
			<CustomInput
				type={type.input.email}
				value={values.email || ""}
				name="email"
				variant={ errors && errors.email ?"inp no-size error-border":"inp no-size"}
				placeHolder={string.placeHolders.input.exampleOfEmail}
				onChange={(event)=>handleChange(event.target.name,event.target.value)}
				errorMessage={errors && errors.email}
			/>
			<CustomLabel variant={"label default-color"} title={string.label.login.password} />
			<CustomInput
				type={type.input.password}
				value={values.password || ""}
				name="password"
				variant={ errors && errors.password ?"inp no-size error-border":"inp no-size"}
				onChange={(event)=>handleChange(event.target.name,event.target.value)}
				errorMessage={errors && errors.password}
			/>
			<CustomButton variant={"button bg-default-color no-size"} title={"Sign In"} onClick={() => handleSubmit()} />
		</div>
	)
}

export default Login;
