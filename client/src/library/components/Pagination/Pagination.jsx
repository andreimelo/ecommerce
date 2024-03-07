import React from 'react';
import PropTypes from 'prop-types';
import icons from '../../../resources/icons';

const Pagination = ({
	pagination,
	containerClass,
	handlePagination,
	totalRenderPerPage,
	totalLength,
	previousPage,
	nextPage,
}) => {
	const pageNumbers =
		totalLength ? [
			...Array(Math.ceil(totalLength / totalRenderPerPage) + 1).keys(),
		].slice(1) :
		[];
	return (
		<div className={containerClass}>
			<ul className='flex items-center -space-x-px h-8 text-sm'>
				{pagination > 1 && (
					<li
						className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
						onClick={previousPage}
					>
						<span class='sr-only'>Previous</span>
						{icons.previousArrow}
					</li>
				)}
				{pageNumbers.map((number) => (
					<li
						key={number}
						onClick={() => handlePagination(number)}
						className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
					>
						{number}
					</li>
				))}
				{pagination === pageNumbers.length ||
					(pagination <= pageNumbers.length && (
						<li
							className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
							onClick={nextPage}
						>
							<span class='sr-only'>Next</span>
							{icons.nextArrow}
						</li>
					))}
			</ul>
		</div>
	);
};

Pagination.propTypes = {
	pagination         : PropTypes.number,
	containerClass     : PropTypes.string,
	handlePagination   : PropTypes.func,
	totalRenderPerPage : PropTypes.number,
	totalLength        : PropTypes.number,
	previousPage       : PropTypes.func,
	nextPage           : PropTypes.func,
};

Pagination.defaultProps = {
	containerClass     : 'flex justify-center',
	handlePagination   : () => {},
	totalRenderPerPage : 3,
	totalLength        : 0,
	previousPage       : () => {},
	nextPage           : () => {},
	pagination         : 0,
};

export default Pagination;
