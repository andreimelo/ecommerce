import env from '../../common/config/env';
import { apiFetch } from '../../common/config/fetch';

async function parseAssistantResponse(response) {
	const rawBody = await response.text();
	let payload = {};

	if (rawBody) {
		try {
			payload = JSON.parse(rawBody);
		} catch (error) {
			throw new Error('Shopping assistant returned an invalid response. Please check server status.');
		}
	}

	if (!response.ok) {
		throw new Error(payload?.message || 'Shopping assistant request failed.');
	}

	return payload;
}

export async function askShoppingAssistant(message){
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
		},
		body    : JSON.stringify({ message }),
	};

	const result = await apiFetch(`${env.base_uri}/ai/shopping-assistant`, options);
	const data = await parseAssistantResponse(result);

	return data;
}
