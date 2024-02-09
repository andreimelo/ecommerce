import React from 'react';
import PropTypes from 'prop-types';

const ImagePreview = ({ variant, imagesData, alt }) => {
	return (
		<figure className={variant}>
			{imagesData &&
				imagesData.map((image) => (
					<div>
						<img
							// class='rounded-lg'
							key={image.public_id}
							src={image.url}
							alt={alt}
						/>
						<figcaption class='text-sm'>
							<p>Remove</p>
						</figcaption>
					</div>
				))}
		</figure>
	);
};

ImagePreview.propTypes = {
	variant    : PropTypes.string,
	imagesData : PropTypes.array,
	alt        : PropTypes.string,
};

ImagePreview.defaultProps = {
	variant    : 'grid gap-4 grid-cols-3 max-w-sm cursor-pointer',
	imagesData : [],
	alt        : '',
};
export default ImagePreview;
