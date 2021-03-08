import React from 'react';
import '../../../resources/styles/global.css';
import CustomInput from '../../../library/components/Input';
import CustomButton from '../../../library/components/Button';
import { string } from '../../../library/common/constants/strings';
import { type } from '../../../library/common/constants/types';
import useInput from '../../../library/hooks/useInput';

function CompleteRegistration() {

	const { values, handleChange} = useInput("","");

	return(
		<div className="container default">
			<h3>{string.label.register.complete}</h3>
			<CustomInput
				type={type.input.email}
				value={values.email || ""}
				name="email"
				disabled={true}
				variant={"inp no-size"}
				placeHolder={string.placeHolders.input.exampleOfEmail}
				onChange={handleChange}
				// errorMessage={errors && errors.email}
			/>
			<CustomInput
				type={type.input.password}
				value={values.password || ""}
				name="password"
				variant={"inp no-size"}
				onChange={handleChange}
				placeHolder={string.label.login.password}
				// errorMessage={errors && errors.email}
			/>
			<CustomButton variant={"button bg-default-color no-size"} title={"Submit"}  />
		</div>
	)
}

export default CompleteRegistration;
