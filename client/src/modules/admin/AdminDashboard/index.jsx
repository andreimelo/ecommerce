import React from 'react';
import Sidebar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';

const AdminDashboard = ({role}) => {
    return (
        <div className="layout-default">
            <div className="flex mt-10">
                <div class="flex-none w-40">
                    <Sidebar role={role} />
                </div>
                <div class="flex-auto w-64">
                    <label className="text-2xl font-semibold">
                        Dashboard
                    </label>
                </div>
            </div>
        </div>
    )
}

AdminDashboard.propTypes = {
    role: PropTypes.string
}

export default AdminDashboard;