import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../library/components/SideBar';
import Form from '../../../library/components/Form';
import PropTypes from 'prop-types';
import useInput from '../../../library/hooks/useInput';
import { createProduct } from '../../../library/services/product';
import { getCategories, getSubCategory } from '../../../library/services/category';

const Product = ({ role }) => {
	const {
		values,
		handleChange,
		// errors,
		handleSubmit,
	} = useInput(clickedSubmit, () => {
		return {};
	});
	const user = useSelector((state) => state.user);
	const [
		categoriesData,
		setCategoriesData,
	] = useState([]);
	const [
		subCategoryData,
		setSubCategoryData,
	] = useState([]);

	async function clickedSubmit(){
		try {
			await createProduct(values, user.token);
			alert(`Product successfully created`);
		} catch (error) {
			alert('Create product failed');
		}
	}

	async function fetchCategoriesData(){
		try {
			const result = await getCategories();
			setCategoriesData(result);
		} catch (err) {
			alert(err);
		}
	}

	async function fetchSubCategoryData(id){
		try {
			if (id) {
				const result = await getSubCategory(id);
				setSubCategoryData(result);
			}
			return;
		} catch (err) {
			alert(err);
		}
	}

	useEffect(
		() => {
			fetchCategoriesData();
			fetchSubCategoryData(values.category);
			// eslint-disable-next-line
		},
		[
			values.category,
		],
	);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10'>
				<div class='flex-none w-40 border-r border-gray-200'>
					<Sidebar role={role} />
				</div>
				<div class='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Create Product </label>
					<Form
						formClass='w-2/4 my-10 '
						values={values}
						handleChange={handleChange}
						// errors={errors}
						handleSubmit={handleSubmit}
						categoriesDataOption={categoriesData}
						subCategoryDataOption={subCategoryData}
						product
					/>
				</div>
			</div>
		</div>
	);
};

Product.propTypes = {
	role : PropTypes.string,
};

export default Product;
