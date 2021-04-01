const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	port     : process.env.PORT || 8000,
	database : {
		mongodb_uri    : process.env.MONGODB_URI,
		firebasedb_uri : process.env.FIREBASEDB_URI,
	},
};
