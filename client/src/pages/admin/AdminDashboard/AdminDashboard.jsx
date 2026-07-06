import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';
// updateOrderStatus
import { getOrderList } from '../../../library/services/admin';
import { orderStatusOptions } from '../../../library/common/constants/selectOptions';
import Spinner from '../../../library/components/Spinner/Spinner';

const AdminDashboard = ({ role }) => {
	const [orderList, setOrderList] = useState([]);
	const [filteredOrders, setFilteredOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const { user } = useSelector((state) => ({ ...state }));
	const { allOrders } = orderList || {};

	useEffect(() => {
	const fetchOrderList = async () => {
		try {
			setLoading(true);
			const result = await getOrderList(user.token);
			if (result.ok) {
				setOrderList(result);
				setFilteredOrders(result.allOrders || []);
			}
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};

	fetchOrderList();
	}, [user.token]);

	useEffect(() => {
		let filtered = allOrders || [];

		// Apply status filter
		if (statusFilter !== 'all') {
			filtered = filtered.filter(order => order.orderStatus === statusFilter);
		}

		// Apply search filter
		if (searchTerm) {
			filtered = filtered.filter(order => 
				order._id.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		setFilteredOrders(filtered);
		setCurrentPage(1);
	}, [searchTerm, statusFilter, allOrders]);

	// For future use, if you want to update order status from the dashboard
	// async function handleChangeStatus(orderId, orderStatus){
	// 	try {
	// 		const result = await updateOrderStatus(orderId, orderStatus, user.token);
	// 		if (result.ok) {
	// 			await fetchOrderList();
	// 		}
	// 	} catch (error) {
	// 		alert(error);
	// 	}
	// }
	const getStatusBadgeColor = (status) => {
		const statusColors = {
			'Not processed': 'bg-amber-50 text-amber-700',
			'Processing': 'bg-blue-50 text-blue-700',
			'Dispatched': 'bg-cyan-50 text-cyan-700',
			'Cancelled': 'bg-red-50 text-red-700',
			'Delivered': 'bg-green-50 text-green-700',
		};
		return statusColors[status] || 'bg-gray-50 text-gray-700';
	};

	const getInitials = (name) => {
		return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'UN';
	};

	const getAvatarColor = (index) => {
		const colors = ['bg-purple-600', 'bg-green-600', 'bg-orange-600', 'bg-pink-600', 'bg-blue-600'];
		return colors[index % colors.length];
	};

	// Pagination
	const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
	const startIdx = (currentPage - 1) * itemsPerPage;
	const paginatedOrders = filteredOrders.slice(startIdx, startIdx + itemsPerPage);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10 max-[600px]:flex-col'>
				<div className='flex-none w-40 border-r border-gray-200 max-[600px]:border-none'>
					<Sidebar role={role} />
				</div>
				<div className='flex-auto p-8'>
					{/* Header */}
					<div className='mb-8'>
						<h1 className='text-3xl font-bold text-gray-900'>Recent Orders</h1>
					</div>

					{/* Controls */}
					<div className='flex flex-col sm:flex-row gap-4 mb-8 items-center'>
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className='px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
						>
							<option value='all'>All Status</option>
							{orderStatusOptions.map((opt) => (
								<option key={opt._id} value={opt._id}>{opt.name}</option>
							))}
						</select>

						<div className='relative flex-1 max-w-sm'>
							<input
								type='text'
								placeholder='Search order id...'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className='w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500'
							/>
							<svg className='absolute right-3 top-2.5 w-5 h-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
							</svg>
						</div>

						{/* <button className='px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2'>
							<span>+</span> New Order
						</button> */}
					</div>

					{/* Table */}
					{loading ? (
						<Spinner />
					) : (
						<>
							<div className='overflow-x-auto border border-gray-200 rounded-lg'>
								<table className='w-full'>
									<thead className='bg-gray-50 border-b border-gray-200'>
										<tr>
											<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Order ID</th>
											<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Customer</th>
											<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Date & Time</th>
											<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Total</th>
											<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Status</th>
											<th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>Actions</th>
										</tr>
									</thead>
									<tbody>
										{paginatedOrders.map((order, idx) => (
											<tr key={order._id} className='border-b border-gray-200 hover:bg-gray-50'>
												<td className='px-6 py-4'>
													<span className='text-blue-600 font-semibold cursor-pointer hover:underline'>
														{order._id.substring(0, 24)}...
													</span>
												</td>
												<td className='px-6 py-4'>
													<div className='flex items-center gap-3'>
														<div className={`w-10 h-10 rounded-full ${getAvatarColor(idx)} flex items-center justify-center text-white font-semibold text-sm`}>
															{getInitials(order.userId?.name || 'User')}
														</div>
														<div>
															<div className='font-medium text-gray-900'>{order.orderedBy?.name || 'Unknown'}</div>
															<div className='text-sm text-gray-500'>{order.userId?.email || ''}</div>
														</div>
													</div>
												</td>
												<td className='px-6 py-4 text-gray-700'>
													<div className='text-sm'>
														{new Date(order.createdAt).toLocaleDateString('en-US', { 
															month: 'short', 
															day: 'numeric', 
															year: 'numeric' 
														})}
													</div>
													<div className='text-xs text-gray-500'>
														{new Date(order.createdAt).toLocaleTimeString('en-US', { 
															hour: 'numeric', 
															minute: '2-digit', 
															hour12: true 
														})}
													</div>
												</td>
												<td className='px-6 py-4 font-semibold text-gray-900'>
													{new Intl.NumberFormat('en-US', {
														style: 'currency',
														currency: 'USD',
													}).format(order.paymentIntent.amount)}
												</td>
												<td className='px-6 py-4'>
													<span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadgeColor(order.orderStatus)}`}>
														{order.orderStatus}
													</span>
												</td>
												<td className='px-6 py-4'>
													<div className='flex items-center gap-3'>
														<button className='text-gray-500 hover:text-gray-700 transition'>
															<svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
																<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
																<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
															</svg>
														</button>
														<button className='text-gray-500 hover:text-gray-700 transition'>
															<svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
																<path d='M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z' />
															</svg>
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{/* Pagination Info */}
							<div className='mt-4 text-sm text-gray-600'>
								Showing {startIdx + 1} to {Math.min(startIdx + itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
							</div>

							{/* Pagination */}
							{totalPages > 1 && (
								<div className='mt-6 flex justify-center gap-2'>
									<button
										onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
										disabled={currentPage === 1}
										className='px-3 py-2 border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50 hover:bg-gray-50'
									>
										←
									</button>
									{Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
										<button
											key={page}
											onClick={() => setCurrentPage(page)}
											className={`px-3 py-2 rounded-lg font-semibold transition ${
												currentPage === page
													? 'bg-blue-600 text-white'
													: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
											}`}
										>
											{page}
										</button>
									))}
									<button
										onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
										disabled={currentPage === totalPages}
										className='px-3 py-2 border border-gray-300 rounded-lg text-gray-700 disabled:opacity-50 hover:bg-gray-50'
									>
										→
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

AdminDashboard.propTypes = {
	role : PropTypes.string,
};

export default AdminDashboard;

				
