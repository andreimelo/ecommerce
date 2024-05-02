import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSubCategory } from '../../../library/services/sub-category';
import BreadCrumbs from '../../../library/components/BreadCrumbs';
import { showAverageRating, numberOfStar } from '../../../library/helpers/rating';
import Card from '../../../library/components/Card';
import { addToCart } from '../../../library/helpers/cart';

const SubCategory = ({ match }) => {
	const dispatch = useDispatch();
	const [
		category,
		setCategory,
	] = useState({});
	const [
		product,
		setProduct,
	] = useState([]);
	const [
		loading,
		setLoading,
	] = useState(false);
	const { slug } = match.params;

	async function fetchCategoryBySlug(path){
		try {
			setLoading(true);
			const result = await getSubCategory(path);
			setCategory(result.subCategory);
			setProduct(result.products);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert(error);
		}
	}
	useEffect(
		() => {
			fetchCategoryBySlug(slug);
			// eslint-disable-next-line
		},
		[
			slug,
		],
	);
	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			{
				loading ? <h2>🌀 Loading....</h2> :
				<section>
					{/* Welcome to {slug} */}
					{/* <div>{JSON.stringify(category)}</div> */}
					<BreadCrumbs category={category} />
					<div className='my-5 p-5 text-xl font-semibold bg-gray-200'>
						({product.length}) Products found in "{category.name}" sub
						category
					</div>
					<div className='flex'>
						<div className='grid grid-cols-4 gap-4'>
							{product &&
								product.map((item) => (
									<Card
										containerClass={
											'relative my-5 flex w-full max-w-xs flex-col border h-96'
										}
										imgClass='object-contain bg-gray-100'
										imgContainerClass='relative flex overflow-hidden'
										imgSrc={item.images}
										title={item.title}
										description={item.description}
										slug={item.slug}
										linkTo={'/product'}
										isProductAndCart
										star={numberOfStar}
										rating={showAverageRating(item)}
										handleAddToCart={() => addToCart(item, dispatch)}
									/>
								))}
						</div>
					</div>
				</section>}
		</div>
	);
};

export default SubCategory;
