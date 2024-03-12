import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductListItem = ({ data }) => {
	const { brand, price, category, subCategory, shipping, color, quantity } = data;

	return (
		<div class='relative my-10 overflow-x-auto shadow-md sm:rounded-lg'>
			<table class='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead class='text-xs text-gray-700 uppercase dark:text-gray-400' />
				<tbody>
					<tr class='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							class='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Price
						</th>
						<td class='px-6 py-4 text-black'>${price}</td>
					</tr>
					<tr class='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							class='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Category
						</th>
						<td class='px-6 py-4 text-black'>
							{category && (
								<Link to={`/category/${category.slug}`}>
									{category.name}
								</Link>
							)}
						</td>
					</tr>
					<tr class='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							class='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Sub Category
						</th>
						<td class='px-6 py-4 text-black'>
							{subCategory && (
								<Link to={`/sub-category/${subCategory[0].slug}`}>
									{subCategory[0].name}
								</Link>
							)}
						</td>
					</tr>
					<tr class='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							class='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Shipping
						</th>
						<td class='px-6 py-4 text-black'>{shipping}</td>
					</tr>
					<tr class='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							class='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Color
						</th>
						<td class='px-6 py-4 text-black'>{color}</td>
					</tr>
					<tr class='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							class='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Brand
						</th>
						<td class='px-6 py-4 text-black'>{brand}</td>
					</tr>
					<tr class='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							class='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Available
						</th>
						<td class='px-6 py-4 text-black'>{quantity}</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

ProductListItem.propTypes = {
	data : PropTypes.object,
};

ProductListItem.defaultProps = {
	data : {},
};

export default ProductListItem;
