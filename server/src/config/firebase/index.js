const admin = require('firebase-admin');
const { database } = require('../../config/env');

var serviceAccount = require('../firebase/fbServiceAccountKey.json');

admin.initializeApp({
	credential  : admin.credential.cert(serviceAccount),
	databaseURL : database.firebasedb_uri,
});
