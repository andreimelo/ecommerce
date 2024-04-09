import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Modal from '../../../library/components/Modal';

function Cart(){
	// const dispatch = useDispatch();
	const { user, cart } = useSelector((state) => ({ ...state }));
	const total = cart.reduce((acc, curr) => acc + curr.count * curr.price, 0);
	const [
		modalOpen,
		setModalOpen,
	] = useState(false);

	function openModal(){
		setModalOpen(true);
	}

	function closeModal(){
		setModalOpen(false);
	}
	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<section className='grid grid-cols-3 gap-3 gap-4 my-10'>
				<div className='col-span-2'>
					<label className='text-2xl font-semibold'>My Cart</label>
					{cart &&
					cart.length <= 0 && (
						<div className='border my-5 text-center text-2xl font-semibold p-10'>
							Your cart is empty
						</div>
					)}
					{cart &&
						cart.map((item) => {
							return (
								<div className='flex border my-5'>
									<div id='clickPreview' onClick={openModal}>
										<img
											className='w-40 h-40'
											src={item.images[0].url}
											alt='cartProductPreview'
										/>
									</div>
									<div className='mx-10 my-5'>
										<label className='font-semibold'>
											{item.title}
										</label>
										<div className='my-1'>${item.price}</div>
										<div className='text-sm my-1'>{item.color}</div>
										<div className='text-sm my-1'>
											Qty: {item.count}
										</div>
									</div>
									<div className='mx-10 my-5'>
										<div className='text-sm'>Brand: {item.brand}</div>
										<div className='text-sm'>
											Shipping: {item.shipping}
										</div>
									</div>
									<Modal
										modalContainerClass='relative bg-white rounded-lg shadow-xl w-auto mx-auto'
										isOpen={modalOpen}
										onClose={closeModal}
										modalTitle='Preview'
									>
										<img
											src={item.images[0].url}
											alt='cartProductPreview'
										/>
									</Modal>
								</div>
							);
						})}
				</div>
				<div className='col-span-1 my-5 h-fit p-4 border-solid border'>
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
					<div className='my-2 p-1'>
						{
							user ? <button className='w-full text-center font-semibold text-white bg-black p-3'>
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
				</div>
			</section>
		</div>
	);
}

export default Cart;
