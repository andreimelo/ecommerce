import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';
import { getWishList, removeFromWishList } from '../../../library/services/user';
import icons from '../../../resources/icons';

function Wishlist({ role }){
	const [
		wishList,
		setWishList,
	] = useState([]);
	const [
		loading,
		setLoading,
	] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));

	async function fetchWishlist(){
		try {
			setLoading(true);
			const result = await getWishList(user.token);
			if (result.ok) {
				setLoading(false);
				setWishList(result.wishlist);
			}
		} catch (error) {
			setLoading(false);
			alert(error);
		}
	}

	async function onRemoveWishList(productId, token){
		try {
			let confirmation = window.confirm(
				'Are sure you want to remove this from wishlist?',
			);
			if (confirmation) {
				const result = await removeFromWishList(productId, token);
				if (result.ok) {
					fetchWishlist();
					alert('Successfully remove from wishlist');
				}
			}
		} catch (error) {
			alert(error);
		}
	}
	useEffect(() => {
		fetchWishlist();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10 max-[600px]:flex-col max-[600px]:items-baseline'>
				<div className='flex-none w-40 border-r border-gray-200 max-[600px]:border-none'>
					<SideBar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Wishlist</label>
					{
						loading ? <h2>🌀 Loading....</h2> :
						<div className='my-5'>
							{wishList.length <= 0 && (
								<div className='text-center font-semibold text-2xl my-2 p-4'>
									Your Wishlist is empty
								</div>
							)}
							{wishList.map((item) => (
								<div
									key={item._id}
									className='flex justify-between my-2 p-4 bg-gray-200 '
								>
									<Link to={`/product/${item.slug}`}>{item.title}</Link>
									<div
										className='cursor-pointer'
										onClick={() =>
											onRemoveWishList(item._id, user.token)}
									>
										{icons['delete']}
									</div>
								</div>
							))}
						</div>}
				</div>
				{/*  */}
			</div>
		</div>
	);
}

Wishlist.propTypes = {
	role : PropTypes.string,
};

export default Wishlist;
