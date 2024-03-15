import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	getProductBySlug,
	putProductStarRating,
} from '../../../library/services/product';
import Carousel from '../../../library/components/Carousel';
import ProductListItem from './components/ProductListItem/ProductListItem';
import RatingIcon from '../../../library/components/RatingIcon';
import RatingModal from './components/RatingModal';
import { useSelector } from 'react-redux';
import { showAverageRating, numberOfStar } from '../../../library/helpers/rating';

const ViewProduct = ({ match }) => {
	const { slug } = match.params;
	const history = useHistory();
	const [
		modalOpen,
		setModalOpen,
	] = useState(false);
	const [
		product,
		setProduct,
	] = useState();
	const user = useSelector((item) => item.user);
	const [
		loading,
		setLoading,
	] = useState(false);
	const [
		rating,
		setRating,
	] = useState(0);
	const [
		hoverRating,
		setHoverRating,
	] = useState(0);
	const { average, length } = showAverageRating(product) || {};
	const { title, description, brand, images, _id, ratings } = product || {};

	async function fetchProductBySlug(){
		try {
			setLoading(true);
			const result = await getProductBySlug(slug);
			setProduct(result);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert(error);
		}
	}
	function onMouseEnter(index){
		setHoverRating(index);
	}
	function onMouseLeave(){
		setHoverRating(0);
	}
	function onSaveRating(index, name){
		setRating(index);
		putProductStarRating(name, index, user.token);
	}
	function openModal(){
		if (user && user.token) {
			return setModalOpen(true);
		}
		return history.push({
			pathname : '/login',
			state    : {
				from : `/product/${slug}`,
			},
		});
	}

	function closeModal(){
		setModalOpen(false);
	}

	useEffect(() => {
		fetchProductBySlug();
		// eslint-disable-next-line
	}, []);

	useEffect(
		() => {
			if (ratings && user) {
				let existingRating = ratings
					.reverse()
					.find((item) => item.postedBy.toString() === user._id.toString());

				existingRating && setRating(existingRating.star);
			}
		},
		[
			ratings,
			user,
		],
	);

	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			{
				loading ? <h2>🌀 Loading....</h2> :
				<div>
					<section className='grid grid-cols-[50%_auto] gap-3 my-10'>
						<div className='col-span-1'>
							<Carousel images={images} />
						</div>
						<div className='col-span-1 mx-5 my-5'>
							<div className='text-gray-400 text-xs'>{brand}</div>
							<label className='text-2xl font-bold'>{title}</label>
							<div class='flex place-items-center my-2'>
								{numberOfStar.map((index) => {
									return (
										<RatingIcon
											length={length}
											index={index}
											rating={average}
										/>
									);
								})}
								<div>{length && ` (${length}) `}</div>
							</div>
							<p className='mb-5'>{description}</p>
							<ProductListItem data={product} />
							<button
								type='button'
								class='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								Add to Cart
							</button>
							<button
								type='button'
								class='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								Add to Wishlist
							</button>
							<button
								onClick={openModal}
								type='button'
								class='text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								{
									user && user.token ? 'Leave Rate' :
									'Login to leave rating'}
							</button>
						</div>
					</section>
					<section className='my-5'>Related Products</section>
					<RatingModal
						id={_id}
						star={numberOfStar}
						rating={rating}
						hoverRating={hoverRating}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						onSaveRating={onSaveRating}
						modalOpen={modalOpen}
						closeModal={closeModal}
					/>
				</div>}
		</div>
	);
};

export default ViewProduct;
