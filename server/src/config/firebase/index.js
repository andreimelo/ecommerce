const admin = require('firebase-admin');
const { database, firebase } = require('../../config/env');

admin.initializeApp({
	credential  : admin.credential.cert(firebase.credentials),
	databaseURL : database.firebasedb_uri,
});

module.exports = admin;
