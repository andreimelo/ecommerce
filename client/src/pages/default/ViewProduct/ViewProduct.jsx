import React, { useEffect, useState } from 'react';
import { getProductBySlug } from '../../../library/services/product';
import Carousel from '../../../library/components/Carousel';
import ProductListItem from './components/ProductListItem/ProductListItem';
// import RatingIcon from '../../../library/components/RatingIcon';

const ViewProduct = ({ match }) => {
	const { slug } = match.params;
	const [
		product,
		setProduct,
	] = useState();
	const [
		loading,
		setLoading,
	] = useState(false);
	// const [
	// 	rating,
	// 	setRating,
	// ] = useState(0);
	// const [
	// 	hoverRating,
	// 	setHoverRating,
	// ] = useState(0);
	// const onMouseEnter = (index) => {
	// 	setHoverRating(index);
	// };
	// const onMouseLeave = () => {
	// 	setHoverRating(0);
	// };
	// const onSaveRating = (index) => {
	// 	setRating(index);
	// };

	// const star = [
	// 	1,
	// 	2,
	// 	3,
	// 	4,
	// 	5,
	// ];

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

	useEffect(() => {
		fetchProductBySlug();
		// eslint-disable-next-line
	}, []);

	const { title, description, brand, images } = product || {};

	// console.log(product);
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
							<p className='my-5'>{description}</p>
							<ProductListItem data={product} />
							{/* <div class='place-items-center'>
								{star.map((index) => {
									return (
										<RatingIcon
											star={star}
											index={index}
											rating={rating}
											hoverRating={hoverRating}
											onMouseEnter={onMouseEnter}
											onMouseLeave={onMouseLeave}
											onSaveRating={onSaveRating}
										/>
									);
								})}
							</div> */}
							<button
								type='button'
								class='inline-flex text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								Add to Cart
							</button>
							<button
								type='button'
								class='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								Add to Wishlist
							</button>
						</div>
					</section>
					<section className='my-5'>Related Products</section>
				</div>}
		</div>
	);
};

export default ViewProduct;
