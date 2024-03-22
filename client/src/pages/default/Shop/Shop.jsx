import React, { useState, useEffect } from 'react';
import {
	getProductsByCount,
	getProductsByFilter,
} from '../../../library/services/product';
import { useSelector } from 'react-redux';
import { numberOfStar, showAverageRating } from '../../../library/helpers/rating';
import Card from '../../../library/components/Card';

const Shop = () => {
	const [
		products,
		setProducts,
	] = useState([]);
	const [
		loading,
		setLoading,
	] = useState(false);
	const { search } = useSelector((state) => state);
	const { text } = search;

	useEffect(
		() => {
			async function fetchProductsByCount(){
				let result;
				try {
					setLoading(true);
					if (text === '') {
						result = await getProductsByCount(10);
						setProducts(result);
					}
					else {
						result = await getProductsByFilter({ query: text });
						setProducts(result);
					}
					setLoading(false);
				} catch (error) {
					alert(error);
					setLoading(false);
				}
			}
			const delay = setTimeout(() => {
				fetchProductsByCount();
			}, 300);

			return () => clearTimeout(delay);
		},
		[
			text,
		],
	);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10'>
				<div className='flex-none w-40 border-r border-gray-200'>
					Search/Filter
				</div>

				<div className='flex mx-10'>
					<div className='grid grid-cols-3 gap-4'>
						{
							loading ? <h2>🌀 Loading....</h2> :
							products &&
							products.map((item, index) => (
								<Card
									key={index}
									imgContainerClass='relative flex h-60 overflow-hidden rounded-xl'
									imgSrc={item.images}
									title={item.title}
									description={item.description}
									slug={item.slug}
									linkTo={'/product'}
									isProductAndCart
									star={numberOfStar}
									rating={showAverageRating(item)}
								/>
							))}
						{!loading && products.length <= 0 && <h2>No Products Found</h2>}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
