import React from 'react';
import { useHistory } from 'react-router-dom';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { images } from '../../../resources/images';

const SideDrawer = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const { drawer, cart } = useSelector((state) => ({ ...state }));

	return (
		<Drawer
			open={drawer}
			onClose={() =>
				dispatch({
					type    : 'SET_VISIBLE_DRAWER',
					payload : false,
				})}
			direction='right'
			className='p-5'
		>
			<div className='mb-5 text-xl font-semibold'>Added to cart</div>
			{cart.map((item) => (
				<div key={item._id} className='border border-gray-100 mt-2 flex w-20'>
					{
						item.images[0] ? <img
							className='object-cover'
							src={item.images[0].url}
							alt='productSideDrawer'
						/> :
						<img
							src={images['default']}
							className='object-cover'
							alt='defaultProductSideDrawer'
						/>}
					<div className='flex-none m-2 pl-2 text-xs w-full'>
						<div className='font-semibold truncate'>{item.title}</div>
						<div className='font-semibold mt-1 text-xs'>${item.price}</div>
						<div className='mt-1 text-xs'>Qty: {item.count}</div>
					</div>
				</div>
			))}
			<button
				type='button'
				class='w-full mt-5 font-semibold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
				onClick={() => {
					dispatch({
						type    : 'SET_VISIBLE_DRAWER',
						payload : false,
					});
					return history.push('/cart');
				}}
			>
				Go to cart
			</button>
		</Drawer>
	);
};

export default SideDrawer;
