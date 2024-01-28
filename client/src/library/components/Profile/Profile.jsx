import React from 'react';
import Avatar from './components/Avatar';
import PropTypes from 'prop-types';

const Profile =({imageURL})=> {
    return (
        <div>
            <Avatar src={imageURL} alt="Rounded Avatar"/>
        </div>
    );
}

Profile.propTypes = {
    imageURL: PropTypes.string
}

export default Profile;