import React from 'react';
import Sidebar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';
import CategoryForm from '../Category/components/CategoryForm';

const Category = ({ role }) => {
    return (
        <div className="layout-default">
            <div className="flex my-10">
                <div class="flex-none w-40 border-r border-gray-200">
                    <Sidebar role={role} />
                </div>
                <div class="flex-auto w-64 mx-10">
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