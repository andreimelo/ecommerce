import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { images } from '../../../resources/images';
import icons from '../../../resources/icons';
import RatingIcon from '../RatingIcon';

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
	handleAddToCart,
	quantity,
}) => {
	return (
		<div className={containerClass}>
			<div className={imgContainerClass}>
				<img
					className={imgClass}
					src={imgSrc && imgSrc.length ? imgSrc[0].url : images['default']}
					alt={imgAlt}
				/>
			</div>
			<div className='p-4 flex flex-col flex-1'>
				<div className='text-lg font-semibold tracking-tight text-slate-900 line-clamp-2'>
					{title}
				</div>
				<div className='text-sm text-gray-500 mt-2 line-clamp-3'>
					{description && `${description.substring(0, 90)}...`}
				</div>
				<div className='mt-3 flex items-center justify-between'>
					<div className='flex items-center gap-3'>
						{star && (rating && rating.length > 0 ? (
							<div className='flex items-center'>
								{star.map((index) => (
									<RatingIcon key={index} index={index} rating={rating && rating.average} />
								))}
								<div className='text-sm text-gray-500 ml-2'>{rating && rating.length && `(${rating.length})`}</div>
							</div>
						) : (
							<div className='text-sm text-gray-500'>No rating</div>
						))}
					</div>
					<div className='text-lg font-bold text-indigo-600'>{price}</div>
				</div>

				{isProductAndCart && (
					<div className='mt-4 grid grid-cols-2 gap-3'>
						<Link to={`${linkTo}/${slug}`} className='block'>
							<button className='w-full py-2 px-3 border border-indigo-200 rounded-md text-sm text-indigo-700 hover:bg-indigo-50'>View</button>
						</Link>
						{quantity > 0 ? (
							<button onClick={handleAddToCart} className='w-full py-2 px-3 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700'>Add to cart</button>
						) : (
							<div className='w-full py-2 px-3 bg-gray-100 text-gray-500 rounded-md text-sm text-center'>Sold out</div>
						)}
					</div>
				)}

				{isDeleteAndEdit && (
					<div className='mt-4 grid grid-cols-2 gap-3'>
						<div className='cursor-pointer p-2 border rounded-md text-center' onClick={onClickRemove}>{icons.delete}</div>
						<Link to={`${linkTo}/${slug}`}><div className='cursor-pointer p-2 border rounded-md text-center'>{icons.edit}</div></Link>
					</div>
				)}
			</div>
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
	handleAddToCart   : PropTypes.any,
	quantity          : PropTypes.number,
};

Card.defaultProps = {
	containerClass    : 'relative my-5 flex w-full flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow hover:shadow-lg transition transform hover:-translate-y-1 md:h-96',
	imgContainerClass : 'relative mx-0 mt-0 flex h-56 overflow-hidden rounded-t-lg justify-center items-center bg-gray-50',
	imgClass          : 'object-contain w-full h-full',
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
	handleAddToCart   : [],
	quantity          : 0,
};

export default Card;
