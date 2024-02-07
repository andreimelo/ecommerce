import React from 'react';
import PropTypes from 'prop-types';

const SelectOption = ({ data, variant, name, onChange, selectedValue, placeHolder }) => {
	return (
		<div className={variant}>
			<label for='name' class='block mt-5 mb-3 text-sm font-medium text-gray-900' />
			<select
				onChange={onChange}
				name={name}
				class='border-2 border-gray-200 text-gray-400 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:bg-white focus:border-gray-500'
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
	placeHolder   : PropTypes.string,
};

SelectOption.defaultProps = {
	data          : [],
	variant       : 'w-2/4',
	name          : 'name',
	onChange      : () => {},
	selectedValue : false,
	placeHolder   : 'Select an option',
};

export default SelectOption;
