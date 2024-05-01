// rename stripe config env
const { stripe: use } = require('../../config/env');
const stripe = require('stripe')(use.credentials.secret);

module.exports = {
	stripe,
};
