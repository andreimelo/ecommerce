import React from 'react';
import SideBar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';

function Wishlist({ role }) {
	return (
		<div className="layout-default"> 
            <SideBar role={role} />
			Welcome to Wishlist
        </div>
    );	
}

Wishlist.propTypes = {
    role: PropTypes.string
}

export default Wishlist;
