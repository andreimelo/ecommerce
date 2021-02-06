import PropTypes from 'prop-types';
import React from 'react';

function Button({variant, title, onClick}){
	return <button variant={variant} onClick={onClick}>{title}</button>;
}

Button.propTypes = {
	variant : PropTypes.string,
	title: PropTypes.string,
	onClick : PropTypes.func
};

export default Button;
