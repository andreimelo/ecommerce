import env from '../../common/config/env';
import { apiFetch } from '../../common/config/fetch';
import { currentUser } from '../auth';

async function fetchWithSessionRetry(url, options, token){
	let result = await apiFetch(url, options);

	if (result.status === 401 && token) {
		try {
			await currentUser(token);
			result = await apiFetch(url, options);
		} catch (error) {
			// If session bootstrap fails, return the original response handling path.
		}
	}

	return result;
}

async function parseJsonResponse(response, fallbackMessage){
	const rawBody = await response.text();

	if (!rawBody) {
		return {};
	}

	try {
		return JSON.parse(rawBody);
	} catch (error) {
		throw new Error(fallbackMessage);
	}
}

export async function getUserAccounts(token){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await apiFetch(`${env.base_uri}/user/accounts`, options);

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
	const result = await apiFetch(`${env.base_uri}/user/save-cart`, options);

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
	const result = await apiFetch(`${env.base_uri}/user/save-cart`, options);

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
	const result = await apiFetch(`${env.base_uri}/user/address`, options);

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
	const result = await apiFetch(`${env.base_uri}/user/order`, options);

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
	const result = await apiFetch(`${env.base_uri}/user/save-cart`, options);

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
	const result = await fetchWithSessionRetry(`${env.base_uri}/user/orders`, options, token);

	const data = await parseJsonResponse(result, 'Unable to load orders right now. Please check API base URL and server status.');

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
	const result = await fetchWithSessionRetry(`${env.base_uri}/user/wishlist`, options, token);

	const data = await parseJsonResponse(result, 'Unable to load wishlist right now. Please check API base URL and server status.');

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
	const result = await apiFetch(`${env.base_uri}/user/wishlist`, options);

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
	const result = await apiFetch(`${env.base_uri}/user/wishlist/${productId}`, options);

	const data = await result.json();

	return data;
}

export async function createCashOrder(payment, token, coupon){
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({ payment, couponApplied: coupon }),
	};
	const result = await apiFetch(`${env.base_uri}/user/cash-order`, options);

	const data = await result.json();

	return data;
}

export async function getUserProfile(token){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await fetchWithSessionRetry(`${env.base_uri}/user/profile`, options, token);
	const data = await parseJsonResponse(result, 'Unable to load profile right now. Please check API base URL and server status.');

	return data;
}

export async function updateUserProfile(payload, token){
	const options = {
		method  : 'PUT',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify(payload),
	};
	const result = await fetchWithSessionRetry(`${env.base_uri}/user/profile`, options, token);
	const data = await parseJsonResponse(result, 'Unable to update profile right now. Please check API base URL and server status.');

	return data;
}

export async function getNavLocation(lat, long){
	const res = await fetch(
		`${env.geolocation_url}?lat=${lat}&lon=${long}&format=json`
	);

	const data = await res.json();
	return data;
}