import React,{useEffect} from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../../library/components/SideBar';
import PropTypes from 'prop-types';
import CustomInput from '../../../../library/components/Input';
import useInput from '../../../../library/hooks/useInput';
import { type } from '../../../../library/common/constants/types';
import { updateCategory, getCategory } from '../../../../library/services/category';
import validateAdminCategory from '../../../../library/helpers/validators/adminCategory';

const Update = ({ role, match }) => {
    const {slug} = match.params;
    const { values, handleChange, errors, handleSubmit, setValues } = useInput(handleUpdateSubmit, validateAdminCategory);
    const user = useSelector(state => state.user);

    async function getCategoryData() {
        try {
            const result = await getCategory(slug);
            setValues({ name: result.name });
        } catch (err) {
            alert(err);
        }
    }

    async function handleUpdateSubmit() {
        try {
            const name = values.name;
            const result = await updateCategory(slug ,name, user.token);
            if (result !== undefined) {
                alert(`${name} successfully updated`)
            }
            return result;
        } catch (err) {
            // refactor 
            alert('Updated category failed')
        }
    }

    useEffect(() => {
        getCategoryData();
		// eslint-disable-next-line
    }, []);

    return (
        <div className="layout-default">
            <div className="flex my-10">
                <div class="flex-none w-40 border-r border-gray-200">
                    <Sidebar role={role} />
                </div>
                <div class="flex-auto w-64 mx-10">
                    <label className="text-2xl font-semibold">
                        Update Category
                    </label>
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
                        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 border border-blue-700 rounded my-5 text-sm mx-5">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Update.propTypes = {
    role: PropTypes.string,
    match: PropTypes.object
}

export default Update;