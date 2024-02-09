import env from '../../common/config/env';

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
	const result = await fetch(`${env.base_uri}/upload-images`, options);

	const data = await result.json();

	return data;
}
