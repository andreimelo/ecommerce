import React from 'react';
import PropTypes from 'prop-types';

const ImagePreview = ({
	values,
	data,
	handleImageRemove,
	variant,
	imagesData,
	setValues,
	alt,
}) => {
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
						<figcaption
							key={image.public_id}
							onClick={async () => {
								const { images } = values;
								try {
									await handleImageRemove(image.public_id, data.token);
									// filter remove based on specific image preview
									let filteredImages = images.filter((item) => {
										return item.public_id !== image.public_id;
									});
									setValues({ images: filteredImages });
								} catch (err) {
									alert(err);
								}
							}}
							class='text-sm'
						>
							<p>Remove</p>
						</figcaption>
					</div>
				))}
		</figure>
	);
};

ImagePreview.propTypes = {
	values            : PropTypes.object,
	data              : PropTypes.object,
	variant           : PropTypes.string,
	imagesData        : PropTypes.array,
	handleImageRemove : PropTypes.func,
	setValues         : PropTypes.func,
	alt               : PropTypes.string,
};

ImagePreview.defaultProps = {
	values            : {},
	data              : {},
	variant           : 'grid gap-4 grid-cols-3 max-w-sm cursor-pointer',
	imagesData        : [],
	handleImageRemove : () => {},
	setValues         : () => {},
	alt               : '',
};
export default ImagePreview;
