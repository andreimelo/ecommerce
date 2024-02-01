import React from 'react';
import PropTypes from 'prop-types';

const SelectOption = ({data, onChange}) => {
    return (
        <div className="w-2/4">
            <label for="name" class="block mt-5 mb-3 text-sm font-medium text-gray-900"/>
            <select onChange={onChange} name="name" class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-gray-500 block w-full p-2.5  dark:placeholder-gray-400 dark:text-dark dark:focus:border">
            <option value="" selected>Select an option</option>
            {data.length > 0 && data.map((item)=> <option key={item._id} value={item._id}>{item.name}</option>)}
            </select>
        </div>
    )
}

SelectOption.propTypes={
    data: PropTypes.array, 
    onChange: PropTypes.func,
}

export default SelectOption;