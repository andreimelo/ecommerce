import React, { useEffect, useState } from 'react';
import { getProductBySlug } from '../../../library/services/product';
import Carousel from '../../../library/components/Carousel';

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

	const { title, description } = product || {};
	const images = [
		'https://media.istockphoto.com/id/1434947710/photo/businessman-headphones-and-laptop-webinar-in-office-with-coffee-on-table-video-call-or.jpg?s=1024x1024&w=is&k=20&c=NvC5p29pg1jBXw-IEzCTYg3Mv1A11k8BGVFqRw-DCDk=',
		'https://media.istockphoto.com/id/1500285927/photo/young-woman-a-university-student-studying-online.jpg?s=1024x1024&w=is&k=20&c=CVhpekieDK_UB8vtEDw-dKKGWzDpsxcQt-XEQIkgm3Y=',
		'https://via.placeholder.com/600x400',
	];

	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			{
				loading ? <h2>🌀 Loading....</h2> :
				<div>
					<section className='grid grid-cols-[50%_auto] gap-3 my-10'>
						<div className='col-span-1'>
							<Carousel images={images} />
						</div>
						<div className='col-span-1 mt-5'>
							<label className='text-2xl font-bold'>{title}</label>
							<p className='my-5'>{description}</p>
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
