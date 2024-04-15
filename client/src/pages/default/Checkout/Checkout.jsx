import React from 'react';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom/cjs/react-router-dom';
// import Modal from '../../../library/components/Modal';
// import { images } from '../../../resources/images';
// import SelectOption from '../../../library/components/SelectOption';
import Input from '../../../library/components/Input';
import SelectOption from '../../../library/components/SelectOption';
// import { productOptions } from '../../../library/common/constants/selectOptions';
// import { type } from '../../../library/common/constants/types';
// import { removeToCart } from '../../../library/helpers/cart';

const Checkout = () => {
	const { cart } = useSelector((state) => ({ ...state }));
	// const dispatch = useDispatch();
	const total = cart.reduce((acc, curr) => acc + curr.count * curr.price, 0);

	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			<section className='grid grid-cols-4 gap-4 my-10'>
				<div className='col-span-3'>
					<label className='text-2xl font-semibold'>Delivery Address</label>
					<div className='flex border my-5 p-5'>
						<div className='grid grid-cols-4 gap-4 w-full'>
							<div className='col-span-2 mx-3'>
								<div className='text-sm font-semibold mt-3 mb-2'>
									Address 1
								</div>
								<Input
									variant='border p-3 text-sm w-full'
									placeHolder='Street address or P.O Box'
								/>
							</div>
							<div className='col-span-2 mx-3'>
								<div className='text-sm font-semibold mt-3 mb-2'>
									Address 2
								</div>
								<Input
									variant='border p-3 text-sm w-full'
									placeHolder='Apt, Suite, Unit, Building (optional)'
								/>
							</div>
							<div className='col-span-2 mx-3'>
								<div className='text-sm font-semibold mt-3 mb-2'>
									State
								</div>
								<SelectOption
									labelClass=''
									variant='m-0 text-sm w-full'
									selectClass='rounded-none border p-3 text-sm w-full'
									placeHolder='Enter State'
								/>
							</div>
							<div className='col-span-2 mx-3'>
								<div className='text-sm font-semibold mt-3 mb-2'>
									City
								</div>
								<SelectOption
									labelClass=''
									variant='m-0 text-sm w-full'
									selectClass='rounded-none border p-3 text-sm w-full'
									placeHolder='Enter City'
								/>
							</div>
							<div className='col-span-1 mx-3 mb-5'>
								<div className='text-sm font-semibold mt-3 mb-2'>
									Zip Code
								</div>
								<Input
									variant='border p-3 text-sm w-full'
									placeHolder='Enter Zip Code'
								/>
							</div>
							<div className='col-end-4 mx-3 mb-5 '>
								<button className='mt-9 w-full text-center font-semibold text-white bg-black p-3'>
									Save
								</button>
							</div>
						</div>
					</div>
				</div>
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
							<span className='bg-gray-100 text-xs mx-1 p-1 rounded'>{`${cart.length} item`}</span>
						</div>
						<div className='text-sm'>{`$${total}`}</div>
					</div>
					<hr className='my-2' />
					<div className='flex justify-between font-semibold text-gray-800 p-1'>
						<div>Estimated total</div>
						<div className='text-sm'>{`$${total}`}</div>
					</div>
					<div className='text-gray-500 text-xs p-1'>
						Tax calculated during checkout
					</div>
					<hr className='my-2' />
					<div className='p-1'>
						<div className='mb-3 font-semibold text-gray-800'>Coupon</div>
						<div className='flex-none'>
							<Input
								variant='border p-2 w-full text-sm'
								placeHolder='Enter coupon'
							/>
						</div>
					</div>
					<div className='my-3 p-1'>
						<button className='w-full text-center font-semibold text-white bg-black p-3'>
							Place order
						</button>
					</div>
					{/* {cart.length !== 0 && (
						<div className='my-2 p-1'>
							{
								user ? <button
									className='w-full text-center font-semibold text-white bg-black p-3'
									onClick={() => history.push('/checkout')}
								>
									Proceed to Checkout
								</button> :
								<Link
									to={{
										pathname : '/login',
										state    : { from: 'cart' },
									}}
								>
									<button className='w-full text-center font-semibold text-white bg-black p-3'>
										Login to Checkout
									</button>
								</Link>}
						</div>
					)} */}
				</div>
			</section>
		</div>
	);
};

export default Checkout;
