import React from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';
import useInput from '../../../library/hooks/useInput';
import { createProduct } from '../../../library/services/product';
import { productOptions } from '../../../library/common/constants/selectOptions';
import CustomInput from '../../../library/components/Input';
import CustomTextArea from '../../../library/components/TextArea';
import SelectOption from '../../../library/components/SelectOption';
import { type } from '../../../library/common/constants/types';

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

	const { title, description, price, quantity, shipping, color, brand } = values;

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
					<form className='w-2/4 my-10' onSubmit={handleSubmit}>
						<CustomInput
							type={type.input.default}
							value={title}
							name='title'
							variant={
								'inp border-2 border-gray-200 no-size mb-4 focus:outline-none focus:bg-white focus:border-gray-500'
							}
							placeHolder='Enter a title'
							onChange={(event) =>
								handleChange(event.target.name, event.target.value)}
						/>
						<CustomTextArea
							type={type.input.default}
							value={description}
							name='description'
							placeHolder='Enter a description'
							variant={
								'inp border-2 border-gray-200 no-size mb-4 focus:outline-none focus:bg-white focus:border-gray-500'
							}
							cols={50}
							rows={4}
							onChange={(event) =>
								handleChange(event.target.name, event.target.value)}
						/>
						<CustomInput
							type={type.input.number}
							value={price}
							name='price'
							variant={
								'inp border-2 border-gray-200 no-size focus:outline-none focus:bg-white focus:border-gray-500'
							}
							placeHolder='Enter a price'
							onChange={(event) =>
								handleChange(event.target.name, event.target.value)}
						/>
						<SelectOption
							variant='mb-4'
							value={shipping}
							placeHolder='Select Yes or No for Shipping'
							name={'shipping'}
							data={productOptions['shipping']}
							onChange={(event) =>
								handleChange(event.target.name, event.target.value)}
						/>
						<CustomInput
							type={type.input.number}
							value={quantity}
							name='quantity'
							variant={
								'inp border-2 border-gray-200 no-size focus:outline-none focus:bg-white focus:border-gray-500'
							}
							placeHolder='Enter a quantity'
							onChange={(event) =>
								handleChange(event.target.name, event.target.value)}
						/>
						<SelectOption
							variant=''
							value={color}
							name={'color'}
							placeHolder='Select a color'
							data={productOptions['colors']}
							onChange={(event) =>
								handleChange(event.target.name, event.target.value)}
						/>
						<SelectOption
							variant=''
							value={brand}
							name={'brand'}
							placeHolder='Select a brand'
							data={productOptions['brands']}
							onChange={(event) =>
								handleChange(event.target.name, event.target.value)}
						/>
						<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 border border-blue-700 rounded my-5 text-sm '>
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

Product.propTypes = {
	role : PropTypes.string,
};

export default Product;
