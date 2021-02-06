import PropTypes from 'prop-types';
import React from 'react';
import '../Input/style.css';

function Input({ type, value, name, variant, onChange, placeHolder }) {
	return <input type={type} value={value} name={name} className={variant} onChange={onChange} placeholder={placeHolder} />;
}

Input.propTypes = {
	type: PropTypes.string.isRequired,
	value    : PropTypes.string.isRequired,
	variant : PropTypes.string,
	name    : PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeHolder : PropTypes.string,
};

export default React.memo(Input);
