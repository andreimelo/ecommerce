import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import Modal from '../../../library/components/Modal';
import { images } from '../../../resources/images';
import SelectOption from '../../../library/components/SelectOption';
import Input from '../../../library/components/Input';
import { productOptions } from '../../../library/common/constants/selectOptions';
import { saveUserCart } from '../../../library/services/user';
import { type } from '../../../library/common/constants/types';
import { removeToCart } from '../../../library/helpers/cart';

function Cart(){
	const { user, cart } = useSelector((state) => ({ ...state }));
	const total = cart.reduce((acc, curr) => acc + curr.count * curr.price, 0);
	const dispatch = useDispatch();
	const history = useHistory();
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

	async function handleSelectedColorChange(e, id){
		let cart = [];

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((product, i) => {
				if (product._id === id) {
					cart[i].color = e.target.value;
				}
				return null;
			});
			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type    : 'ADD_TO_CART',
				payload : cart,
			});
		}
	}

	async function handleCountChange(e, id, quantity){
		let cart = [];
		if (e.code === 'Minus') {
			e.preventDefault();
		}

		if (e.target.value > quantity) {
			alert(`Max available quantity: ${quantity}`);
			return null;
		}

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}
			cart.map((product, i) => {
				if (product._id === id) {
					cart[i].count = parseInt(e.target.value);
				}
				return null;
			});

			localStorage.setItem('cart', JSON.stringify(cart));
			dispatch({
				type    : 'ADD_TO_CART',
				payload : cart,
			});
		}
	}

	async function saveUserCartToDb(userCart, userToken){
		try {
			const result = await saveUserCart(userCart, userToken);
			console.log(result);
			if (result.ok) {
				return history.push('/checkout');
			}
		} catch (error) {
			alert(error);
		}
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
										{
											item.images.length ? <img
												className='w-40 h-40 object-cover'
												src={item.images[0].url}
												alt='cartProductPreview'
											/> :
											<img
												src={images['default']}
												className='w-40 h-40 object-cover'
												alt={`cartDefaultImage`}
											/>}
									</div>
									<div className='mx-10 my-5'>
										<label className='font-semibold'>
											{item.title}
										</label>
										<div className='my-1'>${item.price}</div>
										<SelectOption
											labelClass
											selectClass
											defaultValue={item.color}
											value={item.color}
											onChange={(e) =>
												handleSelectedColorChange(e, item._id)}
											data={productOptions['colors']}
										/>
									</div>
									<div className='mx-10 my-5'>
										<div className='text-sm my-1'>
											Brand: {item.brand}
										</div>
										<div className='text-sm my-1'>
											Shipping: {item.shipping}
										</div>
										<div className='flex text-sm'>
											{' '}
											<div className='mr-2'>Qty:</div>
											<Input
												onChange={(e) =>
													handleCountChange(
														e,
														item._id,
														item.quantity,
													)}
												value={item.count}
												min='0'
												type={type['input']['number']}
											/>
										</div>
									</div>
									<div className='cursor-pointer text-red-700 mx-10 my-5'>
										<div onClick={() => removeToCart(item, dispatch)}>
											Remove
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
					{cart.length !== 0 && (
						<div className='my-2 p-1'>
							{
								user ? <button
									className='w-full text-center font-semibold text-white bg-black p-3'
									onClick={() => saveUserCartToDb(cart, user.token)}
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
					)}
				</div>
			</section>
		</div>
	);
}

export default Cart;
