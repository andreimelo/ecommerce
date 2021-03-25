import firebase from 'firebase';

const firebaseConfig = {
	apiKey            : process.env.REACT_APP_FIREBASE_API_KEY,
	authDomain        : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
	projectId         : process.env.REACT_APP_FIREBASE_PROJECT_ID,
	storageBucket     : process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
	messagingSenderId : process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
	appId             : process.env.REACT_APP_FIREBASE_APP_ID,
	measurementId     : process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

export const registerConfig = {
	url             : process.env.REACT_APP_REGISTER_COMPLETE_REDIRECT_URL,
	handleCodeInApp : true,
};

export const forgotPasswordConfig = {
	url             : process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
	handleCodeInApp : true,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.analytics();

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
