import env from '../../common/config/env';

export async function getSubCategories(){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
		},
	};
	const result = await fetch(`${env.base_uri}/sub-categories`, options);

	const data = await result.json();

	return data;
}

export async function getSubCategory(slug){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
		},
	};
	const result = await fetch(`${env.base_uri}/sub-category/${slug}`, options);

	const data = await result.json();

	return data;
}

export async function removeSubCategory(slug, token){
	const options = {
		method  : 'DELETE',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await fetch(`${env.base_uri}/sub-category/${slug}`, options);

	const data = await result.json();

	return data;
}

export async function updateSubCategory(slug, category, token){
	try {
		const options = {
			method  : 'PUT',
			headers : {
				Accept         : 'application/json',
				'Content-Type' : 'application/json',
				authToken      : token || '',
			},
			body    : JSON.stringify({
				...category,
			}),
		};
		const result = await fetch(`${env.base_uri}/sub-category/${slug}`, options);

		const data = await result.json();

		return data;
	} catch (error) {
		alert(error);
	}
}

export async function createSubCategory(category, token){
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({
			...category,
		}),
	};
	const result = await fetch(`${env.base_uri}/sub-category`, options);

	const data = await result.json();

	return data;
}
