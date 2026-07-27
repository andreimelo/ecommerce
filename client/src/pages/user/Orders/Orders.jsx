import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import SideBar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';
import { getUserOrders } from '../../../library/services/user';
import { options } from '../../../library/common/constants/currency';
import OrderInfoModal from './components/OrderInfoModal';
import OrderPdf from './components/OrderPdf';
import Spinner from '../../../library/components/Spinner/Spinner';

function Orders({ role }){
	const { user } = useSelector((state) => ({ ...state }));
	const [orders, setOrders] = useState([]);
	const [loading, setLoading] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [modalData, setModalData] = useState([]);
	const [statusFilter, setStatusFilter] = useState('all');
	const [paymentFilter, setPaymentFilter] = useState('all');
	const [searchTerm, setSearchTerm] = useState('');
	const [page, setPage] = useState(1);
	const ORDERS_PER_PAGE = 4;

	const filteredOrders = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		return orders.filter((order) => {
			const matchesStatus = statusFilter === 'all' || (order.orderStatus || '').toLowerCase() === statusFilter;
			const paymentStatus = order?.paymentIntent?.status || '';
			const matchesPayment = paymentFilter === 'all' || paymentStatus.toLowerCase() === paymentFilter;
			const productTitles = (order.products || [])
				.map((item) => item?.product?.title || '')
				.join(' ')
				.toLowerCase();
			const matchesSearch = !normalizedSearch || productTitles.includes(normalizedSearch);

			return matchesStatus && matchesPayment && matchesSearch;
		});
	}, [orders, paymentFilter, searchTerm, statusFilter]);

	const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ORDERS_PER_PAGE));
	const paginatedOrders = useMemo(() => {
		const start = (page - 1) * ORDERS_PER_PAGE;
		return filteredOrders.slice(start, start + ORDERS_PER_PAGE);
	}, [filteredOrders, page]);

	useEffect(() => {
		async function fetchUserOrder(){
			try {
				setLoading(true);
				const result = await getUserOrders(user.token);
				if (!result?.ok) {
					throw new Error(result?.message || 'Unable to load orders right now.');
				}

				setOrders(result.data || []);
			} catch (error) {
				alert(error?.message || 'Unable to load orders right now.');
			} finally {
				setLoading(false);
			}
		}

		if (user?.token) {
			fetchUserOrder();
		}
	}, [user?.token]);

	useEffect(() => {
		setPage(1);
	}, [statusFilter, paymentFilter, searchTerm]);

	useEffect(() => {
		if (page > totalPages) {
			setPage(totalPages);
		}
	}, [page, totalPages]);

	function openModal(data){
		setModalOpen(true);
		setModalData(data);
	}

	function closeModal(){
		setModalOpen(false);
	}

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10 max-[600px]:flex-col max-[600px]:items-baseline'>
				<div className='flex-none w-40 border-r border-gray-200 max-[600px]:border-none'>
					<SideBar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Orders</label>
					<div className='mt-4 grid gap-3 md:grid-cols-3'>
						<input
							type='text'
							value={searchTerm}
							onChange={(event) => setSearchTerm(event.target.value)}
							placeholder='Search by product title'
							className='rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400'
						/>
						<select
							value={statusFilter}
							onChange={(event) => setStatusFilter(event.target.value)}
							className='rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400'
						>
							<option value='all'>All statuses</option>
							<option value='not yet processed'>Not yet processed</option>
							<option value='ongoing process'>Ongoing process</option>
							<option value='order has been dispatched'>Dispatched</option>
							<option value='out for delivery'>Out for delivery</option>
							<option value='order has been cancelled'>Cancelled</option>
							<option value='order is completed'>Completed</option>
						</select>
						<select
							value={paymentFilter}
							onChange={(event) => setPaymentFilter(event.target.value)}
							className='rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400'
						>
							<option value='all'>All payments</option>
							<option value='succeeded'>Succeeded</option>
							<option value='cash on delivery'>Cash on delivery</option>
							<option value='processing'>Processing</option>
							<option value='requires_payment_method'>Requires payment method</option>
						</select>
					</div>
					{loading ? (
						<Spinner />
					) : (
						<div className='mt-6 space-y-4'>
							{filteredOrders.length <= 0 && (
								<div className='rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500'>
									No orders match your filters yet.
								</div>
							)}
							{paginatedOrders.map((item, index) => (
								<div key={item._id} className='rounded-2xl border border-slate-200 bg-white p-5 shadow-sm'>
									<div className='flex flex-wrap items-center justify-between gap-3'>
										<div>
											<button
												type='button'
												onClick={() => openModal(item)}
												className='text-left text-lg font-semibold text-slate-900 underline-offset-2 hover:underline'
											>
												Order #{(page - 1) * ORDERS_PER_PAGE + index + 1}
											</button>
											<div className='text-xs text-slate-400 mt-1'>{new Date(item.createdAt).toLocaleString()}</div>
										</div>
										<span className='rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white'>
											{item.orderStatus}
										</span>
									</div>
									<div className='mt-4 grid gap-3 text-sm text-slate-600 md:grid-cols-4'>
										<div>
											<div className='text-xs uppercase text-slate-400'>Amount</div>
											<div className='font-semibold text-slate-900'>
												{options[item.paymentIntent.currency]}
												{(item.paymentIntent.amount / 100).toFixed(2)}
											</div>
										</div>
										<div>
											<div className='text-xs uppercase text-slate-400'>Payment Method</div>
											<div className='font-semibold text-slate-900'>{item.paymentIntent.payment_method_types?.[0]?.toUpperCase() || 'N/A'}</div>
										</div>
										<div>
											<div className='text-xs uppercase text-slate-400'>Payment Status</div>
											<div className='font-semibold text-slate-900'>{item.paymentIntent.status?.toUpperCase() || 'N/A'}</div>
										</div>
										<div>
											<div className='text-xs uppercase text-slate-400'>Receipt</div>
											<div className='font-semibold text-blue-600'>
												<OrderPdf
													data={item}
													fileName={`Receipt#${(page - 1) * ORDERS_PER_PAGE + index + 1}.pdf`}
													title='Download PDF'
												/>
											</div>
										</div>
									</div>
								</div>
							))}
							{filteredOrders.length > ORDERS_PER_PAGE && (
								<div className='flex items-center justify-end gap-2 pt-2'>
									<button
										type='button'
										onClick={() => setPage((prev) => Math.max(1, prev - 1))}
										disabled={page === 1}
										className='rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 disabled:opacity-50'
									>
										Previous
									</button>
									<span className='text-xs text-slate-500'>Page {page} of {totalPages}</span>
									<button
										type='button'
										onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
										disabled={page === totalPages}
										className='rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 disabled:opacity-50'
									>
										Next
									</button>
								</div>
							)}
						</div>
					)}
					<OrderInfoModal
						title={'Order info'}
						data={modalData}
						modalOpen={modalOpen}
						closeModal={closeModal}
					/>
				</div>
			</div>
		</div>
	);
}

Orders.propTypes = {
	role : PropTypes.string,
};

export default Orders;
