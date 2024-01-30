export function roleBasedRedirect(role, history){
	// Assigned role redirect to path
	// if (role === 'admin') {
	// 	return history.push('/');
	// }
	// else {
	// 	return history.push('/user/history');
	// }
	return history.push('/');
}
