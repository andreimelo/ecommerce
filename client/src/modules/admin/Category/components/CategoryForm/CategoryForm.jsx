import React,{useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import useInput from '../../../../../library/hooks/useInput';
import CustomInput from '../../../../../library/components/Input';
import { type } from '../../../../../library/common/constants/types';
import validateAdminCategory from '../../../../../library/helpers/validators/adminCategory';
import { createCategory, getCategories } from '../../../../../library/services/category';

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
                <label>Name</label>
                <CustomInput
                    type={type.input.default}
                    value={values.name || " "}
                    name="name"
                    // disabled={true}
                    variant={ errors && errors.name ?"inp no-size error-border":"inp no-size"}
                    // placeHolder={string.placeHolders.input.exampleOfEmail}
				    onChange={(event) => handleChange(event.target.name, event.target.value)}
                    errorMessage={errors && errors.name}
                />
                <button>Submit</button>
            </div>
            <hr />
            {categories.map((item) =>
                (<div>
                    <div key={item._id}>
                        <span>{item.name}</span>
                        <span> Delete</span>
                         <span> Edit</span>
                    </div>
                 
                </div>
                ))}
        </form>
    )
};

// CategoryForm.propTypes = {}
export default React.memo(CategoryForm);