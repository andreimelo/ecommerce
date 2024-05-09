import React from 'react';
import Modal from '../../../../../library/components/Modal';
import Table from '../../../../../library/components/Table';
import PropTypes from 'prop-types';
import { options } from '../../../../../library/common/constants/currency';

const OrderInfoModal = ({ data, title, modalOpen, closeModal }) => (
	<Modal modalTitle={title} isOpen={modalOpen} onClose={closeModal}>
		<Table
			thead={
				data['products'] &&
				data['products'].length && (
					<thead className='text-xs text-white uppercase bg-gray-900 dark:text-white'>
						<tr>
							<th scope='col' class='px-6 py-3'>
								Title
							</th>
							<th scope='col' class='px-6 py-3'>
								Price
							</th>
							<th scope='col' class='px-6 py-3'>
								Brand
							</th>
							<th scope='col' class='px-6 py-3'>
								Color
							</th>
							<th scope='col' class='px-6 py-3'>
								Count
							</th>
							<th scope='col' class='px-6 py-3'>
								Shipping
							</th>
						</tr>
					</thead>
				)
			}
			tbody={
				data['products'] &&
				data['products'].map((item) => (
					<tbody key={item._id} className='text-gray-700'>
						<tr>
							<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap cursor-pointer'>
								<span className='text-blue-500 underline'>
									{item.product.title}
								</span>
							</td>
							<td className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'>
								{options['usd']}
								{(item.product.price * 100 / 100).toFixed(2)}{' '}
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
								{item.product.shipping}
							</td>
						</tr>
					</tbody>
				))
			}
		/>
	</Modal>
);

OrderInfoModal.propTypes = {
	data       : PropTypes.array,
	title      : PropTypes.string,
	modalOpen  : PropTypes.bool,
	closeModal : PropTypes.func,
};
OrderInfoModal.defaultProps = {
	data       : [],
	title      : '',
	modalOpen  : false,
	closeModal : () => {},
};

export default OrderInfoModal;
