import React from 'react';
import PropTypes from 'prop-types';
import icons from '../../../resources/icons';
import { type } from '../../common/constants/types';

const SearchFilter = ({
	type,
	searchValue,
	handleSearchFilterChange,
	searchClass,
	placeHolder,
	showButton,
}) => {
	return (
		<div className={`relative ${searchClass}`}>
			<input
				type={type}
				value={searchValue}
				name='search'
				onChange={handleSearchFilterChange}
				placeholder={placeHolder}
				className='w-full rounded-full border border-gray-200 bg-white px-6 py-3 pr-16 text-gray-700 outline-none shadow-sm transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100'
			/>
			{showButton && (
				<button
					type='submit'
					aria-label='Search'
					className='absolute right-2 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center	transition hover:border-indigo-300 hover:text-indigo-600'
				>
					{icons['search']}
				</button>
			)}
		</div>
	);
};
SearchFilter.propTypes = {
	type                     : PropTypes.string,
	searchValue              : PropTypes.string,
	handleSearchFilterChange : PropTypes.func,
	searchClass              : PropTypes.string,
	placeHolder              : PropTypes.string,
};

SearchFilter.defaultProps = {
	type                     : type.input.default,
	searchValue              : '',
	handleSearchFilterChange : () => {},
	searchClass              :
		'bg-white-200 appearance-none border-2 border-gray-200 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
	placeHolder              : 'Filter',
	showButton              : true,
};

export default SearchFilter;
