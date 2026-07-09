import env from '../../common/config/env';
import { apiFetch } from '../../common/config/fetch';

 async function getCsrfToken(){
	try {
		const response = await apiFetch(`${env.base_uri}/auth/csrf-token`, {
			method      : 'GET',
			headers     : {
				Accept : 'application/json',
			},
		});
		const data = await response.json();
		return data.csrfToken || '';
	} catch (error) {
		console.log(error);
		return '';
	}
}

async function createRequestOptions(token, method = 'POST'){
	const csrfToken = await getCsrfToken();

	return {
		method      : method,
		credentials : 'include',
		headers     : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
			'X-CSRF-Token' : csrfToken,
		},
	};
}

export async function refreshSession(){
	try {
		const csrfToken = await getCsrfToken();
		const response = await apiFetch(`${env.base_uri}/auth/refresh`, {
			method      : 'POST',
			credentials : 'include',
			headers     : {
				Accept         : 'application/json',
				'Content-Type' : 'application/json',
				'X-CSRF-Token' : csrfToken,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
		return null;
	}
}

export async function createOrUpdateUser(token){
	try {
		if (!token) {
			throw new Error('Token is required for authentication');
		}
		const options = await createRequestOptions(token);
		const result = await apiFetch(`${env.base_uri}/auth/create-or-update`, options);

		if (!result.ok) {
			const error = await result.json();
			throw new Error(error.message || 'Failed to create or update user');
		}

		const data = await result.json();
		return data;
	} catch (error) {
		console.error('Create/Update user error:', error);
		throw error;
	}
}

export async function currentUser(token){
	try {
		if (!token) {
			throw new Error('Token is required for authentication');
		}
		const options = await createRequestOptions(token);
		const result = await apiFetch(`${env.base_uri}/auth/current-user`, options);

		if (!result.ok) {
			const error = await result.json();
			throw new Error(error.message || 'Failed to fetch current user');
		}

		const data = await result.json();
		return data;
	} catch (error) {
		console.error('Current user error:', error);
		throw error;
	}
}

export async function currentAdmin(token){
	try {
		if (!token) {
			throw new Error('Token is required for authentication');
		}
		const options = await createRequestOptions(token);
		const result = await apiFetch(`${env.base_uri}/auth/current-admin`, options);

		if (!result.ok) {
			const error = await result.json();
			throw new Error(error.message || 'Failed to fetch admin data');
		}

		const data = await result.json();
		return data;
	} catch (error) {
		console.error('Current admin error:', error);
		throw error;
	}
}

export async function logoutUser(token){
	try {
		const csrfToken = await getCsrfToken();
		const result = await apiFetch(`${env.base_uri}/auth/logout`, {
			method      : 'POST',
			headers     : {
				Accept         : 'application/json',
				'Content-Type' : 'application/json',
				authToken      : token || '',
				'X-CSRF-Token' : csrfToken,
			},
		});

		if (!result.ok) {
			const error = await result.json();
			throw new Error(error.message || 'Failed to logout');
		}

		return result.json();
	} catch (error) {
		console.error('Logout error:', error);
		throw error;
	}
}
