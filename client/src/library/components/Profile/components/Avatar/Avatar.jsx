import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({ src, alt }) => {
	return <img className='w-10 h-10 rounded-full' src={src} alt={alt} />;
};

Avatar.propTypes = {
	src : PropTypes.string.isRequired,
	alt : PropTypes.string,
};

Avatar.defaultProps = {
	src : '',
	alt : '',
};

export default Avatar;
