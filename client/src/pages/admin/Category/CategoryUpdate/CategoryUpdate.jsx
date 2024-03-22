import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../../library/components/SideBar';
import PropTypes from 'prop-types';
import Form from '../../../../library/components/Form';
import useInput from '../../../../library/hooks/useInput';
import { updateCategory, getCategory } from '../../../../library/services/category';
import validateAdminCategory from '../../../../library/helpers/validators/adminCategory';

const CategoryUpdate = ({ role, match }) => {
	const { slug } = match.params;
	const { values, handleChange, errors, handleSubmit, setValues } = useInput(
		handleUpdateSubmit,
		validateAdminCategory,
	);
	const user = useSelector((state) => state.user);

	async function fetchCategoryBySlug(){
		try {
			const result = await getCategory(slug);
			setValues({ name: result.name });
		} catch (err) {
			alert(err);
		}
	}

	async function handleUpdateSubmit(){
		try {
			const name = values.name;
			const result = await updateCategory(slug, name, user.token);
			if (result !== undefined) {
				alert(`${name} successfully updated`);
			}
			return result;
		} catch (err) {
			// refactor
			alert('Updated category failed');
		}
	}

	useEffect(() => {
		fetchCategoryBySlug();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10'>
				<div className='flex-none w-40 border-r border-gray-200'>
					<Sidebar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Update Category</label>
					<div>
						<Form
							values={values}
							handleChange={handleChange}
							errors={errors}
							handleSubmit={handleSubmit}
							category
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

CategoryUpdate.propTypes = {
	role  : PropTypes.string,
	match : PropTypes.object,
};

export default CategoryUpdate;
