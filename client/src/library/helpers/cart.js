export const addToCart = (product, dispatch) => {
	let cart = [];

	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}

		// Check if the product already exists in the cart
		const existingProductIndex = cart.findIndex((item) => item._id === product._id);
		if (existingProductIndex !== -1) {
			// Update count and price of existing product
			cart[existingProductIndex].count++;
			cart[existingProductIndex].price =
				product.price * cart[existingProductIndex].count;
		}
		else {
			// Add the product to the cart with count = 1
			cart.push({
				...product,
				count : 1,
			});
		}

		// Remove duplicates
		let unique = cart.filter(
			(item, index, self) => index === self.findIndex((t) => t._id === item._id),
		);

		localStorage.setItem('cart', JSON.stringify(unique));
		dispatch({
			type    : 'ADD_TO_CART',
			payload : unique,
		});

		dispatch({
			type    : 'SET_VISIBLE_DRAWER',
			payload : true,
		});
	}
};

export const removeToCart = (product, dispatch) => {
	let cart = [];

	if (typeof window !== 'undefined') {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'));
		}

		// Check if the product already exists in the cart
		const existingProductIndex = cart.findIndex((item) => item._id === product._id);

		if (existingProductIndex !== -1) {
			// Remove product
			cart.splice(existingProductIndex, 1);

			// Remove duplicates
			let unique = cart.filter(
				(item, index, self) =>
					index === self.findIndex((t) => t._id === item._id),
			);

			localStorage.setItem('cart', JSON.stringify(unique));
			return dispatch({
				type    : 'ADD_TO_CART',
				payload : unique,
			});
		}
	}
};
