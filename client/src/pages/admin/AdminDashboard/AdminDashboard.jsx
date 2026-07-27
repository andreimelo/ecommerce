import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Sidebar from '../../../library/components/SideBar';
import Spinner from '../../../library/components/Spinner/Spinner';
import { getOrderList, updateOrderStatus } from '../../../library/services/admin';
import { getUserAccounts } from '../../../library/services/user';
import { getProductsByCount } from '../../../library/services/product';
import { getCategories } from '../../../library/services/category';
import { getSubCategories } from '../../../library/services/sub-category';
import { getCoupons } from '../../../library/services/coupon';
import { orderStatusOptions } from '../../../library/common/constants/selectOptions';
import {
	formatCurrency,
	formatShortDate,
	formatTime,
} from '../utils/dashboardFormatters';
import {
	buildMonthlySeries,
	getStatusBadgeColor,
	getTrend,
	startOfMonth,
} from '../helpers/dashboardAnalytics';
import LineChart from '../components/dashboard/LineChart';
import DonutChart from '../components/dashboard/DonutChart';
import DashboardCard from '../components/dashboard/DashboardCard';
import Panel from '../components/dashboard/Panel';

const LOW_STOCK_THRESHOLD = 5;
const ITEMS_PER_PAGE = 5;
const ADMIN_SIDEBAR_COLLAPSED_KEY = 'admin.sidebar.collapsed';

const AdminDashboard = ({ role }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [orders, setOrders] = useState([]);
	const [accounts, setAccounts] = useState([]);
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [couponList, setCouponList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('all');
	const [currentPage, setCurrentPage] = useState(1);
	const [updatingOrderId, setUpdatingOrderId] = useState('');
	const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
		if (typeof window === 'undefined') {
			return false;
		}

		return window.localStorage.getItem(ADMIN_SIDEBAR_COLLAPSED_KEY) === 'true';
	});

	useEffect(() => {
		const fetchDashboardData = async () => {
			try {
				setLoading(true);
				const [ordersResult, accountsResult, productsResult, categoriesResult, subCategoriesResult, couponsResult] = await Promise.all([
					getOrderList(user.token),
					getUserAccounts(user.token),
					getProductsByCount(100),
					getCategories(),
					getSubCategories(),
					getCoupons(user.token),
				]);

				setOrders(ordersResult?.allOrders || []);
				setAccounts(Array.isArray(accountsResult) ? accountsResult : []);
				setProducts(Array.isArray(productsResult) ? productsResult : []);
				setCategories(Array.isArray(categoriesResult) ? categoriesResult : []);
				setSubCategories(Array.isArray(subCategoriesResult) ? subCategoriesResult : []);
				setCouponList(Array.isArray(couponsResult?.data) ? couponsResult.data : []);
			} catch (error) {
				alert(error?.message || error);
			} finally {
				setLoading(false);
			}
		};

		fetchDashboardData();
	}, [user.token]);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(ADMIN_SIDEBAR_COLLAPSED_KEY, String(sidebarCollapsed));
		}
	}, [sidebarCollapsed]);

	function handleSidebarToggle() {
		setSidebarCollapsed((currentCollapsed) => {
			const nextCollapsed = !currentCollapsed;
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(ADMIN_SIDEBAR_COLLAPSED_KEY, String(nextCollapsed));
			}
			return nextCollapsed;
		});
	}

	const filteredOrders = useMemo(() => {
		let nextOrders = orders;

		if (statusFilter !== 'all') {
			nextOrders = nextOrders.filter((order) => order.orderStatus === statusFilter);
		}

		if (searchTerm.trim()) {
			const term = searchTerm.trim().toLowerCase();
			nextOrders = nextOrders.filter((order) => {
				const orderId = order._id?.toLowerCase() || '';
				const customerName = order.orderedBy?.name?.toLowerCase() || '';
				return orderId.includes(term) || customerName.includes(term);
			});
		}

		return nextOrders;
	}, [orders, searchTerm, statusFilter]);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm, statusFilter]);

	const dashboardData = useMemo(() => {
		const now = new Date();
		const thirtyDaysAgo = new Date(now);
		thirtyDaysAgo.setDate(now.getDate() - 30);
		const sixtyDaysAgo = new Date(now);
		sixtyDaysAgo.setDate(now.getDate() - 60);
		const thisMonthStart = startOfMonth(now);
		const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

		const currentMonthOrders = orders.filter((order) => new Date(order.createdAt) >= thisMonthStart);
		const previousMonthOrders = orders.filter((order) => {
			const createdAt = new Date(order.createdAt);
			return createdAt >= lastMonthStart && createdAt < thisMonthStart;
		});

		const currentMonthAccounts = accounts.filter((account) => new Date(account.createdAt) >= thisMonthStart);
		const previousMonthAccounts = accounts.filter((account) => {
			const createdAt = new Date(account.createdAt);
			return createdAt >= lastMonthStart && createdAt < thisMonthStart;
		});

		const currentMonthProducts = products.filter((product) => new Date(product.createdAt) >= thisMonthStart);
		const previousMonthProducts = products.filter((product) => {
			const createdAt = new Date(product.createdAt);
			return createdAt >= lastMonthStart && createdAt < thisMonthStart;
		});

		const revenueSeries = buildMonthlySeries(orders, (order) => Number(order.paymentIntent?.amount || 0));
		const orderSeries = buildMonthlySeries(orders, () => 1);
		const totalRevenue = orders.reduce((sum, order) => sum + Number(order.paymentIntent?.amount || 0), 0);
		const currentMonthRevenue = currentMonthOrders.reduce((sum, order) => sum + Number(order.paymentIntent?.amount || 0), 0);
		const previousMonthRevenue = previousMonthOrders.reduce((sum, order) => sum + Number(order.paymentIntent?.amount || 0), 0);
		const lowStockProducts = products
			.filter((product) => Number(product.quantity || 0) <= LOW_STOCK_THRESHOLD)
			.sort((first, second) => Number(first.quantity || 0) - Number(second.quantity || 0));
		const outOfStockCount = products.filter((product) => Number(product.quantity || 0) <= 0).length;
		const inventoryValue = products.reduce((sum, product) => (
			sum + Number(product.price || 0) * Number(product.quantity || 0)
		), 0);
		const categoryNameById = categories.reduce((accumulator, category) => {
			accumulator[category._id] = category.name;
			return accumulator;
		}, {});
		const categoryPalette = ['#6d5efc', '#2563eb', '#22c55e', '#f59e0b', '#ef4444'];
		const categorySales = Object.entries(products.reduce((accumulator, product) => {
			const categoryName = categoryNameById[product.category] || 'Others';
			accumulator[categoryName] = (accumulator[categoryName] || 0) + 1;
			return accumulator;
		}, {}))
			.sort((first, second) => second[1] - first[1])
			.slice(0, 5)
			.map(([label, value], index) => ({
				label,
				value,
				color : categoryPalette[index % categoryPalette.length],
			}));
		const topProducts = [
			...products,
		].sort((first, second) => Number(second.sold || 0) - Number(first.sold || 0)).slice(0, 4);
		const recentCustomers = [
			...accounts,
		].sort((first, second) => new Date(second.createdAt) - new Date(first.createdAt)).slice(0, 4);
		const activeCoupons = couponList.filter((coupon) => new Date(coupon.expiry) >= thirtyDaysAgo);
		const alerts = [
			...lowStockProducts.slice(0, 2).map((product) => ({
				label : `${product.title} is low in stock`,
				time  : `${product.quantity || 0} left`,
				color : 'text-rose-500 bg-rose-50',
			})),
			...activeCoupons.slice(0, 1).map((coupon) => ({
				label : `${coupon.name} coupon is active`,
				time  : `Ends ${formatShortDate(coupon.expiry)}`,
				color : 'text-emerald-500 bg-emerald-50',
			})),
			...orders.slice(0, 1).map((order) => ({
				label : `Payment received from ${order.orderedBy?.name || 'customer'}`,
				time  : formatTime(order.createdAt),
				color : 'text-amber-500 bg-amber-50',
			})),
		].slice(0, 4);

		return {
			revenueSeries,
			orderSeries,
			totalRevenue,
			currentMonthRevenue,
			previousMonthRevenue,
			lowStockProducts,
			outOfStockCount,
			inventoryValue,
			categorySales,
			topProducts,
			recentCustomers,
			alerts,
			currentMonthOrders,
			previousMonthOrders,
			currentMonthAccounts,
			previousMonthAccounts,
			currentMonthProducts,
			previousMonthProducts,
			newProductsThisMonth : products.filter((product) => new Date(product.createdAt) >= thirtyDaysAgo).length,
			activeCouponsCount   : activeCoupons.length,
			totalCategories      : categories.length,
			totalSubCategories   : subCategories.length,
		};
	}, [accounts, categories, couponList, orders, products, subCategories]);

	const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
	const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
	const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

	async function handleOrderStatusChange(orderId, nextStatus) {
		const currentOrder = orders.find((order) => order._id === orderId);

		if (!currentOrder || currentOrder.orderStatus === nextStatus) {
			return;
		}

		try {
			setUpdatingOrderId(orderId);
			const result = await updateOrderStatus(orderId, nextStatus, user.token);

			if (result?.updatedOrderStatus) {
				setOrders((prevOrders) => prevOrders.map((order) => (
					order._id === orderId ? { ...order, orderStatus: result.updatedOrderStatus.orderStatus } : order
				)));
			}
		} catch (error) {
			alert(error?.message || error);
		} finally {
			setUpdatingOrderId('');
		}
	}

	const statCards = [
		{
			title  : 'Total Revenue',
			value  : formatCurrency(dashboardData.totalRevenue),
			trend  : getTrend(dashboardData.currentMonthRevenue, dashboardData.previousMonthRevenue),
			accent : 'border-violet-100 bg-violet-50/55',
			icon   : <span className='text-lg font-semibold text-violet-600'>$</span>,
		},
		{
			title  : 'Total Orders',
			value  : `${orders.length}`,
			trend  : getTrend(dashboardData.currentMonthOrders.length, dashboardData.previousMonthOrders.length),
			accent : 'border-emerald-100 bg-emerald-50/55',
			icon   : <span className='text-lg font-semibold text-emerald-600'>O</span>,
		},
		{
			title  : 'Total Customers',
			value  : `${accounts.filter(account => account.role !== 'admin').length}`,
			trend  : getTrend(dashboardData.currentMonthAccounts.length, dashboardData.previousMonthAccounts.length),
			accent : 'border-sky-100 bg-sky-50/55',
			icon   : <span className='text-lg font-semibold text-sky-600'>U</span>,
		},
		{
			title  : 'Total Products',
			value  : `${products.length}`,
			trend  : getTrend(dashboardData.currentMonthProducts.length, dashboardData.previousMonthProducts.length),
			accent : 'border-amber-100 bg-amber-50/55',
			icon   : <span className='text-lg font-semibold text-amber-600'>P</span>,
		},
		{
			title  : 'Low Stock Products',
			value  : `${dashboardData.lowStockProducts.length}`,
			trend  : -1 * getTrend(dashboardData.lowStockProducts.length, Math.max(products.length - dashboardData.lowStockProducts.length, 1)),
			accent : 'border-rose-100 bg-rose-50/55',
			icon   : <span className='text-lg font-semibold text-rose-600'>!</span>,
		},
	];

	return (
		<div className='w-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)]'>
			<div className='mx-auto flex w-full max-w-screen-[1680px] gap-6 px-4 py-8 max-[900px]:flex-col md:px-6'>
				<div className={`flex-none transition-all duration-300 ${sidebarCollapsed ? 'md:w-24' : 'md:w-[310px]'}`}>
					<div className='sticky top-24 rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.42)]'>
						<Sidebar
							role={role}
							collapsed={sidebarCollapsed}
							onToggle={handleSidebarToggle}
						/>
					</div>
				</div>
				<div className='min-w-0 flex-1 overflow-hidden'>
					<div className='mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between'>
						<div>
							<div className='text-xs font-semibold uppercase tracking-[0.38em] text-slate-400'>Admin workspace</div>
							<h1 className='mt-2 text-4xl font-semibold tracking-tight text-slate-950 md:text-[2.65rem]'>Commerce dashboard overview</h1>
							<p className='mt-3 max-w-3xl text-sm leading-6 text-slate-500'>
								A live summary of orders, products, customers, categories, and coupon activity from your existing admin data.
							</p>
						</div>
						<div className='flex flex-wrap gap-3 text-sm text-slate-500'>
							<span className='rounded-full border border-white/70 bg-white/90 px-4 py-2 shadow-sm'>
								{dashboardData.totalCategories} categories
							</span>
							<span className='rounded-full border border-white/70 bg-white/90 px-4 py-2 shadow-sm'>
								{dashboardData.totalSubCategories} sub categories
							</span>
							<span className='rounded-full border border-white/70 bg-white/90 px-4 py-2 shadow-sm'>
								{dashboardData.activeCouponsCount} active coupons
							</span>
						</div>
					</div>

					{loading ? (
						<div className='rounded-[28px] border border-white/70 bg-white/90 p-8 text-center shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)]'>
							<Spinner />
						</div>
					) : (
						<>
							<div className='grid gap-5 md:grid-cols-2 xl:grid-cols-5'>
								{statCards.map((card) => (
									<DashboardCard key={card.title} {...card} />
								))}
							</div>

							<div className='mt-6 grid gap-6 xl:grid-cols-[1.15fr_1.15fr_0.9fr]'>
								<Panel
									title='Revenue Overview'
									action={<span className='rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500'>Monthly</span>}
								>
									<LineChart
										data={dashboardData.revenueSeries}
										color='#6d5efc'
										fillColor='#a78bfa'
										valueFormatter={formatCurrency}
									/>
								</Panel>
								<Panel
									title='Orders Overview'
									action={<span className='rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500'>Monthly</span>}
								>
									<LineChart
										data={dashboardData.orderSeries}
										color='#22c55e'
										fillColor='#86efac'
										valueFormatter={(value) => `${value} orders`}
									/>
								</Panel>
								<Panel title='Sales by Category'>
									<DonutChart data={dashboardData.categorySales} />
								</Panel>
							</div>

							<div className='mt-6 grid gap-6 xl:grid-cols-[1.6fr_0.9fr]'>
								<Panel
									title='Recent Orders'
									action={
										<div className='flex flex-col gap-3 sm:flex-row'>
											<select
												value={statusFilter}
												onChange={(event) => setStatusFilter(event.target.value)}
												className='rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 outline-none focus:border-slate-400'
											>
												<option value='all'>All status</option>
												{orderStatusOptions.map((option) => (
													<option key={option.value} value={option.value}>{option.name}</option>
												))}
											</select>
											<input
												type='text'
												value={searchTerm}
												onChange={(event) => setSearchTerm(event.target.value)}
												placeholder='Search order or customer'
												className='rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 outline-none focus:border-slate-400'
											/>
										</div>
									}
								>
									<div className='overflow-x-auto'>
										<table className='w-full min-w-[820px] border-separate border-spacing-y-3'>
											<thead>
												<tr className='text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>
													<th className='px-4 py-2'>Order</th>
													<th className='px-4 py-2'>Customer</th>
													<th className='px-4 py-2'>Date</th>
													<th className='px-4 py-2'>Total</th>
													<th className='px-4 py-2'>Status / Access</th>
												</tr>
											</thead>
											<tbody>
												{paginatedOrders.map((order, index) => {
													const initials = (order.orderedBy?.name || 'User')
														.split(' ')
														.map((name) => name[0])
														.join('')
														.slice(0, 2)
														.toUpperCase();

													return (
														<tr key={order._id} className='rounded-3xl bg-slate-50 text-sm text-slate-600 shadow-sm'>
															<td className='rounded-l-3xl px-4 py-4 font-semibold text-blue-600'>
																{order._id?.slice(0, 24)}...
															</td>
															<td className='px-4 py-4'>
																<div className='flex items-center gap-3'>
																	<div className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold text-white shadow-sm ${index % 2 === 0 ? 'bg-violet-500' : 'bg-blue-500'}`}>
																		{initials}
																	</div>
																	<div>
																		<div className='font-semibold text-slate-800'>{order.orderedBy?.name || 'Unknown'}</div>
																		<div className='text-xs text-slate-400'>{order.orderedBy?.email || '--'}</div>
																	</div>
																</div>
															</td>
															<td className='px-4 py-4'>
																<div className='font-medium text-slate-700'>{formatShortDate(order.createdAt)}</div>
																<div className='text-xs text-slate-400'>{formatTime(order.createdAt)}</div>
															</td>
															<td className='px-4 py-4 font-semibold text-slate-900'>
																{formatCurrency(Number(order.paymentIntent?.amount || 0))}
															</td>
															<td className='rounded-r-3xl px-4 py-4'>
																<div className='flex flex-col gap-3'>
																	<span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadgeColor(order.orderStatus)}`}>
																		{order.orderStatus}
																	</span>
																	<select
																		value={order.orderStatus}
																		disabled={updatingOrderId === order._id}
																		onChange={(event) => handleOrderStatusChange(order._id, event.target.value)}
																		className='rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-500 outline-none focus:border-slate-400'
																	>
																		{orderStatusOptions.map((option) => (
																			<option key={option.value} value={option.value}>{option.name}</option>
																		))}
																	</select>
																</div>
															</td>
														</tr>
													);
												})}
											</tbody>
										</table>
									</div>
									<div className='mt-4 flex flex-col gap-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between'>
										<div>
											Showing {filteredOrders.length ? startIndex + 1 : 0} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length} orders
										</div>
										{totalPages > 1 && (
											<div className='flex items-center gap-2'>
												<button
													onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
													disabled={currentPage === 1}
													className='rounded-full border border-slate-200 px-3 py-2 disabled:opacity-40'
												>
													←
												</button>
												{Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
													<button
														key={page}
														onClick={() => setCurrentPage(page)}
														className={`h-10 w-10 rounded-full text-sm font-semibold ${currentPage === page ? 'bg-slate-900 text-white' : 'border border-slate-200 text-slate-500'}`}
													>
														{page}
													</button>
												))}
												<button
													onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
													disabled={currentPage === totalPages}
													className='rounded-full border border-slate-200 px-3 py-2 disabled:opacity-40'
												>
													→
												</button>
											</div>
										)}
									</div>
								</Panel>

								<Panel
									title='Low Stock Products'
									action={<Link to='/admin/products' className='text-sm font-semibold text-indigo-600'>View all</Link>}
								>
									<div className='space-y-4'>
										{dashboardData.lowStockProducts.slice(0, 4).map((product) => (
											<div key={product._id} className='flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-4 py-3'>
												<div>
													<div className='font-semibold text-slate-800'>{product.title}</div>
													<div className='text-xs uppercase tracking-[0.18em] text-slate-400'>{product.slug}</div>
												</div>
												<div className='text-sm font-semibold text-rose-500'>{product.quantity || 0} left</div>
											</div>
										))}
										{!dashboardData.lowStockProducts.length && (
											<div className='rounded-2xl bg-slate-50 px-4 py-5 text-sm text-slate-500'>No low stock items right now.</div>
										)}
									</div>
								</Panel>
							</div>

							<div className='mt-6 grid gap-6 xl:grid-cols-4'>
								<Panel title='Top Selling Products' action={<Link to='/admin/products' className='text-sm font-semibold text-indigo-600'>View all</Link>}>
									<div className='space-y-4'>
										{dashboardData.topProducts.map((product) => (
											<div key={product._id} className='flex items-center justify-between gap-3'>
												<div>
													<div className='max-w-[14rem] text-balance font-semibold text-slate-800'>{product.title}</div>
													<div className='text-sm text-slate-400'>{formatCurrency(product.price)}</div>
												</div>
												<div className='text-sm font-semibold text-slate-500'>{product.sold || 0} sold</div>
											</div>
										))}
									</div>
								</Panel>
								<Panel title='Recent Customers' action={<Link to='/admin/accounts' className='text-sm font-semibold text-indigo-600'>View all</Link>}>
									<div className='space-y-4'>
										{dashboardData.recentCustomers.map((account) => (
											<div key={account._id} className='flex items-center justify-between gap-3'>
												<div>
													<div className='font-semibold text-slate-800'>{account.name || 'Unnamed user'}</div>
													<div className='max-w-[12rem]  text-sm text-slate-400'>{account.email}</div>
												</div>
					
											</div>
										))}
									</div>
								</Panel>
								<Panel title='Inventory Overview' action={<Link to='/admin/products' className='text-sm font-semibold text-indigo-600'>View all</Link>}>
									<div className='space-y-5 text-sm'>
										<div className='flex items-center justify-between text-slate-500'><span>Total Inventory Value</span><span className='font-semibold text-slate-900'>{formatCurrency(dashboardData.inventoryValue)}</span></div>
										<div className='flex items-center justify-between text-slate-500'><span>Low Stock Items</span><span className='font-semibold text-rose-500'>{dashboardData.lowStockProducts.length}</span></div>
										<div className='flex items-center justify-between text-slate-500'><span>Out of Stock Items</span><span className='font-semibold text-amber-500'>{dashboardData.outOfStockCount}</span></div>
										<div className='flex items-center justify-between text-slate-500'><span>New This Month</span><span className='font-semibold text-emerald-500'>{dashboardData.newProductsThisMonth}</span></div>
									</div>
								</Panel>
								<Panel title='Alerts & Notifications' action={<Link to='/admin/coupon' className='text-sm font-semibold text-indigo-600'>View all</Link>}>
									<div className='space-y-4'>
										{dashboardData.alerts.map((alert) => (
											<div key={`${alert.label}-${alert.time}`} className='flex items-center justify-between gap-3'>
												<div className='flex items-center gap-3'>
													<div className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${alert.color}`}>•</div>
													<div className='text-sm text-slate-700'>{alert.label}</div>
												</div>
												<div className='text-xs text-slate-400'>{alert.time}</div>
											</div>
										))}
										{!dashboardData.alerts.length && (
											<div className='text-sm text-slate-500'>No alerts to review right now.</div>
										)}
									</div>
								</Panel>
							</div>
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

AdminDashboard.defaultProps = {
	role : '',
};

export default AdminDashboard;

				
