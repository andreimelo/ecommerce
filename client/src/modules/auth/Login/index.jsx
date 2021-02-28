import React from 'react';
import '../../../resources/styles/global.css';
import CustomLabel from '../../../library/components/Label';
import CustomInput from '../../../library/components/Input';
import { string } from '../../../library/common/constants/strings';
import { type } from '../../../library/common/constants/types';
import useInput from '../../../library/hooks/useInput';

function Login() {

	const { values, handleChange, } = useInput("","");

	return(
		<div className="container default">
			<CustomLabel variant={"label default-color"} title={string.label.login.email} />
			<CustomInput
				type={type.input.email}
				value={values.email || ""}
				name="email"
				variant={"inp no-size"}
				placeHolder={string.placeHolders.input.exampleOfEmail}
				onChange={handleChange}
				// errorMessage={errors && errors.email}
			/>
			<CustomLabel variant={"label default-color"} title={string.label.login.password} />
			<CustomInput
				type={type.input.password}
				value={values.password || ""}
				name="password"
				variant={"inp no-size"}
				onChange={handleChange}
				// errorMessage={errors && errors.email}
			/>
		</div>
	)
}

export default Login;
