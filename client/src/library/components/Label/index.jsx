import PropTypes from 'prop-types';
import React from 'react';
import '../Label/style.css';

function Label({ title, variant}) {
    return <div className={variant}>{title}</div>;
}

Label.propTypes = {
	title: PropTypes.string.isRequired,
};

export default React.memo(Label);
