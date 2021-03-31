const mongoose = require('mongoose');
const { database } = require('../../config/env');
const string = require('../../utilities/strings');

const options = {
	useNewUrlParser    : true,
	useCreateIndex     : true,
	useFindAndModify   : true,
	useUnifiedTopology : true,
};

async function connectToMongoDb(){
	try {
		await mongoose.connect(database.uri, options);
		console.log(string.database.connectedToMongodb);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	connectToMongoDb,
};
