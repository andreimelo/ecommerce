import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../library/components/SideBar';
import Table from '../../../library/components/Table';
import SelectOption from '../../../library/components/SelectOption';
import PropTypes from 'prop-types';
import { getOrderList, updateOrderStatus } from '../../../library/services/admin';
import { options } from '../../../library/common/constants/currency';
import { orderStatusOptions } from '../../../library/common/constants/selectOptions';

const AdminDashboard = ({ role }) => {
	const [
		orderList,
		setOrderList,
	] = useState([]);
	const [
		loading,
		setLoading,
	] = useState(false);
	const { user } = useSelector((state) => ({ ...state }));
	const { allOrders } = orderList || {};

	async function fetchOrderList(){
		try {
			setLoading(true);
			const result = await getOrderList(user.token);
			if (result.ok) {
				setLoading(false);
				setOrderList(result);
			}
		} catch (error) {
			setLoading(false);

			alert(error);
		}
	}

	useEffect(() => {
		fetchOrderList();
		// eslint-disable-next-line
	}, []);

	async function handleChangeStatus(orderId, orderStatus){
		try {
			const result = await updateOrderStatus(orderId, orderStatus, user.token);
			if (result.ok) {
				await fetchOrderList();
			}
		} catch (error) {
			alert(error);
		}
	}
	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10 max-[600px]:flex-col max-[600px]:items-baseline'>
				<div className='flex-none w-40 border-r border-gray-200 max-[600px]:border-none'>
					<Sidebar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Dashboard</label>
					{
						loading ? <h2>🌀 Loading....</h2> :
						<div>
							{allOrders &&
								allOrders.map((item) => {
									return (
										<div className='my-5'>
											<div className='bg-gray-100 p-5'>
												<div className='flex justify-between'>
													<div>
														<span className='font-semibold mx-2'>
															Order Id:{' '}
														</span>
														{item._id}
													</div>
													<div className='flex'>
														<div className='font-semibold mx-2'>
															Status:{' '}
														</div>
														<div>
															<SelectOption
																labelClass
																selectClass={'w-auto'}
																value={item.orderStatus}
																onChange={(e) =>
																	handleChangeStatus(
																		item._id,
																		e.target.value,
																	)}
																data={orderStatusOptions}
															/>
														</div>
													</div>
												</div>
												<div>
													<span className='font-semibold mx-2'>
														Ordered By:
													</span>
													{new Date(
														item.createdAt,
													).toLocaleString()}
												</div>
											</div>
											<Table
												tableContainerClass={
													'relative overflow-x-auto shadow-md sm:rounded-lg my-5'
												}
												thead={
													item['products'] &&
													item['products'].length && (
														<thead className='text-xs text-white uppercase bg-gray-900 dark:text-white'>
															<tr>
																<th
																	scope='col'
																	class='px-6 py-3'
																>
																	Title
																</th>
																<th
																	scope='col'
																	class='px-6 py-3'
																>
																	Price
																</th>
																<th
																	scope='col'
																	class='px-6 py-3'
																>
																	Brand
																</th>
																<th
																	scope='col'
																	class='px-6 py-3'
																>
																	Color
																</th>
																<th
																	scope='col'
																	class='px-6 py-3'
																>
																	Count
																</th>
																<th
																	scope='col'
																	class='px-6 py-3'
																>
																	Shipping
																</th>
															</tr>
														</thead>
													)
												}
												tbody={
													item['products'] &&
													item['products'].map((item) => (
														<tbody
															key={item._id}
															className='text-gray-700'
														>
															<tr>
																<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap cursor-pointer'>
																	{item.product.title}
																</td>
																<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
																	{options['usd']}
																	{(item.product.price *
																		100 /
																		100).toFixed(
																		2,
																	)}{' '}
																	{/* {item.discount}% */}
																</td>
																<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
																	{item.product.brand}
																</td>
																<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
																	{item.product.color}
																</td>
																<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
																	{item.count}
																</td>
																<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
																	{
																		item.product
																			.shipping
																	}
																</td>
															</tr>
														</tbody>
													))
												}
											/>
											<hr className='my-10' />
										</div>
									);
								})}
						</div>}
				</div>
			</div>
		</div>
	);
};

AdminDashboard.propTypes = {
	role : PropTypes.string,
};

export default AdminDashboard;
