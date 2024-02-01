import React from 'react';
import Sidebar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';

const AdminDashboard = ({role}) => {
    return (
        <div className="w-full max-w-screen-xl mx-auto">
            <div className="flex my-10">
                <div class="flex-none w-40 border-r border-gray-200">
                    <Sidebar role={role} />
                </div>
                <div class="flex-auto w-64 mx-10">
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