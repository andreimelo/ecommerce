import env from '../../common/config/env';

export async function createProduct(product, token){
	// refactor
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify(product),
	};
	const result = await fetch(`${env.base_uri}/product`, options);

	const data = await result.json();

	return data;
}

export async function getProductsByCount(count){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
		},
	};
	const result = await fetch(`${env.base_uri}/products/${count}`, options);

	const data = await result.json();

	return data;
}
