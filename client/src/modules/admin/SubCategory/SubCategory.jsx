import React from 'react';
import Sidebar from '../../../library/components/SideBar';

const SubCategory = ({role}) => {
    return (
        <div className="layout-default">
        <div className="flex my-10">
            <div class="flex-none w-40 border-r border-gray-200">
                <Sidebar role={role} />
            </div>
            <div class="flex-auto w-64 mx-10">
                <label className="text-2xl font-semibold">
                    Sub Category
                </label>
            </div>
        </div>
    </div>
    )
}

export default SubCategory;