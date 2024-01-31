import React from 'react';
import PropTypes from 'prop-types';
import CustomInput from '../../../../../library/components/Input';
import { type } from '../../../../../library/common/constants/types';

const CategoryForm = ({values, handleChange, errors, handleSubmit, searchValue, handleSearchFilterChange}) => {

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <CustomInput
                    type={type.input.default}
                    value={values.name || ""}
                    name="name"
                    // disabled={true}
                    variant={ errors && errors.name ?"bg-white-200 appearance-none border-2 border-gray-200 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none error-border":"bg-white-200 appearance-none border-2 border-gray-200 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}
                    // placeHolder='Enter category'
				    onChange={(event) => handleChange(event.target.name, event.target.value)}
                    errorMessage={errors && errors.name}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 border border-blue-700 rounded my-5 text-sm mx-5">Submit</button>
            </div>
            <hr className="w-3/5 mb-4" />
        </form>
    )
};

CategoryForm.propTypes = {
    values: PropTypes.object,
    handleChange: PropTypes.func,
    errors: PropTypes.object,
    handleSubmit: PropTypes.func,
    searchValue: PropTypes.string,
}
export default React.memo(CategoryForm);