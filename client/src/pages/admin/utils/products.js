export const INITIAL_PRODUCT_VALUES = {
	title       : '',
	description : '',
	price       : '',
	shipping    : '',
	quantity    : '',
	color       : '',
	brand       : '',
	category    : '',
	subCategory : [],
	images      : [],
};

export function filterProducts(products, searchValue) {
	return products.filter((item) => {
		const title = item.title?.toLowerCase() || '';
		const brand = item.brand?.toLowerCase() || '';
		return title.includes(searchValue) || brand.includes(searchValue);
	});
}
