const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	port     : process.env.PORT,
	database : {
		uri : process.env.MONGODB_URI,
	},
};
