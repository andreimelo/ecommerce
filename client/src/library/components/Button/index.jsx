import PropTypes from 'prop-types';
import React from 'react';

function Button({variant, title}){
	return <button variant={variant}>{title}</button>;
}

Button.propTypes = {
	variant : PropTypes.string,
	title   : PropTypes.string.isRequired,
};

export default Button;
