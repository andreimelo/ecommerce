const { app } = require('../config/express');
const cors = require('cors');
const compression = require('compression');
const string = require('../utilities/strings');
const { connectToMongoDb } = require('../config/mongoDb');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { readdirSync } = require('fs');
const path = require('path');

//  Body parser json
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

// Connect to Db
connectToMongoDb();

// Morgan
app.use(morgan('dev'));

// Cors
const corsOptions = {
	origin      : true,
	credentials : true,
	allowedHeaders : [
		'Content-Type',
		'Authorization',
		'authToken',
		'X-CSRF-Token',
		'X-Requested-With',
		'Accept',
	],
	methods     : ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Compression
app.use(compression());

// File system
const routesDirectory = path.join(__dirname, '..', 'routes');
readdirSync(routesDirectory).forEach((version) => {
    app.use(`/api/${version}`, require(path.join(routesDirectory, version)));
});

app.get('/', (req, res) => {
	res.send(string.common.startServerMessage);
});

module.exports = app;
