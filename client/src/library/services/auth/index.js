import env from '../../common/config/env';

export async function createOrUpdateUser(token){
	console.log(token);
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

		console.log(data, 'Result of create or update');
		return data;
	} catch (error) {
		alert(error);
	}
}
