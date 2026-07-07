import env from '../../common/config/env';
import { apiFetch } from '../../common/config/fetch';

export async function createPaymentIntent(token){
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token,
		},
	};
	const result = await apiFetch(`${env.base_uri}/payment/intent`, options);
	const data = await result.json();

	return data;
}
