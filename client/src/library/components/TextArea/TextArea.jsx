import React from 'react';
import PropTypes from 'prop-types';

const TextArea = ({
	type,
	value,
	name,
	variant,
	disabled,
	onChange,
	placeHolder,
	rows,
	cols,
}) => {
	return (
		<textarea
			type={type}
			className={variant}
			value={value}
			name={name}
			placeholder={placeHolder}
			onChange={onChange}
			disabled={disabled}
			rows={rows}
			cols={cols}
			autoFocus
		/>
	);
};

TextArea.propTypes = {
	type        : PropTypes.string.isRequired,
	value       : PropTypes.string.isRequired,
	variant     : PropTypes.string,
	name        : PropTypes.string.isRequired,
	onChange    : PropTypes.func.isRequired,
	placeHolder : PropTypes.string,
	disabled    : PropTypes.bool,
	rows        : PropTypes.number,
	cols        : PropTypes.number,
};

TextArea.defaultProps = {
	type        : '',
	value       : '',
	variant     : '',
	name        : '',
	onChange    : () => {},
	placeHolder : '',
	disabled    : false,
	rows        : 0,
	cols        : 0,
};

export default TextArea;
