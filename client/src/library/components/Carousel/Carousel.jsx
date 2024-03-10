import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Carousel = ({ images }) => {
	const [
		currentImageIndex,
		setCurrentImageIndex,
	] = useState(0);

	const nextImage = () => {
		setCurrentImageIndex(
			(prevIndex) =>

					prevIndex === images.length - 1 ? 0 :
					prevIndex + 1,
		);
	};

	const prevImage = () => {
		setCurrentImageIndex(
			(prevIndex) =>

					prevIndex === 0 ? images.length - 1 :
					prevIndex - 1,
		);
	};

	return (
		<div className='relative'>
			<div className='overflow-hidden rounded-lg w-full h-[calc(10/16*100)%] md:h-80'>
				{images &&
					images.map((item) => (
						<img
							key={item.url}
							className='w-full h-full object-cover'
							src={item.url}
							alt={`Carousel ${currentImageIndex + 1}`}
						/>
					))}
			</div>
			<div className='absolute top-1/2 -mt-4 left-0 right-0 flex justify-between'>
				{images &&
				images.length <= 0 && (
					<div>
						<button
							className='absolute text-3xl w-9 left-0 ml-2 text-white bg-gray-800 rounded-full focus:outline-none'
							onClick={prevImage}
						>
							{'<'}
						</button>
						<button
							className='absolute text-3xl w-9 right-0 mr-2 text-white bg-gray-800 rounded-full focus:outline-none'
							onClick={nextImage}
						>
							{'>'}
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

Carousel.propTypes = {
	images : PropTypes.array,
};

Carousel.defaultProps = {
	images : [],
};

export default Carousel;
