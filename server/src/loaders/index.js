const { app } = require('../config/express');
const cors = require('cors');
const compression = require('compression');
const string = require('../utilities/strings');
const { connectToMongoDb } = require('../config/mongoDb');
const bodyParser = require('body-parser');
const morgan = require('morgan');

//  Body parser json
app.use(bodyParser.urlencoded({ extended: false, limit: '2mb' }));
app.use(bodyParser.json());

// Connect to Db
connectToMongoDb();

// Morgan
app.use(morgan('dev'));

// Cors
app.use(cors());

// Compression
app.use(compression());

app.get('/', (req, res) => {
	res.send(string.common.startServerMessage);
});

module.exports = app;
