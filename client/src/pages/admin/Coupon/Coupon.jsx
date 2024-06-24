import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../library/components/SideBar';
import Input from '../../../library/components/Input';
import useInput from '../../../library/hooks/useInput';
import { type } from '../../../library/common/constants/types';
import { currentDate } from '../../../library/helpers/date';
import { createCoupon, getCoupons, removeCoupon } from '../../../library/services/coupon';
import Table from '../../../library/components/Table';
import icons from '../../../resources/icons';

const Coupon = ({ role }) => {
	const [
		couponList,
		setCouponList,
	] = useState([]);
	const { user } = useSelector((state) => ({ ...state }));
	const {
		values,
		handleChange,
		// errors,
		handleSubmit,
		setValues,
	} = useInput(clickedSubmit, () => {
		return {};
	});
	const { name, discount, expiry } = values;

	async function fetchCouponList(token){
		try {
			const result = await getCoupons(token);
			setCouponList(result);
		} catch (error) {
			alert(error);
		}
	}

	async function clickedSubmit(){
		try {
			const result = await createCoupon(values, user.token);
			if (result.ok) {
				alert(`${values.name} is created`);
				fetchCouponList(user.token);
				setValues({
					name     : '',
					discount : '',
					expiry   : '',
				});
			}
		} catch (error) {
			alert(error);
		}
	}

	async function handleRemoveCoupon(id){
		try {
			let confirmation = window.confirm('Are sure you want to remove this item?');
			if (confirmation) {
				await removeCoupon(id, user.token);
				fetchCouponList(user.token);
			}
		} catch (error) {
			alert(error);
		}
	}

	useEffect(
		() => {
			fetchCouponList(user.token);
		},
		[
			user.token,
		],
	);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10 max-[600px]:flex-col max-[600px]:items-baseline'>
				<div className='flex-none w-40 border-r border-gray-200 max-[600px]:border-none'>
					<Sidebar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Create Coupon</label>
					<form onSubmit={handleSubmit} className='grid my-5'>
						<Input
							value={name}
							placeHolder='Enter a name'
							name={'name'}
							onChange={(event) =>
								handleChange(event.target.name, event.target.value)}
							variant={
								'mb-5 bg-white-200 appearance-none border border-gray-300 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							}
						/>
						<Input
							value={discount}
							placeHolder='Enter a discount'
							name={'discount'}
							type={type['input']['number']}
							onChange={(event) =>
								handleChange(event.target.name, event.target.value)}
							variant={
								'mb-5 bg-white-200 appearance-none border border-gray-300 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							}
						/>
						<Input
							value={expiry}
							placeHolder='Enter a date'
							type={type['input']['date']}
							name={'expiry'}
							min={currentDate}
							onChange={(event) =>
								handleChange(event.target.name, event.target.value)}
							variant={
								'mb-5 bg-white-200 appearance-none border border-gray-300 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							}
						/>
						<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 border border-blue-700 rounded text-sm w-1/4'>
							Submit
						</button>
					</form>
					<Table
						thead={
							couponList.data &&
							couponList.data.length && (
								<thead className='text-xs text-white uppercase bg-gray-900 dark:text-white'>
									<tr>
										<th scope='col' class='px-6 py-3'>
											Name
										</th>
										<th scope='col' class='px-6 py-3'>
											Discount
										</th>
										<th scope='col' class='px-6 py-3'>
											Expiry Date
										</th>
										<th scope='col' class='px-6 py-3'>
											Delete
										</th>
									</tr>
								</thead>
							)
						}
						tbody={
							couponList.data &&
							couponList.data.map((item) => (
								<tbody key={item._id} className='text-gray-700'>
									<tr>
										<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
											{item.name}
										</td>
										<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
											{item.discount}%
										</td>
										<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
											{item.expiry}
										</td>
										<td
											onClick={() => handleRemoveCoupon(item._id)}
											className='px-6 py-4 cursor-pointer'
										>
											{icons['delete']}
										</td>
									</tr>
								</tbody>
							))
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default Coupon;
