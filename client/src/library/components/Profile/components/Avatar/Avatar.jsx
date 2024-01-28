import React from 'react';
import PropTypes from 'prop-types';

const Avatar = ({src, alt}) => {
    return (
        <img class="w-10 h-10 rounded-full" src={src} alt={alt}/>
    )
};

Avatar.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string,
};

export default Avatar;