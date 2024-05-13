import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../library/components/SideBar';
import Table from '../../../library/components/Table';
import PropTypes from 'prop-types';
import { getOrderList } from '../../../library/services/admin';
import { options } from '../../../library/common/constants/currency';

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
	useEffect(
		() => {
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
			fetchOrderList();
		},
		[
			user.token,
		],
	);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10'>
				<div className='flex-none w-40 border-r border-gray-200'>
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
														<span className='font-semibold'>
															Order Id:{' '}
														</span>
														{item._id}
													</div>
													<div>
														<span className='font-semibold'>
															Status:{' '}
														</span>
														{item.orderStatus}
													</div>
												</div>
												<div>
													<span className='font-semibold'>
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
