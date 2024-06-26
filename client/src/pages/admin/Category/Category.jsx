import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';
import {
	getCategories,
	removeCategory,
	createCategory,
} from '../../../library/services/category';
import useInput from '../../../library/hooks/useInput';
import Form from '../../../library/components/Form';
import Table from '../../../library/components/Table';
import validateAdminCategory from '../../../library/helpers/validators/adminCategory';
import SearchFilter from '../../../library/components/SearchFilter';

const Category = ({ role }) => {
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
		search,
		setSearch,
	] = useState('');

	async function clickedSubmit(){
		try {
			const name = values.name;
			const result = await createCategory(name, user.token);
			if (result !== undefined) {
				await fetchCategoriesData();
				alert(`${name} successfully created`);
			}
			return result;
		} catch (err) {
			// refactor
			alert('Create category failed');
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

	async function handleRemove(slug){
		try {
			let confirmation = window.confirm('Are sure you want to delete?');
			if (confirmation) {
				await removeCategory(slug, user.token);
				await fetchCategoriesData();
			}
		} catch (err) {
			console.log(err);
			alert(err);
		}
	}

	function handleSearchFilterChange(e){
		e.preventDefault();
		setSearch(e.target.value.toLowerCase());
	}

	const searchBy = (search) => (values) => values.name.toLowerCase().includes(search);

	useEffect(() => {
		fetchCategoriesData();
	}, []);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10 max-[600px]:flex-col max-[600px]:items-baseline'>
				<div className='flex-none w-40 border-r border-gray-200 max-[600px]:border-none'>
					<Sidebar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Create Category</label>
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
						data={categories}
						onClick={handleRemove}
						searchValue={search}
						linkTo={'/admin/category'}
						thead={
							categories.length > 0 && (
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

Category.propTypes = {
	role : PropTypes.string,
};

export default Category;
