import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../library/components/SideBar';
import Form from '../../../library/components/Form';
import PropTypes from 'prop-types';
import useInput from '../../../library/hooks/useInput';
import { createProduct } from '../../../library/services/product';

const Product = ({ role }) => {
	const {
		values,
		handleChange,
		// errors,
		handleSubmit,
	} = useInput(clickedSubmit, () => {
		return {};
	});
	const user = useSelector((state) => state.user);

	async function clickedSubmit(){
		try {
			await createProduct(values, user.token);
			alert(`Product successfully created`);
		} catch (error) {
			alert('Create product failed');
		}
	}

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10'>
				<div class='flex-none w-40 border-r border-gray-200'>
					<Sidebar role={role} />
				</div>
				<div class='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Create Product </label>
					<Form
						formClass='w-2/4 my-10 '
						values={values}
						handleChange={handleChange}
						// errors={errors}
						handleSubmit={handleSubmit}
						product
					/>
				</div>
			</div>
		</div>
	);
};

Product.propTypes = {
	role : PropTypes.string,
};

export default Product;
