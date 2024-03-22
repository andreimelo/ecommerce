import env from '../../common/config/env';

export async function createProduct(product, token){
	// refactor
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify(product),
	};
	const result = await fetch(`${env.base_uri}/product`, options);

	const data = await result.json();

	return data;
}

export async function getProductsByCount(count){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
		},
	};
	const result = await fetch(`${env.base_uri}/products/${count}`, options);

	const data = await result.json();

	return data;
}

export async function removeProduct(slug, token){
	// refactor
	const options = {
		method  : 'DELETE',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
	};
	const result = await fetch(`${env.base_uri}/product/${slug}`, options);

	const data = await result.json();

	return data;
}

export async function getProductBySlug(slug){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
		},
	};
	const result = await fetch(`${env.base_uri}/product/${slug}`, options);

	const data = await result.json();

	return data;
}

export async function updateProductBySlug(slug, product, token){
	// refactor
	const options = {
		method  : 'PUT',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token || '',
		},
		body    : JSON.stringify(product),
	};
	const result = await fetch(`${env.base_uri}/product/${slug}`, options);

	const data = await result.json();

	return data;
}

export async function getProductsBySortAndOrder(sort, order, page){
	const transformData = {
		sort,
		order,
		page,
	};
	// refactor
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : '',
		},
		body    : JSON.stringify(transformData),
	};
	const result = await fetch(`${env.base_uri}/products`, options);

	const data = await result.json();

	return data;
}

export async function putProductStarRating(productId, star, token){
	const transformData = {
		star,
	};
	// refactor
	const options = {
		method  : 'PUT',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
			authToken      : token,
		},
		body    : JSON.stringify(transformData),
	};
	const result = await fetch(`${env.base_uri}/product/star/${productId}`, options);

	const data = await result.json();

	return data;
}

export async function getRelatedProducts(productId){
	const options = {
		method  : 'GET',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
		},
	};
	const result = await fetch(`${env.base_uri}/product/related/${productId}`, options);

	const data = await result.json();

	return data;
}

export async function getProductsByFilter(arg){
	// refactor
	const options = {
		method  : 'POST',
		headers : {
			Accept         : 'application/json',
			'Content-Type' : 'application/json',
		},
		body    : JSON.stringify(arg),
	};
	const result = await fetch(`${env.base_uri}/search/filters`, options);

	const data = await result.json();

	return data;
}
