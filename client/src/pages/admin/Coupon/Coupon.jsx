import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../../../library/components/Input';
import Modal from '../../../library/components/Modal';
import { type } from '../../../library/common/constants/types';
import { currentDate } from '../../../library/helpers/date';
import { createCoupon, getCoupons, removeCoupon, updateCoupon } from '../../../library/services/coupon';
import SearchFilter from '../../../library/components/SearchFilter';
import { AdminBadge, AdminDataTable, AdminPanel, AdminShell } from '../components/AdminScaffold';
import { formatDateForInput, formatDateForTable, INITIAL_COUPON_VALUES } from '../utils/coupon';

const Coupon = ({ role }) => {
	const [couponList, setCouponList] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));
	const [values, setValues] = useState(INITIAL_COUPON_VALUES);
	const [search, setSearch] = useState('');
	const [modalOpen, setModalOpen] = useState(false);
	const [modalMode, setModalMode] = useState('create');
	const [editingCouponId, setEditingCouponId] = useState('');
	const { name, discount, expiry } = values;

	async function fetchCouponList(token){
		try {
			const result = await getCoupons(token);
			setCouponList(result);
		} catch (error) {
			alert(error);
		}
	}

	async function handleRemoveCoupon(id){
		try {
			const confirmation = window.confirm('Are sure you want to remove this item?');
			if (confirmation) {
				await removeCoupon(id, user.token);
				fetchCouponList(user.token);
			}
		} catch (error) {
			alert(error);
		}
	}

	function handleSearchFilterChange(event) {
		setSearch(event.target.value.toLowerCase());
	}

	function handleChange(nameArg, value) {
		setValues((prevValues) => ({
			...prevValues,
			[nameArg] : value,
		}));
	}

	function closeModal() {
		setModalOpen(false);
		setModalMode('create');
		setEditingCouponId('');
		setValues(INITIAL_COUPON_VALUES);
	}

	function openCreateModal() {
		setModalMode('create');
		setEditingCouponId('');
		setValues(INITIAL_COUPON_VALUES);
		setModalOpen(true);
	}

	function openEditModal(item) {
		setModalMode('edit');
		setEditingCouponId(item._id);
		setValues({
			name     : item.name,
			discount : String(item.discount),
			expiry   : formatDateForInput(item.expiry),
		});
		setModalOpen(true);
	}

	async function handleModalSubmit(event){
		event.preventDefault();

		try {
			if (modalMode === 'edit' && editingCouponId) {
				const result = await updateCoupon(editingCouponId, values, user.token);
				if (result.ok) {
					alert(`${values.name} is updated`);
				}
			} else {
				const result = await createCoupon(values, user.token);
				if (result.ok) {
					alert(`${values.name} is created`);
				}
			}

			fetchCouponList(user.token);
			closeModal();
		} catch (error) {
			alert(error);
		}
	}

	const filteredCoupons = (couponList.data || []).filter((item) => item.name.toLowerCase().includes(search));

	useEffect(() => {
		fetchCouponList(user.token);
	}, [user.token]);

	return (
		<AdminShell
			role={role}
			title='Coupon'
			description='Manage coupons from the list and open create or edit forms in a modal.'
			actions={<AdminBadge tone='blue'>{(couponList.data || []).length} coupons</AdminBadge>}
		>
			<AdminPanel title='Coupon List' action={<button type='button' onClick={openCreateModal} className='rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white'>Create Coupon</button>}>
				<div className='mb-6'>
					<SearchFilter
						searchValue={search}
						handleSearchFilterChange={handleSearchFilterChange}
						showButton={false}
						searchClass='w-full'
						placeHolder='Filter coupons'
					/>
				</div>
				<AdminDataTable>
					<thead>
						<tr className='text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>
							<th className='px-4 py-2'>Name</th>
							<th className='px-4 py-2'>Discount</th>
							<th className='px-4 py-2'>Expiry Date</th>
							<th className='px-4 py-2'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{filteredCoupons.map((item) => (
							<tr key={item._id} className='bg-slate-50 text-sm text-slate-600 shadow-sm'>
								<td className='rounded-l-3xl px-4 py-4'>
									<div className='font-semibold text-slate-800'>{item.name}</div>
									<div className='mt-1 text-xs uppercase tracking-[0.18em] text-slate-400'>Promotion code</div>
								</td>
								<td className='px-4 py-4'>
									<span className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700'>{item.discount}% off</span>
								</td>
								<td className='px-4 py-4 text-sm text-slate-500'>{formatDateForTable(item.expiry)}</td>
								<td className='rounded-r-3xl px-4 py-4'>
									<div className='flex gap-2'>
										<button type='button' onClick={() => openEditModal(item)} className='rounded-full bg-slate-900 px-3 py-2 text-xs font-semibold text-white'>Edit</button>
										<button type='button' onClick={() => handleRemoveCoupon(item._id)} className='rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600'>Delete</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</AdminDataTable>
			</AdminPanel>
			<Modal
				isOpen={modalOpen}
				onClose={closeModal}
				modalTitle={modalMode === 'edit' ? 'Edit Coupon' : 'Create Coupon'}
				modalContainerClass='relative mx-auto w-full max-w-2xl rounded-[28px] bg-white shadow-xl'
			>
				<form onSubmit={handleModalSubmit} className='grid my-5'>
					<Input
						value={name}
						placeHolder='Enter a name'
						name={'name'}
						onChange={(event) => handleChange(event.target.name, event.target.value)}
						variant='mb-5 appearance-none rounded border border-gray-300 px-4 py-2 text-gray-700 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none'
					/>
					<Input
						value={discount}
						placeHolder='Enter a discount'
						name={'discount'}
						type={type.input.number}
						onChange={(event) => handleChange(event.target.name, event.target.value)}
						variant='mb-5 appearance-none rounded border border-gray-300 px-4 py-2 text-gray-700 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none'
					/>
					<Input
						value={expiry}
						placeHolder='Enter a date'
						type={type.input.date}
						name={'expiry'}
						min={currentDate}
						onChange={(event) => handleChange(event.target.name, event.target.value)}
						variant='mb-5 appearance-none rounded border border-gray-300 px-4 py-2 text-gray-700 leading-tight focus:border-gray-500 focus:bg-white focus:outline-none'
					/>
					<button className='w-fit rounded bg-blue-500 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700'>
						Submit
					</button>
				</form>
			</Modal>
		</AdminShell>
	);
};

Coupon.propTypes = {
	role : PropTypes.string,
};

Coupon.defaultProps = {
	role : '',
};

export default Coupon;
