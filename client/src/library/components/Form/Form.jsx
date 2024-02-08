import React from 'react';
import PropTypes from 'prop-types';
import CustomInput from '../Input';
import CustomTextArea from '../TextArea';
import SelectOption from '../SelectOption';
import { productOptions } from '../../common/constants/selectOptions';
import { type } from '../../../library/common/constants/types';

const Form = ({
	values,
	formClass,
	handleChange,
	errors,
	handleSubmit,
	separator,
	placeHolder,
	category,
	product,
	categoriesDataOption,
}) => {
	const { name, title, description, price, quantity, shipping, color, brand } = values;

	return (
		<form className={formClass} onSubmit={(e) => handleSubmit(e)}>
			{/* refactor */}
			{category && (
				<div>
					<CustomInput
						type={type.input.default}
						value={name || ''}
						name='name'
						// disabled={true}
						variant={

								errors &&
								errors.name ? 'bg-white-200 appearance-none border-2 border-gray-200 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none error-border' :
								'bg-white-200 appearance-none border-2 border-gray-200 rounded w-2/4 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						}
						placeHolder={placeHolder}
						onChange={(event) =>
							handleChange(event.target.name, event.target.value)}
						errorMessage={errors && errors.name}
					/>
					<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 border border-blue-700 rounded my-5 text-sm mx-5'>
						Submit
					</button>
				</div>
			)}
			{product && (
				<div>
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
					<SelectOption
						variant=''
						name={'category'}
						placeHolder='Select a categories'
						data={categoriesDataOption}
						onChange={(event) =>
							handleChange(event.target.name, event.target.value)}
					/>
					<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 border border-blue-700 rounded my-5 text-sm '>
						Submit
					</button>
				</div>
			)}
			{separator && <hr className='w-3/5 mb-4' />}
		</form>
	);
};

Form.propTypes = {
	values               : PropTypes.object,
	formClass            : PropTypes.string,
	handleChange         : PropTypes.func,
	errors               : PropTypes.object,
	handleSubmit         : PropTypes.func,
	separator            : PropTypes.bool,
	placeHolder          : PropTypes.string,
	category             : PropTypes.bool,
	categoriesDataOption : PropTypes.array,
};

Form.defaultProps = {
	values               : {},
	formClass            : '',
	handleChange         : () => {},
	errors               : {},
	handleSubmit         : () => {},
	separator            : false,
	placeHolder          : '',
	category             : false,
	categoriesDataOption : [],
};

export default React.memo(Form);
