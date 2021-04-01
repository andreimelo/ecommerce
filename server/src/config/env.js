const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	port     : process.env.PORT || 8000,
	database : {
		uri : process.env.MONGODB_URI,
	},
};
