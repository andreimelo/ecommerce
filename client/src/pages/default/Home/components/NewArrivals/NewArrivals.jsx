import React, { useState, useEffect } from 'react';
import { getProductsBySortAndOrder } from '../../../../../library/services/product';
import Card from '../../../../../library/components/Card';
import Pagination from '../../../../../library/components/Pagination';
import usePagination from '../../../../../library/hooks/usePagination';
import { showAverageRating, numberOfStar } from '../../../../../library/helpers/rating';
import { addToCart } from '../../../../../library/helpers/cart';
import { useDispatch } from 'react-redux';

const NewArrivals = () => {
	const dispatch = useDispatch();
	const [
		products,
		setProducts,
	] = useState([]);
	const [
		loading,
		setLoading,
	] = useState(false);
	const {
		count,
		pagination,
		handlePagination,
		previousPage,
		nextPage,
		dataResult,
	} = usePagination(products, 4);

	async function fetchProductsByCount(){
		try {
			setLoading(true);
			const result = await getProductsBySortAndOrder(
				'createdAt',
				'desc',
				pagination,
			);
			setProducts(result);
			setLoading(false);
		} catch (error) {
			alert(error);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchProductsByCount();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='my-10'>
			<label className='text-2xl font-semibold'>New Arrivals</label>
			<div className='flex'>
				<div className='grid grid-cols-4 gap-4'>
					{
						loading ? <h2>🌀 Loading....</h2> :
						dataResult &&
						dataResult.map((item) => (
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
								price={`$${item.price}`}
								star={numberOfStar}
								rating={showAverageRating(item)}
								quantity={item.quantity}
								handleAddToCart={() => addToCart(item, dispatch)}
							/>
						))}
				</div>
			</div>
			<Pagination
				pagination={pagination}
				handlePagination={handlePagination}
				totalRenderPerPage={count}
				totalLength={products.length}
				previousPage={previousPage}
				nextPage={nextPage}
			/>
		</div>
	);
};

export default NewArrivals;
