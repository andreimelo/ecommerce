import env from '../../common/config/env';

export async function createOrUpdateUser(token){
	try {
		const options = {
			method  : 'POST',
			headers : {
				Accept         : 'application/json',
				'Content-Type' : 'application/json',
				authToken      : token || '',
			},
		};
		const result = await fetch(`${env.base_uri}/auth/create-or-update`, options);

		const data = await result.json();

		return data;
	} catch (error) {
		alert(error);
	}
}

export async function currentUser(token){
	try {
		const options = {
			method  : 'POST',
			headers : {
				Accept         : 'application/json',
				'Content-Type' : 'application/json',
				authToken      : token || '',
			},
		};
		const result = await fetch(`${env.base_uri}/auth/current-user`, options);

		const data = await result.json();

		return data;
	} catch (error) {
		alert(error);
	}
}
