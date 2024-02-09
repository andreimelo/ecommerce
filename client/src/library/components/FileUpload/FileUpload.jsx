import React from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({ variant, handleFileUploadAndResize }) => {
	return (
		<div className={variant}>
			<input
				type='file'
				multiple
				accept='images/*'
				onChange={handleFileUploadAndResize}
			/>
		</div>
	);
};
FileUpload.propTypes = {
	variant                   : PropTypes.string,
	handleFileUploadAndResize : PropTypes.func,
};
FileUpload.defaultProps = {
	variant                   : '',
	handleFileUploadAndResize : () => {},
};
export default FileUpload;
