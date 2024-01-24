import React from 'react';
import SideBar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';

function History({role}) {
	return (
		<div className="layout-default"> 
            <SideBar role={role}/>
			Welcome to History
		</div>
	);	
}

History.propTypes = {
    role: PropTypes.string
}

export default History;
