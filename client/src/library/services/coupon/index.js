import env from '../../common/config/env';
import { apiFetch } from '../../common/config/fetch';

export async function createCoupon(fields, token){
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({ ...fields }),
	};
	const result = await apiFetch(`${env.base_uri}/coupon`, options);

	const data = await result.json();

	return data;
}

export async function removeCoupon(id, token){
	const options = {
		method  : 'DELETE',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await apiFetch(`${env.base_uri}/coupon/${id}`, options);

	const data = await result.json();

	return data;
}

export async function updateCoupon(id, fields, token){
	const options = {
		method  : 'PUT',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({ ...fields }),
	};
	const result = await apiFetch(`${env.base_uri}/coupon/${id}`, options);

	const data = await result.json();

	return data;
}

export async function getCoupons(token){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await apiFetch(`${env.base_uri}/coupons`, options);

	const data = await result.json();

	return data;
}

export async function applyCoupon(coupon, token){
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({ coupon }),
	};
	const result = await apiFetch(`${env.base_uri}/user/cart/coupon`, options);

	const data = await result.json();

	return data;
}
