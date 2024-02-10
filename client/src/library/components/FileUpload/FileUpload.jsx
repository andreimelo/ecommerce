import React from 'react';
import PropTypes from 'prop-types';

const FileUpload = ({ title, variant, inputClass, handleFileUploadAndResize }) => {
	return (
		<div className={variant}>
			{/* <label >
				Choose File */}
			<input
				className={inputClass}
				type='file'
				title={title}
				multiple
				// hidden
				accept='images/*'
				onChange={handleFileUploadAndResize}
			/>
			{/* </label> */}
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
