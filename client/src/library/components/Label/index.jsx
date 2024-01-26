import PropTypes from 'prop-types';
import React from 'react';
import '../Label/style.css';

function Label({ title, children, variant}) {
    return <div className={variant}>{title}{children}</div>;
}

Label.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.element,
};

export default React.memo(Label);
