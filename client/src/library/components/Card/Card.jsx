import React from 'react';
import PropTypes from 'prop-types';
import { images } from '../../../resources/images';

const Card = ({
	containerClass,
	imgContainerClass,
	imgAlt,
	imgClass,
	imgSrc,
	title,
	description,
}) => {
	return (
		<div class={containerClass}>
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
			<div className='mt-4 px-5 pb-5'>
				<h5 className='text-xl font-semibold tracking-tight text-slate-900'>
					{title}
				</h5>
				<span className='text-sm'>{description}</span>
			</div>
			{/* <div className='grid grid-cols-2'>
				<div>Delete</div>
				<div>Edit</div>
			</div> */}
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
};

Card.defaultProps = {
	containerClass    :
		'relative my-5 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md',
	imgContainerClass : 'relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl',
	imgClass          : 'object-cover',
	imgSrc            : '',
	title             : '',
	description       : 'Lorem Ipsum Dolor',
};

export default Card;
