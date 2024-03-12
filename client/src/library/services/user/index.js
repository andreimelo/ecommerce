import env from '../../common/config/env';

export async function getUserAccounts(token){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await fetch(`${env.base_uri}/user/accounts`, options);

	const data = await result.json();

	return data;
}
