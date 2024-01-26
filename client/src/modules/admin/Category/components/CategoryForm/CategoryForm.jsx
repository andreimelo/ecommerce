import React,{useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import useInput from '../../../../../library/hooks/useInput';
import CustomInput from '../../../../../library/components/Input';
import { type } from '../../../../../library/common/constants/types';
import validateAdminCategory from '../../../../../library/helpers/validators/adminCategory';
import { createCategory, getCategories } from '../../../../../library/services/category';
import icons from './../../../../../resources/icons';

const CategoryForm = () => {
    const { values, handleChange, errors, handleSubmit } = useInput(clickedSubmit, validateAdminCategory);
    const user = useSelector(state => state.user);
    const [categories, setCategories] = useState([]);

    useEffect(() => { getCategoriesData() }, []);

    async function getCategoriesData() {
        try {
            const result = await getCategories();
            setCategories(result);
        } catch (err) {
            alert(err);
        }
    }

    async function clickedSubmit() {
        try {
            const name = values.name;
            const result = await createCategory(name, user.token);
            if (result !== undefined) {
                getCategoriesData() 
                alert(`${name} successfully created`)
            }
            return result;
        } catch (err) {
            // refactor 
            alert('Create category failed')
        }
    }
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
            <hr className="w-3/5" />
            {/* Refactor - Create Table Component in Category */}
            <table className="w-3/5 my-5 min-w-max table-auto text-right">
                {categories.map((item) =>
                    (
                            <tbody key={item._id}>
                                <tr>
                                    <td className="text-left">{item.name}</td>
                                    <td>{icons['delete']}</td>
                                    <td>{icons['edit']}</td>
                                </tr>
                            </tbody>
                    ))}
            </table>
        </form>
    )
};

// CategoryForm.propTypes = {}
export default React.memo(CategoryForm);