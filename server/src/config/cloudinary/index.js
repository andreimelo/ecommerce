const cloudinary = require('cloudinary');
const env = require('../env');

cloudinary.config({
	cloud_name : env.cloudinary.credentials.name,
	api_key    : env.cloudinary.credentials.api_key,
	api_secret : env.cloudinary.credentials.secret,
});

module.exports = cloudinary;
