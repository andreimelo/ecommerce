import env from '../../common/config/env';
import { apiFetch } from '../../common/config/fetch';

export async function getCategories(){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
		},
	};
	const result = await apiFetch(`${env.base_uri}/categories`, options);

	const data = await result.json();

	return data;
}

export async function getCategory(slug){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
		},
	};
	const result = await apiFetch(`${env.base_uri}/category/${slug}`, options);

	const data = await result.json();

	return data;
}

export async function removeCategory(slug, token){
	const options = {
		method  : 'DELETE',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await apiFetch(`${env.base_uri}/category/${slug}`, options);

	const data = await result.json();

	return data;
}

export async function updateCategory(slug, category, token){
	try {
		const options = {
			method  : 'PUT',
			headers : {
				Accept         : 'application/json',
				'Content-Type' : 'application/json',
				authToken      : token || '',
			},
			body    : JSON.stringify({
				name : category,
			}),
		};
		const result = await apiFetch(`${env.base_uri}/category/${slug}`, options);

		const data = await result.json();

		return data;
	} catch (error) {
		alert(error);
	}
}

export async function createCategory(category, token){
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify({
			name : category,
		}),
	};
	const result = await apiFetch(`${env.base_uri}/category`, options);

	const data = await result.json();

	return data;
}

export async function getSubCategory(id){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
		},
	};
	const result = await apiFetch(`${env.base_uri}/category/sub-category/${id}`, options);

	const data = await result.json();

	return data;
}
