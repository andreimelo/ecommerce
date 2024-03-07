import React, { useState, useEffect } from 'react';
import { getProductsBySortAndOrder } from '../../../../library/services/product';
import Card from '../../../../library/components/Card';
import Pagination from '../../../../library/components/Pagination';
import usePagination from '../../../../library/hooks/usePagination';

const NewArrivals = () => {
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
	} = usePagination(products);

	async function fetchProductsByCount(){
		try {
			setLoading(true);
			const result = await getProductsBySortAndOrder('createdAt', 'desc', 3);
			setProducts(result);
			setLoading(false);
		} catch (error) {
			alert(error);
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchProductsByCount();
	}, []);

	return (
		<div>
			<label className='text-2xl font-semibold'>New Arrivals</label>
			<div className='grid grid-cols-3 gap-4'>
				{
					loading ? <h2>🌀 Loading....</h2> :
					dataResult &&
					dataResult.map((item) => (
						<Card
							imgSrc={item.images}
							title={item.title}
							description={item.description}
							slug={item.slug}
							linkTo={'/product'}
							isProductAndCart
						/>
					))}
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
