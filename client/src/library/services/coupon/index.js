import env from '../../common/config/env';

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
	const result = await fetch(`${env.base_uri}/coupon`, options);

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
	const result = await fetch(`${env.base_uri}/coupon/${id}`, options);

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
	const result = await fetch(`${env.base_uri}/coupons`, options);

	const data = await result.json();

	return data;
}
