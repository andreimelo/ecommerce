import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../library/components/SideBar';
import { getProductsByCount, removeProduct } from '../../../library/services/product';
import Card from '../../../library/components/Card';

const Products = ({ role }) => {
	const user = useSelector((state) => state.user);
	const [
		products,
		setProducts,
	] = useState([]);

	async function fetchProductsByCount(){
		try {
			let result = await getProductsByCount(10);
			setProducts(result);
		} catch (err) {
			alert(err);
		}
	}

	async function handleRemove(slug){
		let answer = window.confirm('Are sure you want to delete?');
		try {
			if (answer) {
				await removeProduct(slug, user.token);
				await fetchProductsByCount();
			}
		} catch (err) {
			alert('Product delete failed');
		}
	}

	useEffect(() => {
		fetchProductsByCount();
	}, []);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10'>
				<div class='flex-none w-40 border-r border-gray-200'>
					<Sidebar role={role} />
				</div>

				<div class='mx-10'>
					<label className='text-2xl font-semibold'>Products</label>
					<div className='grid grid-cols-3 gap-4'>
						{products &&
							products.map((item) => (
								<Card
									imgSrc={item.images}
									title={item.title}
									description={item.description}
									onClickRemove={() => handleRemove(item.slug)}
									linkTo={'/admin/products'}
									slug={item.slug}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Products;
