import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../library/components/SideBar';
import Form from '../../../library/components/Form';
import PropTypes from 'prop-types';
import useInput from '../../../library/hooks/useInput';
import { createProduct } from '../../../library/services/product';
import { getCategories, getSubCategory } from '../../../library/services/category';
import FileUpload from '../../../library/components/FileUpload/FileUpload';
import { imageUpload, removeImageUpload } from '../../../library/services/image';
import Resizer from 'react-image-file-resizer';
import ImagePreview from '../../../library/components/ImagePreview';

const Product = ({ role }) => {
	const {
		values,
		handleChange,
		// errors,
		handleSubmit,
		setValues,
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
	const { images } = values || {};

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

	const handleFileUploadAndResize = (e) => {
		let files = e.target.files;
		let allUploadFiles = [];
		if (files) {
			for (let i = 0; i < files.length; i++) {
				Resizer.imageFileResizer(
					files[i],
					720,
					720,
					'JPEG',
					100,
					0,
					async (uri) => {
						try {
							let result = await imageUpload({ image: uri }, user.token);
							allUploadFiles.push(result);
							setValues({ images: allUploadFiles });
						} catch (error) {
							alert(error);
						}
					},
					'base64',
				);
			}
		}
	};

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
				<div className='flex-none w-40 border-r border-gray-200'>
					<Sidebar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Create Product </label>
					<ImagePreview
						data={user}
						values={values}
						handleImageRemove={removeImageUpload}
						imagesData={images}
						setValues={setValues}
						alt='productImagePreview'
					/>
					<FileUpload
						handleFileUploadAndResize={handleFileUploadAndResize}
						setValues={setValues}
						variant='mt-5'
						inputClass='block w-full text-sm text-slate-500
						file:mr-4 file:py-2 file:px-4
						file:rounded-full file:border-0
						file:text-sm file:font-semibold
						file:bg-sky-50 file:text-sky-700
						hover:file:bg-sky-100'
					/>
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
