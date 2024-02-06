import React from 'react';
import PropTypes from 'prop-types';

const SelectOption = ({
	data,
	variant,
	name,
	onChange,
	selectedValue,
	value,
	placeHolder,
}) => {
	return (
		<div className={variant}>
			<label for='name' class='block mt-5 mb-3 text-sm font-medium text-gray-900' />
			<select
				value={value}
				onChange={onChange}
				name={name}
				class='border border-gray-500 text-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-dark dark:focus:border'
			>
				<option value=''>{placeHolder}</option>
				{data.length > 0 &&
					data.map((item) => (
						<option
							key={item._id}
							value={item._id}
							selected={item._id === selectedValue}
						>
							{item.name}
						</option>
					))}
			</select>
		</div>
	);
};

SelectOption.propTypes = {
	data          : PropTypes.array,
	variant       : PropTypes.string,
	name          : PropTypes.string,
	onChange      : PropTypes.func,
	selectedValue : PropTypes.bool,
	value         : PropTypes.string,
	placeHolder   : PropTypes.string,
};

SelectOption.defaultProps = {
	data          : [],
	variant       : 'w-2/4',
	name          : 'name',
	onChange      : () => {},
	selectedValue : false,
	value         : '',
	placeHolder   : 'Select an option',
};

export default SelectOption;
