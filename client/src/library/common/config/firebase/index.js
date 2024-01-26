import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

import env from '../env';

const firebaseConfig = {
	apiKey            : env.firebase.credentials.api_key,
	authDomain        : env.firebase.credentials.auth_domain,
	projectId         : env.firebase.credentials.project_id,
	storageBucket     : env.firebase.credentials.storage_bucket,
	messagingSenderId : env.firebase.credentials.messaging_sender_id,
	appId             : env.firebase.credentials.app_id,
	measurementId     : env.firebase.credentials.measurement_id,
};

export const registerConfig = {
	url             : env.firebase.register.complete_registration_uri,
	handleCodeInApp : true,
};

export const forgotPasswordConfig = {
	url             : env.firebase.register.forgot_password_uri,
	handleCodeInApp : true,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

getAnalytics(app);

export const auth = getAuth();

export const googleAuthProvider = new GoogleAuthProvider();
