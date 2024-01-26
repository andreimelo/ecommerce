import React from 'react';
import SideBar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';

function Wishlist({ role }) {
	return (
        <div className="layout-default"> 
            <div className="flex mt-10">
                 <div class="flex-none w-40">
                    <SideBar role={role} />
                </div>
                <div class="flex-auto w-64">
                    <label className="text-2xl font-semibold">
                        Wishlist
                    </label>
                </div>
                {/*  */}
            </div>
        </div>
    );	
}

Wishlist.propTypes = {
    role: PropTypes.string
}

export default Wishlist;
