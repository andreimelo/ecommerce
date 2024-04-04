import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { images } from '../../../resources/images';
import icons from '../../../resources/icons';
import RatingIcon from '../RatingIcon';
import { useDispatch } from 'react-redux';

const Card = ({
	containerClass,
	imgContainerClass,
	imgAlt,
	imgClass,
	imgSrc,
	title,
	description,
	onClickRemove,
	linkTo,
	slug,
	isProductAndCart,
	isDeleteAndEdit,
	star,
	rating,
	price,
	product,
}) => {
	const dispatch = useDispatch();
	function handleAddToCart(){
		let cart = [];

		if (typeof window !== 'undefined') {
			if (localStorage.getItem('cart')) {
				cart = JSON.parse(localStorage.getItem('cart'));
			}

			// Check if the product already exists in the cart
			const existingProductIndex = cart.findIndex(
				(item) => item._id === product._id,
			);
			if (existingProductIndex !== -1) {
				// Update count and price of existing product
				cart[existingProductIndex].count++;
				cart[existingProductIndex].price =
					product.price * cart[existingProductIndex].count;
			}
			else {
				// Add the product to the cart with count = 1
				cart.push({
					...product,
					count : 1,
				});
			}

			// Remove duplicates
			let unique = cart.filter(
				(item, index, self) =>
					index === self.findIndex((t) => t._id === item._id),
			);

			localStorage.setItem('cart', JSON.stringify(unique));
			dispatch({
				type    : 'ADD_TO_CART',
				payload : unique,
			});
		}
	}

	return (
		<div className={containerClass}>
			<div className={imgContainerClass}>
				<img
					className={imgClass}
					src={

							imgSrc && imgSrc.length ? imgSrc[0].url :
							images['default']
					}
					alt={imgAlt}
				/>
			</div>
			<div className='mt-4 px-5'>
				<div className='text-xl font-semibold tracking-tight text-slate-900'>
					{title}
				</div>
				<span className='text-sm'>
					{description && `${description.substring(0, 60)}...`}
				</span>
				<div className='text-xl font-semibold tracking-tight text-slate-900'>
					{price}
				</div>
				{star &&
					(
						rating &&
						rating.length > 0 ? <div className='flex place-items-center my-2'>
							{star.map((index) => {
								return (
									<RatingIcon
										index={index}
										rating={rating && rating.average}
									/>
								);
							})}
							<div>{rating && rating.length && ` (${rating.length}) `}</div>
						</div> :
						<div className='flex place-items-center my-2'>
							No rating yet
						</div>)}
			</div>
			{isProductAndCart && (
				<div className='grid grid-cols-2 my-4 place-items-center'>
					<Link to={`${linkTo}/${slug}`}>
						<div className='flex flex-col items-center text-xs cursor-pointer'>
							{icons.show}
							<div>View Product</div>
						</div>
					</Link>
					<div
						className='flex flex-col items-center text-xs cursor-pointer'
						onClick={handleAddToCart}
					>
						{icons.cardSolid}
						Add to Cart
					</div>
				</div>
			)}
			{isDeleteAndEdit && (
				<div className='grid grid-cols-2 my-4 place-items-center'>
					<div className='cursor-pointer' onClick={onClickRemove}>
						{icons.delete}
					</div>
					<Link to={`${linkTo}/${slug}`}>
						<div className='cursor-pointer'>{icons.edit}</div>
					</Link>
				</div>
			)}
		</div>
	);
};

Card.propTypes = {
	containerClass    : PropTypes.string,
	imgContainerClass : PropTypes.string,
	imgClass          : PropTypes.string,
	imgSrc            : PropTypes.string,
	title             : PropTypes.string,
	description       : PropTypes.string,
	onClickRemove     : PropTypes.func,
	linkTo            : PropTypes.string,
	slug              : PropTypes.string,
	isProductAndCart  : PropTypes.bool,
	isDeleteAndEdit   : PropTypes.bool,
	star              : PropTypes.array,
	rating            : PropTypes.number,
	price             : PropTypes.string,
	product           : PropTypes.any,
};

Card.defaultProps = {
	containerClass    :
		'relative my-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md',
	imgContainerClass : 'relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl',
	imgClass          : 'object-cover',
	imgSrc            : '',
	title             : '',
	description       : 'Lorem Ipsum Dolor',
	onClickRemove     : () => {},
	linkTo            : '',
	slug              : '',
	isProductAndCart  : false,
	isDeleteAndEdit   : false,
	star              : [],
	rating            : 0,
	price             : '0',
	product           : [],
};

export default Card;
