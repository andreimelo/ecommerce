import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SideBar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';
import { getUserOrders } from '../../../library/services/user';
import Table from '../../../library/components/Table';
import { options } from '../../../library/common/constants/currency';
import OrderInfoModal from './components/OrderInfoModal';
import OrderPdf from './components/OrderPdf';
import Spinner from '../../../library/components/Spinner/Spinner';

function Orders({ role }){
	// const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));
	const [
		userOrdersData,
		setUserOrderData,
	] = useState('');
	const [
		loading,
		setLoading,
	] = useState(false);
	const [
		modalOpen,
		setModalOpen,
	] = useState(false);
	const [
		modalData,
		setModalData,
	] = useState([]);
	useEffect(
		() => {
			async function fetchUserOrder(){
				try {
					setLoading(true);
					const result = await getUserOrders(user.token);
					if (result.ok) {
						setLoading(false);
						setUserOrderData(result);
					}
				} catch (error) {
					setLoading(false);
					alert(error);
				}
			}
			fetchUserOrder();
		},
		[
			user.token,
		],
	);

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
					{
						loading ? <Spinner /> :
						<div>
							<Table
								thead={
									userOrdersData['data'] &&
									userOrdersData['data'].length && (
										<thead className='text-xs text-white uppercase bg-gray-900 dark:text-white'>
											<tr>
												<th scope='col' class='px-6 py-3'>
													Order#
												</th>
												<th scope='col' class='px-6 py-3'>
													Amount
												</th>
												<th scope='col' class='px-6 py-3'>
													Status
												</th>
												<th scope='col' class='px-6 py-3'>
													Date
												</th>
												<th scope='col' class='px-6 py-3'>
													Payment method
												</th>
												<th scope='col' class='px-6 py-3'>
													Payment status
												</th>
												<th scope='col' class='px-6 py-3'>
													Receipt
												</th>
											</tr>
										</thead>
									)
								}
								tbody={
									userOrdersData['data'] &&
									userOrdersData['data'].map((item, index) => (
										<tbody key={item._id} className='text-gray-700'>
											<tr>
												<td
													onClick={() => openModal(item)}
													className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap cursor-pointer'
												>
													<span className='text-blue-500 underline'>
														{index + 1}
													</span>
												</td>
												<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
													{options[item.paymentIntent.currency]}
													{(item.paymentIntent.amount /
														100).toFixed(2)}{' '}
													{/* {item.discount}% */}
												</td>
												<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
													{item.orderStatus}
												</td>
												<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
													{new Date(
														item.createdAt,
													).toLocaleString()}
												</td>
												<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
													{item.paymentIntent.payment_method_types[0].toUpperCase()}
												</td>
												<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
													{item.paymentIntent.status.toUpperCase()}
												</td>
												<td className='px-6 py-4 cursor-pointer'>
													{/* {icons['delete']} */}
													<span className='text-blue-500'>
														<OrderPdf
															data={item}
															fileName={`Receipt#${index +
																1}.pdf`}
															title='Download'
														/>
													</span>
												</td>
											</tr>
										</tbody>
									))
								}
							/>
						</div>}
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
