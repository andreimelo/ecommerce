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

//
export async function saveUserAddress(userDetails, token){
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({ ...userDetails }),
	};
	const result = await fetch(`${env.base_uri}/user/address`, options);

	const data = await result.json();

	return data;
}

export async function createOrder(stripeResponse, token){
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({ stripeResponse }),
	};
	const result = await fetch(`${env.base_uri}/user/order`, options);

	const data = await result.json();

	return data;
}

export async function emptyCart(token){
	const options = {
		method  : 'DELETE',
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

export async function getUserOrders(token){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await fetch(`${env.base_uri}/user/orders`, options);

	const data = await result.json();

	return data;
}

export async function getWishList(token){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await fetch(`${env.base_uri}/user/wishlist`, options);

	const data = await result.json();

	return data;
}

export async function addToWishList(productId, token){
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({ productId }),
	};
	const result = await fetch(`${env.base_uri}/user/wishlist`, options);

	const data = await result.json();

	return data;
}

export async function removeFromWishList(productId, token){
	const options = {
		method  : 'PUT',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await fetch(`${env.base_uri}/user/wishlist/${productId}`, options);

	const data = await result.json();

	return data;
}
