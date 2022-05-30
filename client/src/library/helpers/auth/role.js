export function roleBasedRedirect(role, history){
	if (role === 'admin') {
		return history.push('/admin/dashboard');
	}
	else {
		return history.push('/user/history');
	}
}
