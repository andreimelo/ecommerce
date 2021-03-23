import firebase from 'firebase';

export async function onAuthStateAction(user, dispatch){
	const idTokenResult = await user.getIdTokenResult();
	return dispatch({
		type    : 'LOGGED_IN_USER',
		payload : {
			email : user.email,
			token : idTokenResult,
		},
	});
}

export async function logOutAction(dispatch){
	firebase.auth().signOut();
	dispatch({
		type    : 'LOGOUT',
		payload : null,
	});
	// history.push('/login')
}
