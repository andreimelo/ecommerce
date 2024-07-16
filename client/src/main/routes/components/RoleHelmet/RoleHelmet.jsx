import React from 'react';
import PropTypes from 'prop-types';
import Helmet from '../../../../library/components/Helmet';
import { documentTitle } from '../../../../library/helpers/tags';

const RoleHelmet = ({ role }) => {
	const adminTitle = documentTitle('Admin');
    const title = documentTitle('Online Shopping | Mobile & Electronics');
    
	return role ? <Helmet title={title} /> :
		<Helmet title={adminTitle} />;
};

RoleHelmet.propTypes = {
	role : PropTypes.string.isRequired,
};

RoleHelmet.defaultProps = {
	role : '',
};

export default RoleHelmet;
