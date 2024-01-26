import React from 'react';
import SideBar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';

function ChangePassword({role}) {
	return (
        <div className="layout-default"> 
            <div className="flex mt-10">
            <div class="flex-none w-40">
                <SideBar role={role} />
            </div>
            <div class="flex-auto w-64">
                 <label className="text-2xl font-semibold">
                    Change Password
                </label>
                </div>   
            </div>
        </div>
    );	
}

ChangePassword.propTypes = {
    role: PropTypes.string
}

export default ChangePassword;
