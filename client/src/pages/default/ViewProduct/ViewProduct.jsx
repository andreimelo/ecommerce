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

	const {
		title,
		description,
		brand,
		images,
		price,
		category,
		subCategory,
		shipping,
		color,
		quantity,
	} =
		product || {};

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
							{/* will refactor */}
							{/* Table */}
							<div class='relative my-10 overflow-x-auto shadow-md sm:rounded-lg'>
								<table class='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
									<thead class='text-xs text-gray-700 uppercase dark:text-gray-400' />
									<tbody>
										<tr class='border-b border-gray-200 dark:border-gray-300'>
											<th
												scope='row'
												class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
											>
												Price
											</th>
											<td class='px-6 py-4 text-black'>${price}</td>
										</tr>
										<tr class='border-b border-gray-200 dark:border-gray-300'>
											<th
												scope='row'
												class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
											>
												Category
											</th>
											<td class='px-6 py-4 text-black'>
												{category && category.name}
											</td>
										</tr>
										<tr class='border-b border-gray-200 dark:border-gray-300'>
											<th
												scope='row'
												class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
											>
												Sub Category
											</th>
											<td class='px-6 py-4 text-black'>
												{subCategory && subCategory[0].name}
											</td>
										</tr>
										<tr class='border-b border-gray-200 dark:border-gray-300'>
											<th
												scope='row'
												class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
											>
												Shipping
											</th>
											<td class='px-6 py-4 text-black'>
												{shipping}
											</td>
										</tr>
										<tr class='border-b border-gray-200 dark:border-gray-300'>
											<th
												scope='row'
												class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
											>
												Color
											</th>
											<td class='px-6 py-4 text-black'>{color}</td>
										</tr>
										<tr class='border-b border-gray-200 dark:border-gray-300'>
											<th
												scope='row'
												class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
											>
												Brand
											</th>
											<td class='px-6 py-4 text-black'>{brand}</td>
										</tr>
										<tr class='border-b border-gray-200 dark:border-gray-300'>
											<th
												scope='row'
												class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
											>
												Available
											</th>
											<td class='px-6 py-4 text-black'>
												{quantity}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
							{/* Table */}

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
