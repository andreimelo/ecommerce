const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	port       : process.env.PORT || 8000,
	database   : {
		mongodb_uri    : process.env.MONGODB_URI,
		firebasedb_uri : process.env.FIREBASEDB_URI,
	},
	firebase   : {
		credentials : {
			type                        : process.env.FIREBASE_TYPE,
			project_id                  : process.env.FIREBASE_PROJECT_ID,
			private_key_id              : process.env.FIREBASE_PRIVATE_KEY_ID,
			private_key                 : process.env.FIREBASE_PRIVATE_KEY.replace(
				/\\n/g,
				'\n',
			),
			client_email                : process.env.FIREBASE_CLIENT_EMAIL,
			client_id                   : process.env.FIREBASE_CLIENT_ID,
			auth_uri                    : process.env.FIREBASE_AUTH_URI,
			token_uri                   : process.env.FIREBASE_TOKEN_URI,
			auth_provider_x509_cert_url : process.env.FIREBASE_AUTH_PROVIDER_X509,
			client_x509_cert_url        : process.env.FIREBASE_CLIENT_X509,
		},
	},
	cloudinary : {
		credentials : {
			name    : process.env.CLOUDINARY_CLOUD_NAME,
			api_key : process.env.CLOUDINARY_API_KEY,
			secret  : process.env.CLOUDINARY_API_SECRET,
		},
	},
};
