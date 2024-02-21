import React, { useEffect, useState } from 'react';
import Sidebar from '../../../../library/components/SideBar';
import { getProductBySlug } from '../../../../library/services/product';
import { getCategories, getSubCategory } from '../../../../library/services/category';
import useInput from '../../../../library/hooks/useInput';
import Form from '../../../../library/components/Form';

const ProductsUpdate = ({ role, match }) => {
	const { slug } = match.params;
	const {
		values,
		handleChange,
		// errors,
		handleSubmit,
		setValues,
	} = useInput(
		() => {},
		() => {
			return {};
		},
	);
	const [
		categoriesData,
		setCategoriesData,
	] = useState([]);
	const [
		subCategoryData,
		setSubCategoryData,
	] = useState([]);

	async function fetchProductBySlug(){
		try {
			const result = await getProductBySlug(slug);

			// transform value
			result.category = result.category._id;
			const transformedSubOptions = result.subCategory.map((option) => ({
				_id   : option._id,
				value : option.name.toLowerCase(),
				label : option.name,
			}));
			result.subCategory = transformedSubOptions;

			setValues({ ...result });
		} catch (err) {
			alert('Fetching product failed');
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

	async function fetchSubCategoryData(value){
		try {
			if (value) {
				const result = await getSubCategory(value);
				setSubCategoryData(result);
			}
		} catch (err) {
			alert(err);
		}
	}

	useEffect(() => {
		fetchProductBySlug();
		fetchCategoriesData();
		// eslint-disable-next-line
	}, []);

	useEffect(
		() => {
			// eslint-disable-next-line
			fetchSubCategoryData(values.category);
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
					<label className='text-2xl font-semibold'>Product Update</label>
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

export default ProductsUpdate;
