import React, { useState, useEffect } from 'react';
import { getProductsBySortAndOrder } from '../../../library/services/product';
import Card from '../../../library/components/Card';

const Home = () => {
	const [
		products,
		setProducts,
	] = useState();
	const [
		loading,
		setLoading,
	] = useState(false);

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
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			<div className='flex my-5'>
				<div>
					<label className='text-2xl font-semibold'>All Products</label>

					{
						loading ? <h2>🌀 Loading....</h2> :
						<div className='grid grid-cols-3 gap-4'>
							{products &&
								products.map((item) => (
									<Card
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
			</div>
		</div>
	);
};

export default Home;
