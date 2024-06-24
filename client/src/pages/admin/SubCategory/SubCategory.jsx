import React, { useState, useEffect } from 'react';
import Sidebar from '../../../library/components/SideBar';
import SelectOption from '../../../library/components/SelectOption';
import { useSelector } from 'react-redux';
import { getCategories, getSubCategory } from '../../../library/services/category';
import {
	createSubCategory,
	removeSubCategory,
} from '../../../library/services/sub-category';
import validateAdminCategory from '../../../library/helpers/validators/adminCategory';
import useInput from '../../../library/hooks/useInput';
import Form from '../../../library/components/Form';
import Table from '../../../library/components/Table';
import SearchFilter from '../../../library/components/SearchFilter';

const SubCategory = ({ role }) => {
	const { values, handleChange, errors, handleSubmit } = useInput(
		clickedSubmit,
		validateAdminCategory,
	);
	const user = useSelector((state) => state.user);
	const [
		categories,
		setCategories,
	] = useState([]);
	const [
		selectedCategory,
		setSelectedCategory,
	] = useState('');
	const [
		subCategories,
		setSubCategories,
	] = useState([]);
	const [
		search,
		setSearch,
	] = useState('');

	async function clickedSubmit(){
		try {
			const name = values.name;
			const result = await createSubCategory(
				{ name, parent: selectedCategory },
				user.token,
			);
			if (result !== undefined) {
				await fetchSubCategoriesData();
				alert(`${name} successfully created`);
			}
			return result;
		} catch (err) {
			// refactor
			alert('Create sub category failed');
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

	async function fetchSubCategoriesData(id){
		try {
			const result = await getSubCategory(id);
			setSubCategories(result);
		} catch (err) {
			alert(err);
		}
	}

	async function handleRemove(slug){
		try {
			let confirmation = window.confirm('Are sure you want to delete?');
			if (confirmation) {
				await removeSubCategory(slug, user.token);
				await fetchSubCategoriesData();
			}
		} catch (err) {
			console.log(err);
			alert(err);
		}
	}

	async function handleSelectedCategoryChange(e){
		setSelectedCategory(e.target.value);
	}

	function handleSearchFilterChange(e){
		e.preventDefault();
		setSearch(e.target.value.toLowerCase());
	}

	const searchBy = (search) => (values) => values.name.toLowerCase().includes(search);

	useEffect(
		() => {
			if (!selectedCategory) {
				setSubCategories([]);
				fetchCategoriesData();
			}
			selectedCategory && fetchSubCategoriesData(selectedCategory);
		},
		[
			selectedCategory,
		],
	);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10 max-[600px]:flex-col max-[600px]:items-baseline'>
				<div className='flex-none w-40 border-r border-gray-200 max-[600px]:border-none'>
					<Sidebar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Create Sub Category</label>
					<SelectOption
						value={selectedCategory}
						data={categories}
						onChange={handleSelectedCategoryChange}
						placeHolder='Select a category'
					/>
					<Form
						values={values}
						handleChange={handleChange}
						errors={errors}
						handleSubmit={handleSubmit}
						separator
						category
					/>
					<SearchFilter
						searchValue={search}
						handleSearchFilterChange={handleSearchFilterChange}
					/>
					<Table
						searchFilter={searchBy}
						data={subCategories}
						onClick={handleRemove}
						searchValue={search}
						linkTo={'/admin/sub-category'}
						thead={
							subCategories.length > 0 && (
								<thead className='text-xs text-white uppercase bg-gray-900 dark:text-white'>
									<tr>
										<th scope='col' class='px-6 py-3'>
											Name
										</th>
										<th scope='col' class='px-6 py-3'>
											Delete
										</th>
										<th scope='col' class='px-6 py-3'>
											Edit
										</th>
									</tr>
								</thead>
							)
						}
						category
					/>
				</div>
			</div>
		</div>
	);
};

export default SubCategory;
