import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../../library/components/Input';
import SelectOption from '../../../library/components/SelectOption';
import {
	getUserCart,
	saveUserAddress,
	createCashOrder,
} from '../../../library/services/user';
import useInput from '../../../library/hooks/useInput';
import { applyCoupon } from '../../../library/services/coupon';
import { emptyCart } from '../../../library/services/user';
import { paymentOption } from '../../../library/common/constants/selectOptions';
import { removeFromStorage } from '../../../library/helpers/storage';

const Checkout = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { cart, user, coupon } = useSelector((state) => ({ ...state }));
	const { values, handleChange, handleSubmit } = useInput(handleSaveAddress, () => {
		return {};
	});
	const [
		couponInput,
		setCoupon,
	] = useState('');
	const [
		totalDiscount,
		setTotalDiscount,
	] = useState('');
	const { address1, address2, state, city, zip_code, payment } = values;
	const subTotal = cart.reduce((acc, curr) => acc + curr.count, 0);
	const [
		total,
		setTotal,
	] = useState(0);

	useEffect(
		() => {
			async function fetchUserCart(){
				try {
					if (cart.length > 0) {
						const result = await getUserCart(user.token);
						setTotal(result.cartTotal);
					}
				} catch (error) {
					alert(error);
				}
			}
			fetchUserCart();

			// if page is refresh coupon state should be false and redirect to home
			if (!totalDiscount && cart.length === 0) {
				dispatch({
					type    : 'COUPON_APPLIED',
					payload : false,
				});
				return history.push('/');
			}
		},
		[
			user.token,
			totalDiscount,
			cart.length,
			dispatch,
			history,
		],
	);

	async function handleApplyCoupon(){
		try {
			const result = await applyCoupon(couponInput, user.token);
			if (result.err) {
				dispatch({
					type    : 'COUPON_APPLIED',
					payload : false,
				});
				alert(result.err);
			}
			setTotalDiscount(result);
			dispatch({
				type    : 'COUPON_APPLIED',
				payload : true,
			});
			// console.log(result);
			// console.log(totalDiscount);
		} catch (error) {
			alert(error);
		}
	}

	async function handleSaveAddress(){
		try {
			await saveUserAddress(values, user.token);
			alert('Successfully save');
		} catch (error) {
			alert(error);
		}
	}

	async function handleSubmitPayment(){
		try {
			if (payment === paymentOption[0].value) {
				return history.push('/payment');
			}
			const result = await createCashOrder(payment, user.token, coupon);
			if (result.ok) {
				if (typeof window !== 'undefined') removeFromStorage('cart');
				dispatch({
					type    : 'ADD_TO_CART',
					payload : [],
				});

				dispatch({
					type    : 'COUPON_APPLIED',
					payload : false,
				});

				await emptyCart(user.token);

				setTimeout(() => {
					history.push('/');
				}, 1400);
			}
		} catch (error) {
			alert(error);
		}
	}

	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			<section className='grid grid-cols-4 gap-4 my-10'>
				<form className='col-span-3' onSubmit={handleSubmit}>
					<div className='flex border my-5 p-5'>
						<div className='grid grid-cols-4 gap-4 w-full'>
							<div className='col-span-4 text-2xl font-semibold ml-3'>
								Delivery Address
							</div>
							<div className='col-span-2 mx-3'>
								<div className='text-sm font-semibold mb-2'>
									Address 1
								</div>
								<Input
									name='address1'
									value={address1}
									onChange={(event) =>
										handleChange(
											event.target.name,
											event.target.value,
										)}
									variant='border p-3 text-sm w-full'
									placeHolder='Street address or P.O Box'
								/>
							</div>
							<div className='col-span-2 mx-3'>
								<div className='text-sm font-semibold mb-2'>
									Address 2
								</div>
								<Input
									name='address2'
									value={address2}
									onChange={(event) =>
										handleChange(
											event.target.name,
											event.target.value,
										)}
									variant='border p-3 text-sm w-full'
									placeHolder='Apt, Suite, Unit, Building (optional)'
								/>
							</div>
							<div className='col-span-2 mx-3'>
								<div className='text-sm font-semibold mb-2'>State</div>
								<SelectOption
									labelClass=''
									name='state'
									value={state}
									onChange={(event) =>
										handleChange(
											event.target.name,
											event.target.value,
										)}
									variant='m-0 text-sm w-full'
									selectClass='rounded-none border p-3 text-sm w-full'
									placeHolder='Enter State'
								/>
							</div>
							<div className='col-span-2 mx-3'>
								<div className='text-sm font-semibold mb-2'>City</div>
								<SelectOption
									labelClass=''
									name='city'
									value={city}
									onChange={(event) =>
										handleChange(
											event.target.name,
											event.target.value,
										)}
									variant='m-0 text-sm w-full'
									selectClass='rounded-none border p-3 text-sm w-full'
									placeHolder='Enter City'
								/>
							</div>
							<div className='col-span-1 mx-3	'>
								<div className='text-sm font-semibold mb-3'>Zip Code</div>
								<Input
									value={zip_code}
									onChange={(event) =>
										handleChange(
											event.target.name,
											event.target.value,
										)}
									variant='border p-3 text-sm w-full'
									placeHolder='Enter Zip Code'
									name='zip_code'
								/>
							</div>
							<div className='col-end-4 mx-3 mt-6'>
								<button className='w-full text-center font-semibold text-white bg-black p-3'>
									Save
								</button>
							</div>
							<div className='col-span-2 mx-3 mb-5'>
								<div className='text-2xl font-semibold my-5'>
									Payment Option
								</div>
								<SelectOption
									name='payment'
									value={payment}
									onChange={(event) =>
										handleChange(
											event.target.name,
											event.target.value,
										)}
									data={paymentOption}
									variant='m-0 text-sm w-full'
									selectClass='rounded-none border p-3 text-sm w-full'
									placeHolder='Select option'
								/>
							</div>
						</div>
					</div>
				</form>
				{/* <div className='grid-rows-3'>
					<label className='text-2xl font-semibold'>Delivery Address</label>
					<div className='flex border my-5'>Hello</div>
				</div> */}

				<div className='col-span-1 h-fit p-4 border-solid border'>
					<label className='text-l font-semibold'>Order Summary</label>
					<hr className='my-2' />
					<div className='flex justify-between text-gray-800 p-1'>
						<div>
							Subtotal
							<span className='bg-gray-100 text-xs mx-1 p-1 rounded'>{`${subTotal} item`}</span>
						</div>
						<div
							className={

									totalDiscount.discount ? 'line-through text-sm' :
									'text-sm'
							}
						>{`$${total}`}</div>
					</div>
					{totalDiscount &&
					totalDiscount.discount && (
						<div className='flex justify-between text-xs text-gray-800 p-1'>
							<div>
								Discount
								<span className='bg-gray-100 mx-1 p-1 rounded'>{`${totalDiscount.discount}%`}</span>
							</div>
						</div>
					)}
					<hr className='my-2' />
					<div className='flex justify-between font-semibold text-gray-800 p-1'>
						<div>Estimated total</div>
						<div>
							{
								totalDiscount.discount ? totalDiscount.totalDiscount :
								total}
						</div>
					</div>
					<div className='text-gray-500 text-xs p-1'>
						Tax calculated during checkout
					</div>
					<hr className='my-2' />
					<div className='p-1'>
						<div className='mb-3 font-semibold text-gray-800'>Coupon</div>
						<div className='flex '>
							<Input
								variant='border p-2 w-full text-sm'
								name='coupon'
								onChange={(event) => setCoupon(event.target.value)}
								placeHolder='Enter coupon'
							/>
							<button
								onClick={() => handleApplyCoupon()}
								className='w-full text-center font-semibold text-white bg-black p-3'
							>
								Apply
							</button>
						</div>
					</div>
					<div className='my-3 p-1'>
						<button
							className='w-full text-center font-semibold text-white bg-black p-3'
							onClick={() => handleSubmitPayment()}
						>
							Place order
						</button>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Checkout;
