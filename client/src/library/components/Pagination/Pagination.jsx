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
	const pageNumbers = totalLength
		? [...Array(Math.ceil(totalLength / totalRenderPerPage) + 1).keys()].slice(1)
		: [];

	return (
		<div className={containerClass}>
			<div className='w-full overflow-x-auto'>
				<ul className='flex flex-wrap items-center gap-2 h-8 text-sm justify-center'>
					{pagination > 1 && (
						<li
							className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100 hover:text-gray-700'
							onClick={previousPage}
						>
							<span className='sr-only'>Previous</span>
							{icons.previousArrow}
						</li>
					)}
					{pagination > 1  && pageNumbers.map((number) => (
						<li
							key={number}
							onClick={() => handlePagination(number)}
							className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
						>
							{number}
						</li>
					))}
					{pagination < pageNumbers.length && (
						<li
							className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100 hover:text-gray-700'
							onClick={nextPage}
						>
							<span className='sr-only'>Next</span>
							{icons.nextArrow}
						</li>
					)}
				</ul>
			</div>
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
	containerClass     : 'flex justify-center mt-6',
	handlePagination   : () => {},
	totalRenderPerPage : 3,
	totalLength        : 0,
	previousPage       : () => {},
	nextPage           : () => {},
	pagination         : 0,
};

export default Pagination;
