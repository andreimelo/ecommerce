import React, { useState, useEffect } from 'react';
import { getProductsBySortAndOrder } from '../../../../../library/services/product';
import Card from '../../../../../library/components/Card';
import Pagination from '../../../../../library/components/Pagination';
import usePagination from '../../../../../library/hooks/usePagination';
import { showAverageRating, numberOfStar } from '../../../../../library/helpers/rating';
import { addToCart } from '../../../../../library/helpers/cart';
import { useDispatch } from 'react-redux';
// import Spinner from '../../../../../library/components/Spinner/Spinner';
import { Skeleton } from 'boneyard-js/react'

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
			<div className='flex items-center justify-between mb-4'>
				<div>
					<h2 className='text-2xl font-semibold'>New Arrivals</h2>
					<p className='text-sm text-gray-500'>Latest products just added</p>
				</div>
			</div>
			<div className='flex'>
				<Skeleton name="new-arrival-card" loading={loading}
				  
				>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full pb-6'>
					{
						dataResult &&
						dataResult.map((item) => (
							<Card
								containerClass={
									'relative my-5 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow hover:shadow-lg transition transform hover:-translate-y-1 h-full'
								}
								imgClass='object-contain bg-gray-100 w-full h-56'
								imgContainerClass='relative mx-3 mt-3 flex h-56 overflow-hidden rounded-t-lg justify-center items-center bg-gray-50'
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
				</Skeleton>
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
