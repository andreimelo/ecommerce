import React, { useState, useEffect } from 'react';
import {
	// getProductsByCount,
	getProductsByFilter,
} from '../../../library/services/product';
import { getCategories } from '../../../library/services/category';
import { type } from '../../../library/common/constants/types';
import { useSelector } from 'react-redux';
import { numberOfStar, showAverageRating } from '../../../library/helpers/rating';
import Card from '../../../library/components/Card';
import Input from '../../../library/components/Input';
import Accordion from '../../../library/components/Accordion';
import MultiRangeSlider from '../../../library/components/MultiRangeSlider';

const Shop = () => {
	const [
		products,
		setProducts,
	] = useState([]);
	const [
		loading,
		setLoading,
	] = useState(false);
	const [
		categoryList,
		setCategoryList,
	] = useState([]);
	const [
		category,
		setCategory,
	] = useState([]);
	const { search } = useSelector((state) => state);
	const { text } = search;
	const [
		rangeValues,
		setRangeValues,
	] = useState([
		0,
		4009,
	]);

	const handleSliderChange = (newValues) => {
		setRangeValues(newValues);
	};

	const handleCheckChange = (e) => {
		let inTheState = [
			...category,
		];
		let justChecked = e.target.value;
		let foundInTheState = inTheState.indexOf(justChecked);

		if (foundInTheState === -1) {
			inTheState.push(justChecked);
		}
		else {
			inTheState.splice(foundInTheState, 1);
		}
		setCategory(inTheState);
	};

	useEffect(() => {
		async function fetchCategories(){
			try {
				const result = await getCategories();
				setCategoryList(result);
			} catch (error) {
				alert(error);
			}
		}
		fetchCategories();
	}, []);

	useEffect(
		() => {
			async function fetchProductsByCount(){
				let result;
				try {
					setLoading(true);
					// if (text === '') {
					// 	result = await getProductsByCount(10);
					// 	console.log(result, 'pepe');
					// 	setProducts(result);
					// 	console.log('pepe');
					// }
					// else {

					result = await getProductsByFilter({
						query    : text,
						price    : rangeValues,
						category,
					});
					setProducts(result);
					// }

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
			rangeValues,
			category,
		],
	);

	const items = [
		{
			title   : 'Price',
			content : (
				<MultiRangeSlider value={rangeValues} onChange={handleSliderChange} />
			),
		},
		{
			title   : 'Category',
			content :
				categoryList &&
				categoryList.map((item) => (
					<div key={item._id} class='flex items-center'>
						<Input
							value={item._id}
							onChange={handleCheckChange}
							type={type.input['checkbox']}
							variant={
								'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							}
						/>
						<label class='ms-2 text-sm font-medium '>{item.name}</label>
					</div>
				)),
		},
		{
			title   : 'Rating',
			content :
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		},
		{
			title   : 'Sub Category',
			content :
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		},
		{
			title   : 'Brands',
			content :
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		},
		{
			title   : 'Color',
			content :
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		},
		{
			title   : 'Shipping',
			content :
				'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		},
	];

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10'>
				<div className='flex-none w-40 border-r border-gray-200'>
					<div className='text-l mb-3 font-semibold'>Filter</div>
					<Accordion data={items} />
				</div>

				<div className='flex mx-10'>
					<div className='grid grid-cols-3 gap-4'>
						{
							loading ? <h2>🌀 Loading....</h2> :
							products &&
							products.map((item, index) => (
								<Card
									key={index}
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
