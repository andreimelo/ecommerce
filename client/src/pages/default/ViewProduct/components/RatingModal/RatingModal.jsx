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
	onSubmitReview,
	comment,
	onCommentChange,
	reviewImages,
	onRemoveImage,
	onFileUpload,
	submitting,
	starClass,
}) => {
	return (
		<Modal
			modalContainerClass='relative bg-white rounded-lg shadow-xl w-full max-w-2xl mx-auto'
			modalTitle='Write a review'
			isOpen={modalOpen}
			onClose={closeModal}
		>
			<div className='place-items-center my-2'>
				<div className='text-sm text-slate-500 mb-2'>Tap a star to rate this product.</div>
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
			<div className='mt-4'>
				<textarea
					value={comment}
					onChange={(event) => onCommentChange(event.target.value)}
					placeholder='Share your experience with this product'
					rows={4}
					className='w-full rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400'
				/>
			</div>
			<div className='mt-4'>
				<label className='block text-sm font-medium text-slate-600 mb-2'>Upload product photos (optional)</label>
				<input
					type='file'
					accept='image/*'
					multiple
					onChange={onFileUpload}
					className='block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-sky-50 file:px-4 file:py-2 file:font-semibold file:text-sky-700 hover:file:bg-sky-100'
				/>
				{reviewImages.length > 0 && (
					<div className='mt-3 grid grid-cols-3 gap-3'>
						{reviewImages.map((image) => (
							<div key={image.public_id} className='relative rounded-lg border border-slate-200 overflow-hidden'>
								<img src={image.url} alt='review upload' className='h-20 w-full object-cover' />
								<button
									type='button'
									onClick={() => onRemoveImage(image.public_id)}
									className='absolute right-1 top-1 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold text-rose-600'
								>
									x
								</button>
							</div>
						))}
					</div>
				)}
			</div>
			<div className='mt-6 flex justify-end'>
				<button
					type='button'
					onClick={onSubmitReview}
					disabled={!rating || submitting}
					className='rounded-full bg-slate-900 px-5 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50'
				>
					{submitting ? 'Saving...' : 'Submit review'}
				</button>
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
	onSubmitReview : PropTypes.func,
	comment : PropTypes.string,
	onCommentChange : PropTypes.func,
	reviewImages : PropTypes.arrayOf(PropTypes.shape({
		public_id : PropTypes.string,
		url       : PropTypes.string,
	})),
	onRemoveImage : PropTypes.func,
	onFileUpload : PropTypes.func,
	submitting : PropTypes.bool,
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
	onSubmitReview : () => {},
	comment : '',
	onCommentChange : () => {},
	reviewImages : [],
	onRemoveImage : () => {},
	onFileUpload : () => {},
	submitting : false,
	starClass    : 'w-12 h-12 cursor-pointer border-gray-500 mx-auto',
};

export default RatingModal;
