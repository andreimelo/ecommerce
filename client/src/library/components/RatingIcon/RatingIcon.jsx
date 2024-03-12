import React from 'react';
import PropTypes from 'prop-types';
import StarIcon from './StarIcon/StarIcon';

const RatingIcon = ({
	index,
	rating,
	hoverRating,
	onMouseLeave,
	onSaveRating,
	onMouseEnter,
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
			class='inline-flex items-center'
			onMouseEnter={() => onMouseEnter(index)}
			onMouseLeave={() => onMouseLeave()}
			onClick={() => onSaveRating(index)}
		>
			<StarIcon fill={fill} />
		</div>
	);
};

RatingIcon.propTypes = {
	star         : PropTypes.array,
	index        : PropTypes.number,
	rating       : PropTypes.number,
	hoverRating  : PropTypes.number,
	onMouseLeave : PropTypes.func,
	onSaveRating : PropTypes.func,
	onMouseEnter : PropTypes.func,
};

RatingIcon.defaultProps = {
	ratingContainerClass : 'place-items-center',
	star                 : [],
	index                : 0,
	rating               : 0,
	hoverRating          : 0,
	onMouseLeave         : () => {},
	onSaveRating         : () => {},
	onMouseEnter         : () => {},
};

export default RatingIcon;
