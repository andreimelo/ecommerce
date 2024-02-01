import React from 'react';
import PropTypes from 'prop-types';
import CustomInput from '../Input';
import { type } from '../../../library/common/constants/types';

const Form = ({values, handleChange, errors, handleSubmit, separator, placeHolder, category}) => {

    return (
        <form onSubmit={(e)=>handleSubmit(e)}>
            {category && <>
                <CustomInput
                    type={type.input.default}
                    value={values.name || ""}
                    name="name"
                    // disabled={true}
                    variant={ errors && errors.name ?"bg-white-200 appearance-none border-2 border-gray-200 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none error-border":"bg-white-200 appearance-none border-2 border-gray-200 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"}
                    placeHolder={placeHolder}
				    onChange={(event) => handleChange(event.target.name, event.target.value)}
                    errorMessage={errors && errors.name}
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 border border-blue-700 rounded my-5 text-sm mx-5">Submit</button>
            </>
            }
            {separator && <hr className="w-3/5 mb-4" />}
        </form>
    )
};

Form.propTypes = {
    values: PropTypes.object,
    handleChange: PropTypes.func,
    errors: PropTypes.object,
    handleSubmit: PropTypes.func,
    separator: PropTypes.bool,
    placeHolder: PropTypes.string,
    category: PropTypes.bool,
}

Form.defaultProps ={
    values: {},
    handleChange: ()=>{},
    errors: {},
    handleSubmit: ()=>{},
    separator: false,
    placeHolder: '',
    category:false,
}

export default React.memo(Form);