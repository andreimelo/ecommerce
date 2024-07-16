import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
	getProductBySlug,
	putProductStarRating,
	getRelatedProducts,
} from '../../../library/services/product';
import { addToWishList } from '../../../library/services/user';
import Carousel from '../../../library/components/Carousel';
import ProductListItem from './components/ProductListItem/ProductListItem';
import RatingIcon from '../../../library/components/RatingIcon';
import RatingModal from './components/RatingModal';
import RelatedProducts from './components/RelatedProducts';
import { useSelector, useDispatch } from 'react-redux';
import { showAverageRating, numberOfStar } from '../../../library/helpers/rating';
import { addToCart } from '../../../library/helpers/cart';
import { documentTitle } from '../../../library/helpers/tags';
import Spinner from '../../../library/components/Spinner/Spinner';
import Helmet from '../../../library/components/Helmet';

const ViewProduct = ({ match }) => {
	const { slug } = match.params;
	const dispatch = useDispatch();
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
	const [
		relatedProduct,
		setRelatedProduct,
	] = useState([]);
	const { average, length } = showAverageRating(product) || {};
	const { title, description, brand, images, _id, ratings, quantity } = product || {};
	const helmetTitle = documentTitle(`${title + ' - ' + brand}`) || '';

	async function fetchProductBySlug(){
		try {
			setLoading(true);
			const resultProductBySlug = await getProductBySlug(slug);
			setProduct(resultProductBySlug);
			if (resultProductBySlug && resultProductBySlug._id) {
				const result = await getRelatedProducts(resultProductBySlug._id);
				setRelatedProduct(result);
			}
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
	async function saveToWishlist(productId, token){
		try {
			const result = await addToWishList(productId, token);
			if (result.ok) {
				alert('Successfully added to wishlist');
			}
		} catch (error) {}
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
			<Helmet title={helmetTitle} />
			{
				loading ? <Spinner /> :
				<div>
					{/* Mobile View - n refactor */}
					<section className='grid grid-cols-2 gap-3 max-[600px]:grid-cols-1 my-10'>
						<div className='col-span-1'>
							<Carousel images={images} />
						</div>
						<div className='col-span-1 mx-5 my-5'>
							<div className='text-gray-400 text-xs'>{brand}</div>
							<label className='text-2xl font-bold'>{title}</label>
							<div className='flex place-items-center my-2'>
								{numberOfStar.map((index) => {
									return <RatingIcon index={index} rating={average} />;
								})}
								<div>{length > 0 && ` (${length}) `}</div>
							</div>
							<p className='mb-5'>{description}</p>
							<ProductListItem data={product} />
							{
								quantity && quantity > 0 ? <button
									type='button'
									className='font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
									onClick={() => addToCart(product, dispatch)}
								>
									Add to Cart
								</button> :
								<span
									type='button'
									className='font-semibold text-white bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
								>
									Sold out
								</span>}
							<button
								type='button'
								className='font-semibold text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
								onClick={() => saveToWishlist(_id, user.token)}
							>
								Add to Wishlist
							</button>
							<button
								onClick={openModal}
								type='button'
								className='font-semibold text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								{
									user && user.token ? 'Leave Rate' :
									'Login to leave rating'}
							</button>
						</div>
					</section>
					<RelatedProducts
						data={relatedProduct}
						loading={loading}
						numberOfStar={numberOfStar}
						showAverageRating={showAverageRating}
					/>
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
