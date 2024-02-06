import React from 'react';
import Sidebar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';

const Product = ({ role }) => {
	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10'>
				<div class='flex-none w-40 border-r border-gray-200'>
					<Sidebar role={role} />
				</div>
				<div class='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Product</label>
					{/* set components */}
				</div>
			</div>
		</div>
	);
};

Product.propTypes = {
	role : PropTypes.string,
};

export default Product;
