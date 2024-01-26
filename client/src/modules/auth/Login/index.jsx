import React,{ useEffect} from 'react';
import '../../../resources/styles/global.css';
import CustomLabel from '../../../library/components/Label';
import CustomInput from '../../../library/components/Input';
import CustomButton from '../../../library/components/Button';
import CustomSeparator from '../../../library/components/Separator';
import { string } from '../../../library/common/constants/strings';
import { type } from '../../../library/common/constants/types';
import validateLogin from '../../../library/helpers/validators/loginValidator';
import useInput from '../../../library/hooks/useInput';
import { logInAction, googleLogInAction } from '../../../library/common/actions/authentication';
import { useDispatch,useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';	

function Login() {
	
	// Hooks
	const { values, handleChange, handleSubmit, errors } = useInput(logInAction, validateLogin);
	
	const user = useSelector(({ user }) => user);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		if (user && user.token) {
			return history.push('/')
		}
	}, [history, user]);

	return(
		<div class="grid grid-cols-[50%_auto] gap-3 my-10">
			<div class="col-span-1"></div>
				<div class="container col-span-1 border-l-2 border-gray-200">
					<div className="w-8/12 mx-auto">
					<label className="text-4xl font-bold">
						Log in
					</label>
					<CustomLabel variant={"label default-color mt-10"} title={string.label.login.email} />
					<CustomInput
						type={type.input.email}
						value={values.email || ""}
						name="email"
						variant={ errors && errors.email ?"inp no-size error-border":"inp border border-gray-500 no-size"}
						// placeHolder={string.placeHolders.input.exampleOfEmail}
						onChange={(event)=>handleChange(event.target.name,event.target.value)}
						errorMessage={errors && errors.email}
					/>
					<CustomLabel variant={"label default-color mt-8"} title={string.label.login.password} />
					<CustomInput
						type={type.input.password}
						value={values.password || ""}
						name="password"
						variant={ errors && errors.password ?"inp no-size error-border":"inp border border-gray-500 no-size"}
						onChange={(event)=>handleChange(event.target.name,event.target.value)}
						errorMessage={errors && errors.password}
					/>
					<CustomButton variant={"button mt-10 bg-black no-size"} title={"Log in"} onClick={(event) => handleSubmit(event)} />
					<CustomLabel variant={"label default-color mt-8"} title={`Don't have an account?`}>
						<Link className={"text-blue-500 no-size ml-1"} to="/signup"> 
						    <span>Signup</span>
						</Link>
					</CustomLabel>  
					<CustomSeparator title={string.label.login.orSignInWith} />
					<CustomButton variant={"button bg-google-red-color no-size"} title={"Continue with Google"} onClick={() => googleLogInAction(history,dispatch)} />
				</div>
			</div>
		</div>
	)
}

export default Login;
