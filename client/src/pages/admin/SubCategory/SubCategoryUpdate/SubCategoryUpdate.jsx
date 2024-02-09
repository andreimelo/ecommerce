import React, { useState, useEffect } from 'react';
import Sidebar from '../../../../library/components/SideBar';
import SelectOption from '../../../../library/components/SelectOption';
import { useSelector } from 'react-redux';
import { getCategories } from '../../../../library/services/category';
import {
	getSubCategory,
	updateSubCategory,
} from '../../../../library/services/sub-category';
import validateAdminCategory from '../../../../library/helpers/validators/adminCategory';
import useInput from '../../../../library/hooks/useInput';
import Form from '../../../../library/components/Form';

const SubCategoryUpdate = ({ role, match, history }) => {
	const { slug } = match.params;
	const { values, handleChange, errors, handleSubmit, setValues } = useInput(
		clickedSubmit,
		validateAdminCategory,
	);
	const user = useSelector((state) => state.user);
	const [
		categories,
		setCategories,
	] = useState([]);

	async function clickedSubmit(){
		try {
			const { name, parent } = values;
			const result = await updateSubCategory(slug, { name, parent }, user.token);
			if (result !== undefined) {
				// await fetchSubCategoriesData();
				alert(`${name} successfully updated`);
				history.push('/admin/sub-category');
			}
			return result;
		} catch (err) {
			// refactor
			alert('Update sub category failed');
		}
	}

	async function fetchSubCategory(){
		try {
			const result = await getSubCategory(slug);
			setValues({ ...result });
		} catch (err) {
			alert(err);
		}
	}
	async function fetchCategoriesData(){
		try {
			const result = await getCategories();
			setCategories(result);
		} catch (err) {
			alert(err);
		}
	}

	useEffect(() => {
		fetchSubCategory();
		fetchCategoriesData();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10'>
				<div class='flex-none w-40 border-r border-gray-200'>
					<Sidebar role={role} />
				</div>
				<div class='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Sub Category</label>
					{/* Needs refactor - it can be change based on category */}
					<SelectOption
						value={values.parent}
						data={categories}
						selectedValue={values.parent}
						disabled
					/>
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
	);
};

export default SubCategoryUpdate;
