import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Resizer from 'react-image-file-resizer';
import Form from '../../../library/components/Form';
import Modal from '../../../library/components/Modal';
import SearchFilter from '../../../library/components/SearchFilter';
import FileUpload from '../../../library/components/FileUpload/FileUpload';
import ImagePreview from '../../../library/components/ImagePreview/ImagePreview';
import { getProductsByCount, removeProduct, createProduct, getProductBySlug, updateProductBySlug } from '../../../library/services/product';
import { getCategories, getSubCategory } from '../../../library/services/category';
import { imageUpload, removeImageUpload } from '../../../library/services/image';
import { AdminBadge, AdminDataTable, AdminPanel, AdminShell } from '../components/AdminScaffold';
import { filterProducts, INITIAL_PRODUCT_VALUES } from '../utils/products';

const Products = ({ role }) => {
	const user = useSelector((state) => state.user);
	const [products, setProducts] = useState([]);
	const [search, setSearch] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState('create');
	const [modalLoading, setModalLoading] = useState(false);
	const [editingSlug, setEditingSlug] = useState('');
	const [productValues, setProductValues] = useState(INITIAL_PRODUCT_VALUES);
	const [categoriesData, setCategoriesData] = useState([]);
	const [subCategoryData, setSubCategoryData] = useState([]);

	async function fetchProductsByCount(){
		try {
			const result = await getProductsByCount(100);
			setProducts(result);
		} catch (err) {
			alert(err);
		}
	}

	async function fetchCategoriesData(){
		try {
			const result = await getCategories();
			setCategoriesData(result);
		} catch (error) {
			alert(error);
		}
	}

	async function fetchSubCategoryData(categoryId){
		try {
			if (!categoryId) {
				setSubCategoryData([]);
				return;
			}

			const result = await getSubCategory(categoryId);
			setSubCategoryData(result);
		} catch (error) {
			alert(error);
		}
	}

	function handleSearchFilterChange(event) {
		setSearch(event.target.value.toLowerCase());
	}

	function handleProductChange(name, value) {
		setProductValues((prevValues) => ({
			...prevValues,
			[name] : value,
		}));
	}

	const filteredProducts = useMemo(() => filterProducts(products, search), [products, search]);

	async function handleRemove(slug){
		const answer = window.confirm('Are sure you want to delete?');
		try {
			if (answer) {
				await removeProduct(slug, user.token);
				await fetchProductsByCount();
			}
		} catch (err) {
			alert('Product delete failed');
		}
	}

	function closeProductModal() {
		setModalOpen(false);
		setModalLoading(false);
		setModalMode('create');
		setEditingSlug('');
		setProductValues(INITIAL_PRODUCT_VALUES);
		setSubCategoryData([]);
	}

	function openCreateModal() {
		setModalMode('create');
		setEditingSlug('');
		setProductValues(INITIAL_PRODUCT_VALUES);
		setSubCategoryData([]);
		setModalOpen(true);
	}

	async function openEditModal(slug) {
		try {
			setModalMode('edit');
			setEditingSlug(slug);
			setModalOpen(true);
			setModalLoading(true);

			const result = await getProductBySlug(slug);
			const transformedSubOptions = (result.subCategory || []).map((option) => ({
				_id   : option._id,
				value : option.name.toLowerCase(),
				label : option.name,
			}));

			setProductValues({
				...INITIAL_PRODUCT_VALUES,
				...result,
				category    : result.category?._id || '',
				subCategory : transformedSubOptions,
				images      : result.images || [],
			});
			await fetchSubCategoryData(result.category?._id || '');
		} catch (error) {
			alert('Fetching product failed');
			closeProductModal();
		} finally {
			setModalLoading(false);
		}
	}

	const handleFileUploadAndResize = (event) => {
		const files = event.target.files;
		if (!files) {
			return;
		}

		for (let index = 0; index < files.length; index += 1) {
			Resizer.imageFileResizer(
				files[index],
				720,
				720,
				'JPEG',
				100,
				0,
				async (uri) => {
					try {
						const result = await imageUpload({ image: uri }, user.token);
						setProductValues((prevValues) => ({
							...prevValues,
							images : [...(prevValues.images || []), result],
						}));
					} catch (error) {
						alert(error);
					}
				},
				'base64',
			);
		}
	};

	async function handleProductSubmit(event) {
		event.preventDefault();

		try {
			if (modalMode === 'edit' && editingSlug) {
				await updateProductBySlug(editingSlug, productValues, user.token);
				alert('Successfully updated the product');
			} else {
				await createProduct(productValues, user.token);
				alert('Product successfully created');
			}

			await fetchProductsByCount();
			closeProductModal();
		} catch (error) {
			alert(modalMode === 'edit' ? 'Update product failed' : 'Create product failed');
		}
	}

	useEffect(() => {
		fetchProductsByCount();
		fetchCategoriesData();
	}, []);

	useEffect(() => {
		if (modalOpen) {
			fetchSubCategoryData(productValues.category);
		}
	}, [modalOpen, productValues.category]);

	return (
		<AdminShell
			role={role}
			title='Products'
			description='Manage products from a single list view with create and edit forms inside a modal.'
			actions={<AdminBadge tone='blue'>{products.length} products loaded</AdminBadge>}
		>
			<AdminPanel title='Product List' action={<button type='button' onClick={openCreateModal} className='rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white'>Create Product</button>}>
				<div className='mb-6'>
					<SearchFilter
						searchValue={search}
						handleSearchFilterChange={handleSearchFilterChange}
						showButton={false}
						searchClass='w-full'
						placeHolder='Search by product title or brand'
					/>
				</div>
				<AdminDataTable>
					<thead>
						<tr className='text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>
							<th className='px-4 py-2'>Product</th>
							<th className='px-4 py-2'>Brand</th>
							<th className='px-4 py-2'>Price</th>
							<th className='px-4 py-2'>Quantity</th>
							<th className='px-4 py-2'>Sold</th>
							<th className='px-4 py-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredProducts.map((item) => (
							<tr key={item._id} className='bg-slate-50 text-sm text-slate-600 shadow-sm'>
								<td className='rounded-l-3xl px-4 py-4'>
									<div className='font-semibold text-slate-800'>{item.title}</div>
									<div className='block max-w-[24rem] truncate text-xs text-slate-400'>{item.description}</div>
								</td>
								<td className='px-4 py-4'>{item.brand || '--'}</td>
								<td className='px-4 py-4'>${item.price}</td>
								<td className='px-4 py-4'>{item.quantity || 0}</td>
								<td className='px-4 py-4'>{item.sold || 0}</td>
								<td className='rounded-r-3xl px-4 py-4'>
									<div className='flex gap-2'>
										<button type='button' onClick={() => handleRemove(item.slug)} className='rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600'>Delete</button>
										<button type='button' onClick={() => openEditModal(item.slug)} className='rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white'>Edit</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</AdminDataTable>
			</AdminPanel>
			<Modal
				isOpen={modalOpen}
				onClose={closeProductModal}
				modalTitle={modalMode === 'edit' ? 'Edit Product' : 'Create Product'}
				modalContainerClass='relative mx-auto w-full max-w-5xl overflow-hidden rounded-[28px] bg-white shadow-xl'
			>
				{modalLoading ? (
					<div className='py-12 text-center'>Loading...</div>
				) : (
					<div className='max-h-[78vh] overflow-y-auto pr-1'>
						<ImagePreview
							data={user}
							values={productValues}
							handleImageRemove={removeImageUpload}
							imagesData={productValues.images || []}
							setValues={setProductValues}
							alt='productImagePreview'
						/>
						<FileUpload
							handleFileUploadAndResize={handleFileUploadAndResize}
							setValues={setProductValues}
							variant='mt-5'
							inputClass='block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-sky-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-sky-700 hover:file:bg-sky-100'
						/>
						<Form
							formClass='mt-8'
							values={productValues}
							handleChange={handleProductChange}
							handleSubmit={handleProductSubmit}
							categoriesDataOption={categoriesData}
							subCategoryDataOption={subCategoryData}
							product
						/>
					</div>
				)}
			</Modal>
		</AdminShell>
	);
};

Products.propTypes = {
	role : PropTypes.string,
};

Products.defaultProps = {
	role : '',
};

export default Products;
