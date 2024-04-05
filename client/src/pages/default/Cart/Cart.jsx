import React from 'react';
import { useSelector } from 'react-redux';

function Cart(){
	// const dispatch = useDispatch();
	const { user, cart } = useSelector((state) => ({ ...state }));

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<section className='grid grid-cols-3 gap-3 gap-4 my-10'>
				<div className='col-span-2'>
					<label className='text-2xl font-semibold'>My Cart</label>
				</div>
				<div className='col-span-1 p-4 border-solid border-2 border-gray-300'>
					<label className='text-l font-semibold'>Order Summary</label>
					<hr className='my-2' />
					<div className='flex justify-between text-gray-800 p-1'>
						<div>
							Subtotal
							<span className='bg-gray-100 text-sm mx-1'>{`${cart.length} item`}</span>
						</div>
						<div className='text-sm'>$total</div>
					</div>
					<hr className='my-2' />
					<div className='flex justify-between font-semibold text-gray-800 p-1'>
						<div>Estimated total</div>
						<div className='text-sm'>$total</div>
					</div>
					<div className='text-gray-500 text-xs p-1'>
						Tax calculated during checkout
					</div>
					<div className='my-2 p-1'>
						{
							user ? <button className='w-full text-center font-semibold text-white bg-black p-3'>
								Proceed to Checkout
							</button> :
							<button className='w-full text-center font-semibold text-white bg-black p-3'>
								Login to Checkout
							</button>}
					</div>
				</div>
			</section>
		</div>
	);
}

export default Cart;
