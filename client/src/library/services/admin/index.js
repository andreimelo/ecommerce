import env from '../../common/config/env';
import { apiFetch } from '../../common/config/fetch';

export async function getOrderList(token){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await apiFetch(`${env.base_uri}/admin/orders`, options);

	const data = await result.json();

	return data;
}

export async function updateOrderStatus(orderId, orderStatus, token){
	const options = {
		method  : 'PUT',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({ orderId, orderStatus }),
	};
	const result = await apiFetch(`${env.base_uri}/admin/order-status`, options);

	const data = await result.json();

	return data;
}
