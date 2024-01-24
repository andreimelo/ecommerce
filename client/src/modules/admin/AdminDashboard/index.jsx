import React from 'react';
import Sidebar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';

const AdminDashboard = ({role}) => {
    return (
        <div className="layout-default">
            <Sidebar role={role} />
        </div>
    )
}

AdminDashboard.propTypes = {
    role: PropTypes.string
}

export default AdminDashboard;