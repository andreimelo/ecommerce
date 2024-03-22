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
	const { images } = values;

	return (
		<figure className={variant}>
			{/* Needs to refactor */}
			{imagesData &&
				imagesData.map((image) => (
					<div>
						{images
							.filter((item) => item.public_id === image.public_id)
							.map((item) => (
								<img
									// class='rounded-lg'
									key={item.public_id}
									src={item.url}
									alt={alt}
								/>
							))}

						<figcaption
							key={image.public_id}
							onClick={async () => {
								try {
									await handleImageRemove(image.public_id, data.token);
									// filter remove based on specific image preview
									let filteredImages = images.filter((item) => {
										return item.public_id !== image.public_id;
									});
									setValues({ ...values, images: filteredImages });
								} catch (err) {
									alert(err);
								}
							}}
							className='text-sm'
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
