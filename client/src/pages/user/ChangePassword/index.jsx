import React from 'react';
import SideBar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';

function ChangePassword({ role }){
	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10'>
				<div className='flex-none w-40 border-r border-gray-200'>
					<SideBar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Change Password</label>
				</div>
			</div>
		</div>
	);
}

ChangePassword.propTypes = {
	role : PropTypes.string,
};

export default ChangePassword;
