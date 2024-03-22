import React from 'react';
import PropTypes from 'prop-types';
import { type } from '../../../library/common/constants/types';
import CustomInput from '../../../library/components/Input';

const SearchFilter = ({
	type,
	searchValue,
	handleSearchFilterChange,
	searchClass,
	placeHolder,
}) => {
	return (
		<CustomInput
			type={type}
			value={searchValue}
			name='search'
			// disabled={true}
			variant={searchClass}
			placeHolder={placeHolder}
			onChange={handleSearchFilterChange}
		/>
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
};

export default SearchFilter;
