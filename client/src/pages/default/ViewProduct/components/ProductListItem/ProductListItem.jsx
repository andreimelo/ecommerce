import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProductListItem = ({ data }) => {
	const { brand, price, category, subCategory, shipping, color, quantity } = data;

	return (
		<div className='relative my-10 overflow-x-auto shadow-md sm:rounded-lg'>
			<table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
				<thead className='text-xs text-gray-700 uppercase dark:text-gray-400' />
				<tbody>
					<tr className='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							className='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Price
						</th>
						<td className='px-6 py-4 text-black'>${price}</td>
					</tr>
					<tr className='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							className='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Category
						</th>
						<td className='px-6 py-4 text-blue-600'>
							{category && (
								<Link to={`/category/${category.slug}`}>
									{category.name}
								</Link>
							)}
						</td>
					</tr>
					<tr className='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							className='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Sub Category
						</th>
						<td className='px-6 py-4 text-blue-600'>
							{subCategory && (
								<Link to={`/sub-category/${subCategory[0].slug}`}>
									{subCategory[0].name}
								</Link>
							)}
						</td>
					</tr>
					<tr className='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							className='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Shipping
						</th>
						<td className='px-6 py-4 text-black'>{shipping}</td>
					</tr>
					<tr className='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							className='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Color
						</th>
						<td className='px-6 py-4 text-black'>{color}</td>
					</tr>
					<tr className='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							className='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Brand
						</th>
						<td className='px-6 py-4 text-black'>{brand}</td>
					</tr>
					<tr className='border-b border-gray-200 dark:border-gray-300'>
						<th
							scope='row'
							className='px-6 py-4 font-large text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800'
						>
							Available
						</th>
						<td className='px-6 py-4 text-black'>{quantity}</td>
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
