import env from '../../common/config/env';
import { apiFetch } from '../../common/config/fetch';

export async function imageUpload(imageUri, token){
	// refactor
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify(imageUri),
	};
	const result = await apiFetch(`${env.base_uri}/upload-images`, options);

	const data = await result.json();

	return data;
}

export async function removeImageUpload(imageUri, token){
	// refactor
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({ public_id: imageUri }),
	};
	const result = await apiFetch(`${env.base_uri}/remove-image`, options);

	const data = await result.json();

	return data;
}
