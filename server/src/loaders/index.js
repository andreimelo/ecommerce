const { app } = require('../config/express');
const cors = require('cors');
const compression = require('compression');
const string = require('../utilities/strings');
const bodyParser = require('body-parser');

//  Body parser json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors
app.use(cors());

// Compression
app.use(compression());

app.get('/', (req, res) => {
	res.send(string.common.startServerMessage);
});

module.exports = app;
