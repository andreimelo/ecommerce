import React, { useState, useEffect } from 'react';
import { getProductsByCount } from '../../../library/services/product';
import Card from '../../../library/components/Card';

const Home = () => {
	const [
		products,
		setProducts,
	] = useState();

	async function fetchProductsByCount(){
		try {
			const result = await getProductsByCount(3);
			setProducts(result);
		} catch (error) {
			alert(error);
		}
	}

	useEffect(() => {
		fetchProductsByCount();
	}, []);

	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			<div className='flex my-5'>
				<div className='grid grid-cols-3 gap-4'>
					{products &&
						products.map((item) => (
							<Card
								imgSrc={item.images}
								title={item.title}
								description={item.description}
								// slug={item.slug}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

export default Home;
