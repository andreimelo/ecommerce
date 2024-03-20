import React from 'react';

const ShopByCategory = ({ match }) => {
	const { slug } = match.params;
	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			Welcome to {slug}
		</div>
	);
};

export default ShopByCategory;
