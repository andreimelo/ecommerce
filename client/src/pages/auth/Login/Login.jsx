import React, { useEffect } from 'react';
import '../../../resources/styles/global.css';
import CustomLabel from '../../../library/components/Label';
import CustomInput from '../../../library/components/Input';
import CustomButton from '../../../library/components/Button';
import CustomSeparator from '../../../library/components/Separator';
import { string } from '../../../library/common/constants/strings';
import { type } from '../../../library/common/constants/types';
import validateLogin from '../../../library/helpers/validators/loginValidator';
import useInput from '../../../library/hooks/useInput';
import {
	logInAction,
	googleLogInAction,
} from '../../../library/common/actions/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { images } from '../../../resources/images';

function Login(){
	const { values, handleChange, handleSubmit, errors } = useInput(
		logInAction,
		validateLogin,
	);

	const user = useSelector(({ user }) => user);
	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const intended = history && history.location.state;
		if (intended) return;
		if (user && user.token) {
			history.push('/');
		}
	}, [history, user]);

	return (
		<div className='min-h-screen'>
			<div className='mx-auto grid min-h-screen w-full max-w-screen-xl lg:grid-cols-[1.08fr_0.92fr]'>
				<section className='relative overflow-hidden bg-[linear-gradient(180deg,#0d6efd_0%,#0b57d0_52%,#083b9a_100%)] text-white sm:px-8 sm:py-5 lg:px-12 lg:py-12'>
					<div className='absolute inset-0'>
						<div className='absolute -left-24 top-0 h-72 w-72 rounded-full bg-white/15 blur-3xl' />
						<div className='absolute right-[-3rem] top-24 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl' />
						<div className='absolute bottom-[-5rem] left-12 h-72 w-72 rounded-full bg-sky-200/15 blur-3xl' />
					</div>

					<div className='relative flex flex-col'>
						<div className='max-w-2xl'>
							<img src={images.brandLogo} alt='Melo Electronics' className='h-12 w-auto brightness-0 invert' />
							<p className='mt-10 text-sm font-semibold uppercase tracking-[0.38em] text-white/75'>Melo Electronics</p>
							<h2 className='mt-4 max-w-xl text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl'>
								Lorem Ipsum Dolor.
							</h2>
							<p className='mt-6 max-w-lg text-base leading-8 text-white/82 sm:text-lg'>
								Sign in to keep your orders, wishlist, reviews, and recommendations in sync across every device.
							</p>
						</div>


						<div className='flex items-end justify-center lg:justify-start mt-5 gap-4 sm:gap-6'>
							<div className='relative w-full max-w-[720px] overflow-hidden rounded-[2.5rem] border border-white/15 bg-white/10 px-5 py-6 shadow-[0_26px_80px_rgba(5,25,80,0.28)] backdrop-blur-md sm:px-6 sm:py-7'>
								<div className='absolute left-8 top-8 h-24 w-24 rounded-full bg-white/20 blur-3xl' />
								<div className='absolute right-10 top-8 h-36 w-36 rounded-full bg-cyan-200/20 blur-3xl' />
								<div className='relative flex items-end justify-center gap-4 sm:gap-6'>
									<div className='hidden w-[150px] rounded-[1.4rem] border border-white/15 bg-white/10 p-3 sm:block'>
										<div className='h-24 rounded-[1rem] bg-white/10 p-3'>
											<div className='h-2 w-10 rounded-full bg-white/35' />
											<div className='mt-4 space-y-2'>
												<div className='h-2 w-16 rounded-full bg-white/35' />
												<div className='h-12 rounded-[0.85rem] bg-white/15' />
											</div>
										</div>
									</div>

									<div className='relative flex h-[280px] w-[186px] items-end justify-center rounded-[2.35rem] border-[10px] border-[#0a1633] bg-[#0b0f1f] shadow-[0_28px_60px_rgba(6,12,30,0.38)]'>
										<div className='absolute left-1/2 top-0 h-4 w-20 -translate-x-1/2 rounded-b-2xl bg-[#0a1633]' />
										<div className='absolute right-4 top-4 h-2 w-2 rounded-full border border-white/30' />
										<div className='absolute left-4 top-5 h-2 w-2 rounded-full border border-white/30' />
										<div className='mb-4 h-[228px] w-[150px] overflow-hidden rounded-[1.5rem] bg-[linear-gradient(180deg,#f6fbff,#ffffff)] p-3'>
											<div className='flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-400'>
												<span>Shop now</span>
												<span>•</span>
											</div>
											<div className='mt-4 rounded-[1.1rem] bg-white p-2 shadow-sm'>
												<img src={images.default} alt='Featured product' className='h-36 w-full rounded-[0.95rem] object-cover' />
											</div>
											<div className='mt-3 flex items-center justify-between'>
												<div>
													<div className='text-[10px] uppercase tracking-[0.22em] text-slate-400'>Featured</div>
													<div className='text-sm font-semibold text-slate-900'>Trending deal</div>
												</div>
												<div className='rounded-full bg-blue-600 px-3 py-1 text-[10px] font-semibold text-white'>Now</div>
											</div>
										</div>
									</div>

									<div className='hidden w-[126px] self-start rounded-[1.4rem] border border-white/15 bg-white/10 p-3 md:block'>
										<div className='text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70'>Live</div>
										<div className='mt-3 h-3 w-20 rounded-full bg-white/35' />
										<div className='mt-2 h-3 w-12 rounded-full bg-white/25' />
										<div className='mt-4 rounded-2xl bg-white/15 p-3 text-white backdrop-blur-sm'>
											<div className='text-[10px] uppercase tracking-[0.25em] text-white/60'>Saved</div>
											<div className='mt-1 text-sm font-semibold'>12 items</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						</div>
					</section>

					<section className='flex items-center justify-center bg-white px-6 py-10 sm:px-8 lg:px-12'>
						<div className='w-full max-w-[520px] rounded-[2rem] px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12'>
							<div className='text-center'>
								<p className='text-sm font-semibold uppercase tracking-[0.42em] text-blue-600'>Welcome back</p>
								<h1 className='mt-4 text-4xl font-black tracking-tight text-slate-950'>{string.routes.loginTitle}</h1>
								<p className='mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500'>
									Continue where you left off. Your account keeps your preferences, purchases, and reviews in one place.
								</p>
							</div>

							<div className='mt-8 space-y-5'>
								<div>
									<CustomLabel
										variant={'label text-xs font-semibold uppercase tracking-[0.24em] text-slate-500'}
										title={string.label.login.email}
									/>
									<CustomInput
										type={type.input.email}
										value={values.email || ''}
										name='email'
										variant={
											errors && errors.email ?
												'inp no-size error-border mt-2 w-full rounded-2xl border border-blue-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500' :
												'inp border border-slate-200 mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500'
										}
										placeHolder={string.placeHolders.input.exampleOfEmail}
										onChange={(event) => handleChange(event.target.name, event.target.value)}
										errorMessage={errors && errors.email}
									/>
								</div>

								<div>
									<CustomLabel
										variant={'label text-xs font-semibold uppercase tracking-[0.24em] text-slate-500'}
										title={string.label.login.password}
									/>
									<CustomInput
										type={type.input.password}
										value={values.password || ''}
										name='password'
										variant={
											errors && errors.password ?
												'inp no-size error-border mt-2 w-full rounded-2xl border border-blue-300 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-blue-500' :
												'inp border border-slate-200 mt-2 w-full rounded-2xl bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500'
										}
										onChange={(event) => handleChange(event.target.name, event.target.value)}
										errorMessage={errors && errors.password}
									/>
								</div>

								<div className='pt-2'>
									<CustomButton
										variant={'button w-full rounded-2xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700'}
										title={'Log in'}
										onClick={(event) => handleSubmit(event)}
									/>
								</div>

								<div className='flex items-center justify-between gap-4 text-sm text-slate-500'>
									<CustomLabel
										variant={'label text-sm text-slate-500'}
										title={string.routes.noAccountTitle}
									>
										<Link className={'ml-1 font-semibold text-blue-600 hover:text-blue-700'} to='/signup'>
											<span>{string.routes.signUpTitle}</span>
										</Link>
									</CustomLabel>
								</div>

								<CustomSeparator title={string.label.login.orSignInWith} />

								<CustomButton
									variant={'button bg-google-red-color w-full rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50'}
									title={string.routes.googleTitle}
									onClick={() => googleLogInAction(history, dispatch)}
								/>
							</div>
						</div>
					</section>
				</div>
			</div>
	);
}

export default Login;
