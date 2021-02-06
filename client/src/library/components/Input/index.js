import PropTypes from 'prop-types';
import React from 'react';
import './style.css';

function Input({type, name, variant}){
	return <input type={type} name={name} style={variant} />;
}

Input.propTypes = {
	type    : PropTypes.string.isRequired,
	variant : PropTypes.string,
	name    : PropTypes.string.isRequired,
};

export default React.memo(Input);
