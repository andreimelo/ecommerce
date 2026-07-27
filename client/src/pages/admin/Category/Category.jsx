import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getCategories, removeCategory, createCategory, updateCategory } from '../../../library/services/category';
import Form from '../../../library/components/Form';
import Modal from '../../../library/components/Modal';
import validateAdminCategory from '../../../library/helpers/validators/adminCategory';
import SearchFilter from '../../../library/components/SearchFilter';
import { AdminBadge, AdminDataTable, AdminPanel, AdminShell } from '../components/AdminScaffold';

const Category = ({ role }) => {
	const user = useSelector((state) => state.user);
	const [categories, setCategories] = useState([]);
	const [search, setSearch] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState('create');
	const [editingSlug, setEditingSlug] = useState('');
	const [values, setValues] = useState({ name: '' });
	const [errors, setErrors] = useState({});

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
			const confirmation = window.confirm('Are sure you want to delete?');
			if (confirmation) {
				await removeCategory(slug, user.token);
				await fetchCategoriesData();
			}
		} catch (err) {
			alert(err);
		}
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

	function closeModal() {
		setModalOpen(false);
		setModalMode('create');
		setEditingSlug('');
		setValues({ name: '' });
		setErrors({});
	}

	function openCreateModal() {
		setModalMode('create');
		setEditingSlug('');
		setValues({ name: '' });
		setErrors({});
		setModalOpen(true);
	}

	function openEditModal(item) {
		setModalMode('edit');
		setEditingSlug(item.slug);
		setValues({ name: item.name });
		setErrors({});
		setModalOpen(true);
	}

	async function handleModalSubmit(event) {
		event.preventDefault();
		const validationErrors = validateAdminCategory(values);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) {
			return;
		}

		try {
			if (modalMode === 'edit' && editingSlug) {
				await updateCategory(editingSlug, values.name, user.token);
				alert(`${values.name} successfully updated`);
			} else {
				await createCategory(values.name, user.token);
				alert(`${values.name} successfully created`);
			}
			await fetchCategoriesData();
			closeModal();
		} catch (error) {
			alert(modalMode === 'edit' ? 'Updated category failed' : 'Create category failed');
		}
	}

	const filteredCategories = categories.filter((item) => item.name.toLowerCase().includes(search));

	useEffect(() => {
		fetchCategoriesData();
	}, []);

	return (
		<AdminShell
			role={role}
			title='Category'
			description='Manage categories from one table and open create or edit forms in a modal.'
			actions={<AdminBadge tone='blue'>{categories.length} categories</AdminBadge>}
		>
			<AdminPanel title='Category List' action={<button type='button' onClick={openCreateModal} className='rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white'>Create Category</button>}>
				<div className='mb-6'>
					<SearchFilter
						searchValue={search}
						handleSearchFilterChange={handleSearchFilterChange}
						showButton={false}
						searchClass='w-full'
						placeHolder='Filter categories'
					/>
				</div>
				<AdminDataTable>
					<thead>
						<tr className='text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>
							<th className='px-4 py-2'>Name</th>
							<th className='px-4 py-2'>Delete</th>
							<th className='px-4 py-2'>Edit</th>
						</tr>
					</thead>
					<tbody>
						{filteredCategories.map((item) => (
							<tr key={item._id} className='bg-slate-50 text-sm text-slate-600 shadow-sm'>
								<td className='rounded-l-3xl px-4 py-4 font-semibold text-slate-800'>{item.name}</td>
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
				modalTitle={modalMode === 'edit' ? 'Edit Category' : 'Create Category'}
				modalContainerClass='relative mx-auto w-full max-w-2xl rounded-[28px] bg-white shadow-xl'
			>
				<Form
					values={values}
					handleChange={handleChange}
					errors={errors}
					handleSubmit={handleModalSubmit}
					category
				/>
			</Modal>
		</AdminShell>
	);
};

Category.propTypes = {
	role : PropTypes.string,
};

Category.defaultProps = {
	role : '',
};

export default Category;
