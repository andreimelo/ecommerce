import React, { useEffect, useState } from 'react';
import { getProductBySlug } from '../../../library/services/product';

const ViewProduct = ({ match }) => {
	const { slug } = match.params;
	const [
		product,
		setProduct,
	] = useState();

	async function fetchProductBySlug(){
		try {
			const result = await getProductBySlug(slug);
			setProduct(result);
		} catch (error) {
			alert(error);
		}
	}
	useEffect(() => {
		fetchProductBySlug();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			{JSON.stringify(product)}
		</div>
	);
};

export default ViewProduct;
