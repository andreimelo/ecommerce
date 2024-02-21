import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../../library/components/SideBar';
import { getProductBySlug } from '../../../../library/services/product';
import { getCategories, getSubCategory } from '../../../../library/services/category';
import useInput from '../../../../library/hooks/useInput';
import Form from '../../../../library/components/Form';
import FileUpload from '../../../../library/components/FileUpload/';
import { imageUpload, removeImageUpload } from '../../../../library/services/image';
import Resizer from 'react-image-file-resizer';
import ImagePreview from '../../../../library/components/ImagePreview';

const ProductsUpdate = ({ role, match }) => {
	const user = useSelector((state) => state.user);
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
	const { images } = values || {};
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
							setValues({
								...values,
								images : allUploadFiles.concat(images),
							});
						} catch (error) {
							alert(error);
						}
					},
					'base64',
				);
			}
		}
	};

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

export default ProductsUpdate;
