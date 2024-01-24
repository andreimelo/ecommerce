import React from 'react';
import SideBar from '../../../library/components/SideBar';

function ChangePassword({role}) {
	return (
		<div className="layout-default"> 
            <SideBar role={role}/>
			Welcome to ChangePassword
        </div>
    );	
}

export default ChangePassword;
