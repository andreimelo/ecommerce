import React from 'react';
import PropTypes from 'prop-types';
import { Carousel as ImageCarousel } from 'react-responsive-carousel';
import { images as image } from '../../../resources/images';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

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
			showArrow={true}
			showStatus={

					images.length ? true :
					false
			}
			showIndicator={

					images.length ? true :
					false
			}
			showThumbs={

					images.length ? true :
					false
			}
		>
			{/* <div className='overflow-hidden rounded-lg w-full h-[calc(10/16*100)%] md:h-80'> */}
			{
				images && images.length ? images.map((item, index) => (
					<div>
						<img
							key={item.url}
							// className='w-full'
							src={item.url}
							alt={`Carousel ${index}`}
						/>
					</div>
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
