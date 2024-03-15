export function roleBasedRedirect(role, history){
	// Assigned role redirect to path
	// if (role === 'admin') {
	// 	return history.push('/');
	// }
	// else {
	// 	return history.push('/user/history');
	// }
	let intended = history.location.state && history.location.state.from;
	if (intended) {
		return history.push(history.location.state.from);
	}
	return history.push('/');
}
