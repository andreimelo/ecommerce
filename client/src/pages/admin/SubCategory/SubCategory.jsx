import React, { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import SelectOption from '../../../library/components/SelectOption';
import { getCategories } from '../../../library/services/category';
import { createSubCategory, getSubCategories, getSubCategory as getSubCategoryBySlug, removeSubCategory, updateSubCategory } from '../../../library/services/sub-category';
import validateAdminCategory from '../../../library/helpers/validators/adminCategory';
import Form from '../../../library/components/Form';
import Modal from '../../../library/components/Modal';
import SearchFilter from '../../../library/components/SearchFilter';
import { AdminBadge, AdminDataTable, AdminPanel, AdminShell } from '../components/AdminScaffold';

const SubCategory = ({ role }) => {
	const user = useSelector((state) => state.user);
	const [categories, setCategories] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState('');
	const [subCategories, setSubCategories] = useState([]);
	const [search, setSearch] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState('create');
	const [editingSlug, setEditingSlug] = useState('');
	const [values, setValues] = useState({ name: '', parent: '' });
	const [errors, setErrors] = useState({});

	async function fetchCategoriesData(){
		try {
			const result = await getCategories();
			setCategories(result);
		} catch (err) {
			alert(err);
		}
	}

	async function fetchSubCategoriesData(){
		try {
			const result = await getSubCategories();
			setSubCategories(result);
		} catch (err) {
			alert(err);
		}
	}

	async function handleRemove(slug){
		try {
			const confirmation = window.confirm('Are sure you want to delete?');
			if (confirmation) {
				await removeSubCategory(slug, user.token);
				await fetchSubCategoriesData();
			}
		} catch (err) {
			alert(err);
		}
	}

	async function handleSelectedCategoryChange(event){
		setSelectedCategory(event.target.value);
	}

	function handleSearchFilterChange(event){
		event.preventDefault();
		setSearch(event.target.value.toLowerCase());
	}

	function handleChange(name, value) {
		setValues((prevValues) => ({
			...prevValues,
			[name] : value,
		}));
	}

	const categoriesById = useMemo(() => (
		categories.reduce((accumulator, category) => {
			accumulator[category._id] = category.name;
			return accumulator;
		}, {})
	), [categories]);

	const filteredSubCategories = useMemo(() => (
		subCategories.filter((item) => {
			const name = item.name.toLowerCase();
			const parentName = (categoriesById[item.parent] || '').toLowerCase();
			const matchesSearch = name.includes(search) || parentName.includes(search);
			const matchesCategory = !selectedCategory || item.parent === selectedCategory;
			return matchesSearch && matchesCategory;
		})
	), [categoriesById, search, selectedCategory, subCategories]);

	function closeModal() {
		setModalOpen(false);
		setModalMode('create');
		setEditingSlug('');
		setValues({ name: '', parent: selectedCategory || '' });
		setErrors({});
	}

	function openCreateModal() {
		setModalMode('create');
		setEditingSlug('');
		setValues({ name: '', parent: selectedCategory || '' });
		setErrors({});
		setModalOpen(true);
	}

	async function openEditModal(item) {
		try {
			setModalMode('edit');
			setEditingSlug(item.slug);
			setModalOpen(true);
			const result = await getSubCategoryBySlug(item.slug);
			setValues({
				name   : result.subCategory.name,
				parent : result.subCategory.parent,
			});
			setErrors({});
		} catch (error) {
			alert(error);
			closeModal();
		}
	}

	async function handleModalSubmit(event) {
		event.preventDefault();
		const validationErrors = validateAdminCategory(values);

		if (!values.parent) {
			validationErrors.parent = 'Parent category is required';
		}

		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		try {
			if (modalMode === 'edit' && editingSlug) {
				await updateSubCategory(editingSlug, values, user.token);
				alert(`${values.name} successfully updated`);
			} else {
				await createSubCategory(values, user.token);
				alert(`${values.name} successfully created`);
			}
			await fetchSubCategoriesData();
			closeModal();
		} catch (error) {
			alert(modalMode === 'edit' ? 'Update sub category failed' : 'Create sub category failed');
		}
	}

	useEffect(() => {
		fetchCategoriesData();
		fetchSubCategoriesData();
	}, []);

	return (
		<AdminShell
			role={role}
			title='Sub Category'
			description='Manage sub categories from the list view and open create or edit forms inside a modal.'
			actions={<AdminBadge tone='blue'>{filteredSubCategories.length} visible items</AdminBadge>}
		>
			<AdminPanel title='Sub Category List' action={<button type='button' onClick={openCreateModal} className='rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white'>Create Sub Category</button>}>
				<div className='mb-6 grid gap-4 xl:grid-cols-[0.8fr_1.2fr]'>
					<SelectOption
						value={selectedCategory}
						data={categories}
						onChange={handleSelectedCategoryChange}
						placeHolder='Filter by category'
					/>
					<SearchFilter
						searchValue={search}
						handleSearchFilterChange={handleSearchFilterChange}
						showButton={false}
						searchClass='w-full'
						placeHolder='Filter sub categories'
					/>
				</div>
				<AdminDataTable>
					<thead>
						<tr className='text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>
							<th className='px-4 py-2'>Name</th>
							<th className='px-4 py-2'>Parent</th>
							<th className='px-4 py-2'>Delete</th>
							<th className='px-4 py-2'>Edit</th>
						</tr>
					</thead>
					<tbody>
						{filteredSubCategories.map((item) => (
							<tr key={item._id} className='bg-slate-50 text-sm text-slate-600 shadow-sm'>
								<td className='rounded-l-3xl px-4 py-4 font-semibold text-slate-800'>{item.name}</td>
								<td className='px-4 py-4'>{categoriesById[item.parent] || '--'}</td>
								<td className='px-4 py-4'>
									<button type='button' onClick={() => handleRemove(item.slug)} className='rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600'>Delete</button>
								</td>
								<td className='rounded-r-3xl px-4 py-4'>
									<button type='button' onClick={() => openEditModal(item)} className='rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white'>Edit</button>
								</td>
							</tr>
						))}
					</tbody>
				</AdminDataTable>
			</AdminPanel>
			<Modal
				isOpen={modalOpen}
				onClose={closeModal}
				modalTitle={modalMode === 'edit' ? 'Edit Sub Category' : 'Create Sub Category'}
				modalContainerClass='relative mx-auto w-full max-w-2xl rounded-[28px] bg-white shadow-xl'
			>
				<div>
					<SelectOption
						value={values.parent}
						data={categories}
						onChange={(event) => handleChange('parent', event.target.value)}
						placeHolder='Select a category'
					/>
					{errors.parent && <div className='mt-2 text-sm text-rose-500'>{errors.parent}</div>}
					<Form
						values={values}
						handleChange={handleChange}
						errors={errors}
						handleSubmit={handleModalSubmit}
						category
					/>
				</div>
			</Modal>
		</AdminShell>
	);
};

SubCategory.propTypes = {
	role : PropTypes.string,
};

SubCategory.defaultProps = {
	role : '',
};

export default SubCategory;
