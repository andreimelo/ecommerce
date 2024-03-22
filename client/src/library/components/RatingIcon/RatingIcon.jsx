import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from './StarIcon/StarIcon';

const RatingIcon = ({
	id,
	index,
	rating,
	hoverRating,
	onMouseLeave,
	onSaveRating,
	onMouseEnter,
	starClass,
}) => {
	const fill = React.useMemo(
		() => {
			if (hoverRating >= index) {
				return '#ffe249';
			}
			else if (!hoverRating && rating >= index) {
				return '#ffe249';
			}
			return 'none';
		},
		[
			rating,
			hoverRating,
			index,
		],
	);
	return (
		<div
			className='inline-flex items-center'
			onMouseEnter={() => onMouseEnter(index)}
			onMouseLeave={() => onMouseLeave()}
			onClick={() => onSaveRating(index, id)}
		>
			<StarIcon fill={fill} starClass={starClass} />
		</div>
	);
};

RatingIcon.propTypes = {
	id           : PropTypes.string,
	star         : PropTypes.array,
	index        : PropTypes.number,
	rating       : PropTypes.number,
	hoverRating  : PropTypes.number,
	onMouseLeave : PropTypes.func,
	onSaveRating : PropTypes.func,
	onMouseEnter : PropTypes.func,
	starClass    : PropTypes.string,
};

RatingIcon.defaultProps = {
	id                   : '',
	ratingContainerClass : 'place-items-center',
	star                 : [],
	index                : 0,
	rating               : 0,
	hoverRating          : 0,
	onMouseLeave         : () => {},
	onSaveRating         : () => {},
	onMouseEnter         : () => {},
	starClass            : 'w-6 h-6 cursor-pointer border-gray-500',
};

export default RatingIcon;
