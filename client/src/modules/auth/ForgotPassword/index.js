import React from 'react';
import { type } from '../../../library/common/constants/types';
import CustomButton from '../../../library/components/Button';
import CustomLabel from '../../../library/components/Label';
import CustomInput from '../../../library/components/Input';
import useInput from '../../../library/hooks/useInput';
import '../../../resources/styles/global.css';
import { string } from '../../../library/common/constants/strings';
import validateForgotPasswordEmail from '../../../library/utilities/validators/forgotPasswordValidator';
import { forgotPassword } from '../../../library/utilities/auth/register';

function ForgotPassword(){
	const { values, handleChange, handleSubmit, errors } = useInput(
		forgotPassword,
		validateForgotPasswordEmail,
	);

	return (
		<div className='container default'>
			<CustomLabel
				variant={'label default-color'}
				title={string.label.forgot.password}
			/>
			<CustomInput
				type={type.input.default}
				value={values.email || ''}
				name='email'
				variant={

						errors && errors.email ? 'inp no-size error-border' :
						'inp no-size'
				}
				placeHolder={string.placeHolders.input.exampleOfEmail}
				onChange={(event) => handleChange(event.target.name, event.target.value)}
				errorMessage={errors && errors.email}
			/>
			<CustomButton
				variant={'button bg-default-color no-size'}
				title={'Submit'}
				onClick={() => handleSubmit()}
			/>
		</div>
	);
}

export default ForgotPassword;
