import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Separator({ title }){
	return <div className='separator my-6'>{title}</div>;
}

Separator.propTypes = {
	title : PropTypes.string.isRequired,
};

Separator.defaultProps = {
	title : '',
};

export default React.memo(Separator);
