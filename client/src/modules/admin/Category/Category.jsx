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
            <div className="flex mt-10">
                <div class="flex-none w-40">
                    <Sidebar role={role} />
                </div>
                <div class="flex-auto w-64">
                    <label className="text-2xl font-semibold">
                         Category
                    </label>
                    <CategoryForm />
                </div>
            </div>
        </div>
    )
}

Category.propTypes = {
    role: PropTypes.string
}

export default Category;