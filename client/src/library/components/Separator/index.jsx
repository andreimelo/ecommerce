import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Separator({title}) {
    return (
        <div class="separator">{title}</div>  
    )
}

Separator.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Separator;