import React from 'react';
import Sidebar from '../../../library/components/SideBar';
import Input from '../../../library/components/Input';

const Coupon = ({ role }) => {
	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10'>
				<div className='flex-none w-40 border-r border-gray-200'>
					<Sidebar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Create Coupon</label>
					<form className='grid my-5'>
						<Input
							placeHolder='Enter a name'
							variant={
								'mb-5 bg-white-200 appearance-none border border-gray-300 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							}
						/>
						<Input
							placeHolder='Enter a discount'
							variant={
								'mb-5 bg-white-200 appearance-none border border-gray-300 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							}
						/>

						<Input
							placeHolder='Enter a date'
							type={'date'}
							variant={
								'mb-5 bg-white-200 appearance-none border border-gray-300 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							}
						/>
						<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 border border-blue-700 rounded text-sm w-1/4'>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Coupon;
