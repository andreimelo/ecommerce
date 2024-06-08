import React from 'react';
import PropTypes from 'prop-types';
import { Carousel as ImageCarousel } from 'react-responsive-carousel';
import { images as image } from '../../../resources/images';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Carousel = ({ images }) => {
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
			{
				images && images.length ? images.map((item, index) => (
					<div>
						<img key={item.url} src={item.url} alt={`Carousel ${index}`} />
					</div>
				)) :
				<img src={image.default} alt={`Carousel default_image`} />}
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
