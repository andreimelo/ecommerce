import PropTypes from 'prop-types';
import React from 'react';
import '../Button/style.css';

function Button({ variant, title, onClick }){
	return (
		<button className={variant} onClick={onClick}>
			{title}
		</button>
	);
}

Button.propTypes = {
	variant : PropTypes.string,
	title   : PropTypes.string,
	onClick : PropTypes.func,
};

Button.defaultProps = {
	variant : '',
	title   : '',
	onClick : () => {},
};

export default React.memo(Button);
