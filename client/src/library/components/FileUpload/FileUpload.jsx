import React from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({ variant }) => {
	const handleFileUploadAndResize = () => {
		// temporary
		// event
	};
	return (
		<div className={variant}>
			<label>Choose File</label>
			<input
				type='file'
				multiple
				hidden
				accept='images/*'
				onChange={handleFileUploadAndResize}
			/>
		</div>
	);
};
FileUpload.propTypes = {
	variant : PropTypes.string,
};
FileUpload.defaultProps = {
	variant : '',
};
export default FileUpload;
