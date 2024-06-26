import React from 'react';
import PropTypes from 'prop-types';

const SelectOption = ({
	value,
	data,
	variant,
	name,
	onChange,
	selectedValue,
	placeHolder,
	selectClass,
	disabled,
	labelClass,
	defaultValue,
}) => {
	return (
		<div className={variant}>
			<label for='name' className={labelClass} />
			<select
				disabled={disabled}
				value={value}
				onChange={onChange}
				name={name}
				className={selectClass}
			>
				{defaultValue && <option value={defaultValue}>{defaultValue}</option>}
				{placeHolder && !defaultValue && <option value=''>{placeHolder}</option>}
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
	value         : PropTypes.any,
	data          : PropTypes.array,
	variant       : PropTypes.string,
	name          : PropTypes.string,
	onChange      : PropTypes.func,
	selectedValue : PropTypes.string,
	placeHolder   : PropTypes.string,
	selectClass   : PropTypes.string,
	disabled      : PropTypes.bool,
	labelClass    : PropTypes.string,
	defaultValue  : PropTypes.string,
};

SelectOption.defaultProps = {
	value         : '',
	data          : [],
	variant       : 'w-2/4',
	name          : 'name',
	onChange      : () => {},
	selectedValue : '',
	placeHolder   : 'Select an option',
	selectClass   :
		'border border-gray-300 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:bg-white focus:border-gray-500',
	disabled      : false,
	labelClass    : 'block mt-5 mb-3 text-sm font-medium text-gray-900',
	defaultValue  : '',
};

export default SelectOption;
