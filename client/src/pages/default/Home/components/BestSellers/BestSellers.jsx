import React, { useState, useEffect } from 'react';
import { getProductsBySortAndOrder } from '../../../../../library/services/product';
import Card from '../../../../../library/components/Card';
import Pagination from '../../../../../library/components/Pagination';
import usePagination from '../../../../../library/hooks/usePagination';

const BestSellers = () => {
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
			const result = await getProductsBySortAndOrder('sold', 'desc', pagination);
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
			<label className='text-2xl font-semibold'>Best Sellers</label>
			<div className='flex'>
				{
					loading ? <h2>🌀 Loading....</h2> :
					<div className='grid grid-cols-4 gap-4'>
						{dataResult &&
							dataResult.map((item) => (
								<Card
									imgContainerClass='relative flex h-60 overflow-hidden rounded-xl'
									imgSrc={item.images}
									title={item.title}
									description={item.description}
									slug={item.slug}
									linkTo={'/product'}
									isProductAndCart
								/>
							))}
					</div>}
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

export default BestSellers;
