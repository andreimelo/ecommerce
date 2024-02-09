const { app } = require('../config/express');
const cors = require('cors');
const compression = require('compression');
const string = require('../utilities/strings');
const { connectToMongoDb } = require('../config/mongoDb');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { readdirSync } = require('fs');

//  Body parser json
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

// Connect to Db
connectToMongoDb();

// Morgan
app.use(morgan('dev'));

// Cors
app.use(cors());

// Compression
app.use(compression());

// File system
readdirSync('src/routes').map((r) => app.use('/api', require('../routes/' + r)));

app.get('/', (req, res) => {
	res.send(string.common.startServerMessage);
});

module.exports = app;
