import React from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';
import PropTypes from 'prop-types';

const Helmet = ({ title, titleContent, image, description }) => {
	return (
		<ReactHelmet>
			<title>{title}</title>
			<meta property='og:title' content={titleContent} />
			<meta property='og:image' content={image} />
			<meta property='og:description' content={description} />
		</ReactHelmet>
	);
};

Helmet.propTypes = {
	title        : PropTypes.string.isRequired,
	titleContent : PropTypes.string.isRequired,
	image        : PropTypes.string,
	description  : PropTypes.string,
};

Helmet.defaultProps = {
	title        : '',
	titleContent : '',
	image        : '',
	description  : '',
};

export default React.memo(Helmet);
