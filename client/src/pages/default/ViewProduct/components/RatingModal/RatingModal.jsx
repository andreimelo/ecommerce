import React from 'react';
import Modal from '../../../../../library/components/Modal';
import RatingIcon from '../../../../../library/components/RatingIcon';
import PropTypes from 'prop-types';

const RatingModal = ({
	id,
	modalOpen,
	closeModal,
	star,
	rating,
	hoverRating,
	onMouseEnter,
	onMouseLeave,
	onSaveRating,
	starClass,
}) => {
	return (
		<Modal
			modalContainerClass='relative bg-white rounded-lg shadow-xl w-80 mx-auto'
			modalTitle='Rate'
			isOpen={modalOpen}
			onClose={closeModal}
		>
			<div className='place-items-center my-2'>
				{star.map((index) => {
					return (
						<RatingIcon
							id={id}
							star={star}
							index={index}
							rating={rating}
							hoverRating={hoverRating}
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							onSaveRating={onSaveRating}
							starClass={starClass}
						/>
					);
				})}
			</div>
		</Modal>
	);
};

RatingModal.propTypes = {
	id           : PropTypes.string,
	modalOpen    : PropTypes.bool,
	closeModal   : PropTypes.func,
	star         : PropTypes.array,
	rating       : PropTypes.number,
	hoverRating  : PropTypes.number,
	onMouseLeave : PropTypes.func,
	onSaveRating : PropTypes.func,
	onMouseEnter : PropTypes.func,
	starClass    : PropTypes.string,
};

RatingModal.defaultProps = {
	id           : '',
	modalOpen    : false,
	closeModal   : () => {},
	star         : [],
	rating       : 0,
	hoverRating  : 0,
	onMouseLeave : () => {},
	onSaveRating : () => {},
	onMouseEnter : () => {},
	starClass    : 'w-12 h-12 cursor-pointer border-gray-500 mx-auto',
};

export default RatingModal;
