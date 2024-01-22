export function roleBasedRedirect(role, history){
	// Assigned role redirect to path
	if (role === 'admin') {
		return history.push('/admin/dashboard');
	}
	else {
		return history.push('/user/history');
	}
}
