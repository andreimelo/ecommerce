import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	// getProductsByCount,
	getProductsByFilter,
} from '../../../library/services/product';
import { getCategories } from '../../../library/services/category';
import { getSubCategories } from '../../../library/services/sub-category';
import { type } from '../../../library/common/constants/types';
import { productOptions } from '../../../library/common/constants/selectOptions';
import { addToCart } from '../../../library/helpers/cart';
import { useSelector } from 'react-redux';
import { numberOfStar, showAverageRating } from '../../../library/helpers/rating';
import Card from '../../../library/components/Card';
import Input from '../../../library/components/Input';
import Accordion from '../../../library/components/Accordion';
import MultiRangeSlider from '../../../library/components/MultiRangeSlider';

const Shop = () => {
	const dispatch = useDispatch();
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
		subCategoryList,
		setSubCategoryList,
	] = useState([]);
	const [
		brand,
		setBrand,
	] = useState([]);
	// const [
	// 	brandList,
	// 	setBrandList,
	// ] = useState([]);
	const [
		color,
		setColor,
	] = useState([]);
	// const [
	// 	colorList,
	// 	setColorList,
	// ] = useState([]);
	const [
		shipping,
		setShipping,
	] = useState([]);
	// const [
	// 	shippingList,
	// 	setShippingList,
	// ] = useState([]);
	const [
		category,
		setCategory,
	] = useState([]);
	const [
		subCategory,
		setSubCategory,
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

	const handleCategoryChange = (e) => {
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

	const handleSubCategoryChange = (e) => {
		let inTheState = [
			...subCategory,
		];
		let justChecked = e.target.value;
		let foundInTheState = inTheState.indexOf(justChecked);

		if (foundInTheState === -1) {
			inTheState.push(justChecked);
		}
		else {
			inTheState.splice(foundInTheState, 1);
		}

		setSubCategory(inTheState);
	};

	const handleBrandChange = (e) => {
		let inTheState = [
			...brand,
		];
		let justChecked = e.target.value;
		let foundInTheState = inTheState.indexOf(justChecked);

		if (foundInTheState === -1) {
			inTheState.push(justChecked);
		}
		else {
			inTheState.splice(foundInTheState, 1);
		}

		setBrand(inTheState);
	};

	const handleColorChange = (e) => {
		let inTheState = [
			...color,
		];
		let justChecked = e.target.value;
		let foundInTheState = inTheState.indexOf(justChecked);

		if (foundInTheState === -1) {
			inTheState.push(justChecked);
		}
		else {
			inTheState.splice(foundInTheState, 1);
		}

		setColor(inTheState);
	};

	const handleShippingChange = (e) => {
		let inTheState = [
			...shipping,
		];
		let justChecked = e.target.value;
		let foundInTheState = inTheState.indexOf(justChecked);

		if (foundInTheState === -1) {
			inTheState.push(justChecked);
		}
		else {
			inTheState.splice(foundInTheState, 1);
		}

		setShipping(inTheState);
	};

	useEffect(() => {
		async function fetchCategories(){
			try {
				const [
					resultCategory,
					resultSubCategory,
				] = await Promise.all([
					getCategories(),
					getSubCategories(),
				]);
				setCategoryList(resultCategory);
				setSubCategoryList(resultSubCategory);
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

					result = await getProductsByFilter({
						query       : text,
						price       : rangeValues,
						category,
						subCategory,
						brand,
						color,
						shipping,
					});
					setProducts(result);

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
			subCategory,
			brand,
			color,
			shipping,
		],
	);

	const items = [
		{
			title   : 'Price',
			content : (
				<MultiRangeSlider
					min={0}
					max={10000}
					value={rangeValues}
					onChange={handleSliderChange}
				/>
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
							name='category'
							onChange={handleCategoryChange}
							type={type.input['checkbox']}
							variant={
								'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
							}
						/>
						<label class='ms-2 text-sm font-medium '>{item.name}</label>
					</div>
				)),
		},
		// {
		// 	title   : 'Rating',
		// 	content :
		// 		'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
		// },
		{
			title   : 'Sub Category',
			content :
				subCategoryList &&
				subCategoryList.map((item) => (
					<div key={item._id} class='flex items-center'>
						<Input
							value={item._id}
							name='subCategory'
							onChange={handleSubCategoryChange}
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
			title   : 'Brands',
			content : productOptions['brands'].map((item) => (
				<div key={item.name} class='flex items-center'>
					<Input
						value={item.value}
						name='brand'
						onChange={handleBrandChange}
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
			title   : 'Color',
			content : productOptions['colors'].map((item) => (
				<div key={item.name} class='flex items-center'>
					<Input
						value={item.value}
						name='brand'
						onChange={handleColorChange}
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
			title   : 'Shipping',
			content : productOptions['shipping'].map((item) => (
				<div key={item.name} class='flex items-center'>
					<Input
						value={item.value}
						name='brand'
						onChange={handleShippingChange}
						type={type.input['checkbox']}
						variant={
							'w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
						}
					/>
					<label class='ms-2 text-sm font-medium '>{item.name}</label>
				</div>
			)),
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
									handleAddToCart={() => addToCart(item, dispatch)}
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
