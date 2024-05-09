import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { createPaymentIntent } from '../../../../library/services/stripe';
import { style } from './constants/cart';
import { removeFromStorage } from '../../../../library/helpers/storage';
import '../component/stripe.css';
import { createOrder, emptyCart } from '../../../../library/services/user';

const StripeCheckout = () => {
	// const history = useHistory();
	const dispatch = useDispatch();
	const { user, coupon } = useSelector((state) => ({ ...state }));
	const [
		success,
		setSuccess,
	] = useState(false);
	const [
		error,
		setError,
	] = useState(null);
	const [
		processing,
		setProcessing,
	] = useState('');
	const [
		disable,
		setDisable,
	] = useState(true);

	const [
		stripeData,
		setStripeData,
	] = useState('');

	const stripe = useStripe();

	const elements = useElements();

	useEffect(
		() => {
			async function fetchCreatePaymentIntent(){
				try {
					const result = await createPaymentIntent(user.token);
					console.log(result);
					setStripeData(result);
				} catch (error) {
					alert(error);
				}
			}
			fetchCreatePaymentIntent();
		},
		[
			user.token,
		],
	);

	async function handleSubmit(e){
		e.preventDefault();
		setProcessing(true);
		const payload = await stripe.confirmCardPayment(stripeData.clientSecret, {
			payment_method : {
				card            : elements.getElement(CardElement),
				billing_details : {
					name : e.target.name.value,
				},
			},
		});

		if (payload.error) {
			setError(`Payment failed ${payload.error.message}`);
			setProcessing(false);
		}
		else {
			// console.log(JSON.stringify(payload, null, 4));
			const result = await createOrder(payload, user.token);
			if (result.ok) {
				// empty
				if (typeof window !== 'undefined') {
					removeFromStorage('cart');
					dispatch({
						type    : 'ADD_TO_CART',
						payload : [],
					});
					dispatch({
						type    : 'COUPON_APPLIED',
						payload : false,
					});
					await emptyCart(user.token);
				}
			}
			setError(null);
			setProcessing(false);
			setSuccess(true);
		}
	}
	async function handleChange(e){
		setDisable(e.empty);
		setError(

				e.error ? e.error.message :
				'',
		);
	}
	return (
		<div className='mb-10'>
			{
				coupon || stripeData.totalDiscount ? <div
					class='flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50'
					role='alert'
				>
					<span class='sr-only'>Info</span>
					<div>
						<span class='font-medium'>Coupon applied!</span>
					</div>
				</div> :
				<div
					class='flex items-center p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50'
					role='alert'
				>
					<span class='sr-only'>Info</span>
					<div>
						<span class='font-medium'>No coupon applied!</span>
					</div>
				</div>}
			<div className='flex border  text-sm border-gray-200 rounded-lg my-5'>
				<div className='p-3 w-full'>
					Total Payable:{' '}
					<span className='font-semibold'>
						${(stripeData.payable / 100).toFixed(2)}{' '}
					</span>
				</div>
			</div>
			<form id='payment-form' className='stripe-form' onSubmit={handleSubmit}>
				<CardElement id='card-element' options={style} onChange={handleChange} />
				<button
					className='stripe-button mt-5'
					disabled={processing || disable || success}
				>
					<span id='button-text'>
						{
							processing ? <div className='spinner' id='spinner' /> :
							'Pay'}
					</span>
				</button>
				{error && (
					<div id='card-error' role='alert'>
						{error}
					</div>
				)}
				<div
					className={

							success ? 'result-message text-center my-5' :
							'result-message hidden'
					}
				>
					Payment Successful!
					<Link to='/user/orders'> See your order history.</Link>
				</div>
			</form>
		</div>
	);
};

export default StripeCheckout;
