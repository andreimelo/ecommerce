import React, { useEffect, useState } from 'react';
import { getProductBySlug } from '../../../library/services/product';
import Carousel from '../../../library/components/Carousel';
import ProductListItem from './components/ProductListItem/ProductListItem';

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
