import React from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({ title, variant, inputClass, handleFileUploadAndResize }) => {
	return (
		<div className={variant}>
			<input
				className={inputClass}
				type='file'
				title={title}
				multiple
				accept='images/*'
				onChange={handleFileUploadAndResize}
			/>
		</div>
	);
};
FileUpload.propTypes = {
	title                     : PropTypes.string,
	variant                   : PropTypes.string,
	handleFileUploadAndResize : PropTypes.func,
	inputClass                : PropTypes.string,
};
FileUpload.defaultProps = {
	title                     : 'pepe ',
	variant                   : '',
	handleFileUploadAndResize : () => {},
	inputClass                : '',
};
export default FileUpload;
