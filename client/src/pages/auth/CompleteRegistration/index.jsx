import React, { useEffect } from 'react';
import '../../../resources/styles/global.css';
import CustomInput from '../../../library/components/Input';
import CustomButton from '../../../library/components/Button';
import { string } from '../../../library/common/constants/strings';
import { type } from '../../../library/common/constants/types';
import { fetchFromStorage } from '../../../library/helpers/storage';
import useInput from '../../../library/hooks/useInput';
import { registerUserComplete } from '../../../library/helpers/auth/register';
import validateRegisterComplete from '../../../library/helpers/validators/registerUserComplete';

function CompleteRegistration(){
	const { values, handleChange, errors, handleSubmit } = useInput(
		registerUserComplete,
		validateRegisterComplete,
	);

	function populateEmailInput(){
		let email = fetchFromStorage('emailRegistration');
		handleChange('email', email);
	}
	useEffect(() => {
		populateEmailInput();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='container default'>
			<h3 className='text-lg font-semibold'>{string.label.register.complete}</h3>
			<CustomInput
				type={type.input.email}
				value={values.email || ''}
				name='email'
				disabled={true}
				variant={

						errors && errors.email ? 'inp no-size error-border' :
						'inp no-size my-5'
				}
				placeHolder={string.placeHolders.input.exampleOfEmail}
				onChange={handleChange}
				errorMessage={errors && errors.email}
			/>
			<CustomInput
				type={type.input.password}
				value={values.password || ''}
				name='password'
				variant={

						errors && errors.password ? 'inp no-size error-border' :
						'inp no-size my-5'
				}
				onChange={(event) => handleChange(event.target.name, event.target.value)}
				placeHolder={string.label.login.password}
				errorMessage={errors && errors.password}
			/>
			<CustomButton
				variant={'button bg-google-red-color no-size'}
				title={'Complete registration'}
				onClick={() => handleSubmit()}
			/>
		</div>
	);
}

export default CompleteRegistration;
