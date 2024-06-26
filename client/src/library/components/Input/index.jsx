import PropTypes from 'prop-types';
import React from 'react';
import '../Input/style.css';

function Input({ type, value, name, variant, disabled, onChange, placeHolder,errorMessage, min }) {
	return (
		<>
			<input min={min} type={type} disabled={disabled} value={value} name={name} className={variant} onChange={onChange} placeholder={placeHolder} autoFocus/>
			{errorMessage && <div className="error-message absolute pt-2">{errorMessage}</div>}
		</>
	);
}

Input.propTypes = {
	type: PropTypes.string.isRequired,
	value    : PropTypes.string.isRequired,
	variant : PropTypes.string,
	name    : PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeHolder : PropTypes.string,
	disabled: PropTypes.bool,
	min: PropTypes.string,
};

export default React.memo(Input);
