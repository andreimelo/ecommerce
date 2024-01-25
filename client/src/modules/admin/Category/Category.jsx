import React from 'react';
import Sidebar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';
// import {
//     getCategories,
//     getCategory,
//     removeCategory,
//     updateCategory,
//     createCategory
// } from '../../../library/services/category';
import CategoryForm from '../Category/components/CategoryForm';

const Category = ({ role }) => {
    return (
        <div className="layout-default">
            <Sidebar role={role} />
            <h2>Create Category</h2>
            <CategoryForm/>
        </div>
    )
}

Category.propTypes = {
    role: PropTypes.string
}

export default Category;