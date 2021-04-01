const env = {
	base_uri : process.env.REACT_APP_BASE_URL,
	firebase : {
		register    : {
			complete_registration_uri :
				process.env.REACT_APP_REGISTER_COMPLETE_REDIRECT_URL,
			forgot_password_uri       :
				process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
		},
		credentials : {
			api_key             : process.env.REACT_APP_FIREBASE_API_KEY,
			auth_domain         : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
			project_id          : process.env.REACT_APP_FIREBASE_PROJECT_ID,
			storage_bucket      : process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
			messaging_sender_id : process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
			app_id              : process.env.REACT_APP_FIREBASE_APP_ID,
			measurement_id      : process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
		},
	},
};

export default env;
