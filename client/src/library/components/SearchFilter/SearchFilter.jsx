import React from 'react';
import PropTypes from 'prop-types';
import { type } from '../../../library/common/constants/types';
import CustomInput from '../../../library/components/Input';

const SearchFilter = ({ searchValue, handleSearchFilterChange }) => {
	return (
		<CustomInput
			type={type.input.default}
			value={searchValue}
			name='search'
			// disabled={true}
			variant={
				'bg-white-200 appearance-none border-2 border-gray-200 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
			}
			placeHolder='Filter'
			onChange={handleSearchFilterChange}
		/>
	);
};
SearchFilter.propTypes = {
	searchValue              : PropTypes.string,
	handleSearchFilterChange : PropTypes.func,
};

SearchFilter.defaultProps = {
	searchValue              : '',
	handleSearchFilterChange : () => {},
};

export default SearchFilter;
