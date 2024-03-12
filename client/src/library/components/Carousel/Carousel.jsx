import React from 'react';
import PropTypes from 'prop-types';
import { Carousel as ImageCarousel } from 'react-responsive-carousel';
import { images as image } from '../../../resources/images';

const Carousel = ({ images }) => {
	// const [
	// 	currentImageIndex,
	// 	setCurrentImageIndex,
	// ] = useState(0);

	// const nextImage = () => {
	// 	setCurrentImageIndex(
	// 		(prevIndex) =>

	// 				prevIndex === images.length - 1 ? 0 :
	// 				prevIndex + 1,
	// 	);
	// };

	// const prevImage = () => {
	// 	setCurrentImageIndex(
	// 		(prevIndex) =>

	// 				prevIndex === 0 ? images.length - 1 :
	// 				prevIndex - 1,
	// 	);
	// };

	return (
		<ImageCarousel
			showArrow
			showStatus={

					images.length ? true :
					false
			}
			showIndicator
			showThumbs={

					images.length ? true :
					false
			}
		>
			{/* <div className='overflow-hidden rounded-lg w-full h-[calc(10/16*100)%] md:h-80'> */}
			{
				images && images.length ? images.map((item, index) => (
					<img
						key={item.url}
						// className='w-full'
						src={item.url}
						alt={`Carousel ${index}`}
					/>
				)) :
				<img src={image.default} alt={`Carousel default_image`} />}
			{/* </div> */}
			{/* <div className='absolute top-1/2 -mt-4 left-0 right-0 flex justify-between'>
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
			</div> */}
		</ImageCarousel>
	);
};

Carousel.propTypes = {
	images : PropTypes.array,
};

Carousel.defaultProps = {
	images : [],
};

export default Carousel;
