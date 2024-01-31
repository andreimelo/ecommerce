import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../library/components/SideBar';
import SearchFilter from '../../../library/components/SearchFilter';
import PropTypes from 'prop-types';
import {
    getCategories,
    removeCategory,
    createCategory
} from '../../../library/services/category';
import useInput from '../../../library/hooks/useInput';
import CategoryForm from '../Category/components/CategoryForm';
import CategoryTable from '../Category/components/CategoryTable';
import validateAdminCategory from '../../../library/helpers/validators/adminCategory';

const Category = ({ role }) => {
    const { values, handleChange, errors, handleSubmit } = useInput(clickedSubmit, validateAdminCategory);
    const user = useSelector(state => state.user);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');

    async function clickedSubmit() {
        try {
            const name = values.name;
            const result = await createCategory(name, user.token);
            if (result !== undefined) {
                await getCategoriesData() 
                alert(`${name} successfully created`)
            }
            return result;
        } catch (err) {
            // refactor 
            alert('Create category failed')
        }
    }

    async function getCategoriesData() {
        try {
            const result = await getCategories();
            setCategories(result);
        } catch (err) {
            alert(err);
        }
    }

    async function handleRemove(slug) {
        try {
            let confirmation = window.confirm('Delete?'); 
            if (confirmation) {
                await removeCategory(slug, user.token);
                await getCategoriesData();
            }
        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    function handleSearchFilterChange(e) {
        e.preventDefault();
        setSearch(e.target.value.toLowerCase());
    }

    const searchBy = (search) => (values)=> values.name.toLowerCase().includes(search);

    useEffect(() => { getCategoriesData() }, []);

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
                        <CategoryForm values={values} handleChange={handleChange} errors={errors} handleSubmit={handleSubmit} />
                        <SearchFilter searchValue={search} handleSearchFilterChange={handleSearchFilterChange} />
                        <CategoryTable searchFilter={searchBy} data={categories} onClick={handleRemove} searchValue={search} />
                </div>
            </div>
        </div>
    )
}

Category.propTypes = {
    role: PropTypes.string
}

export default Category;