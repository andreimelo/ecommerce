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

export async function saveUserCart(cart, token){
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({ cart }),
	};
	const result = await fetch(`${env.base_uri}/user/save-cart`, options);

	const data = await result.json();

	return data;
}

export async function getUserCart(token){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await fetch(`${env.base_uri}/user/save-cart`, options);

	const data = await result.json();

	return data;
}
