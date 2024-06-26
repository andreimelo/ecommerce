import React from 'react';
import { useDispatch } from 'react-redux';
import Card from '../../../../../library/components/Card';
import { addToCart } from '../../../../../library/helpers/cart';

import PropTypes from 'prop-types';
import Spinner from '../../../../../library/components/Spinner/Spinner';

const RelatedProducts = ({ data, loading, numberOfStar, showAverageRating }) => {
	const dispatch = useDispatch();

	return (
		<div>
			<section className='my-5 text-xl font-semibold'>Related Products</section>
			<div className='flex'>
				<div className='grid grid-cols-4 gap-4 max-[600px]:inline-flex max-[600px]:w-500 max-[600px]:overflow-x-scroll'>
					{
						loading ? <Spinner /> :
						data &&
						data.map((item) => (
							<Card
								containerClass={
									'relative my-5 flex w-full max-w-xs flex-col border h-96'
								}
								imgClass='object-contain bg-gray-100'
								imgContainerClass='relative flex overflow-hidden'
								imgSrc={item.images}
								title={item.title}
								description={item.description}
								slug={item.slug}
								linkTo={'/product'}
								isProductAndCart
								price={`$${item.price}`}
								star={numberOfStar}
								rating={showAverageRating(item)}
								quantity={item.quantity}
								handleAddToCart={() => addToCart(item, dispatch)}
							/>
						))}
				</div>
			</div>
		</div>
	);
};

RelatedProducts.propTypes = {
	data              : PropTypes.array,
	loading           : PropTypes.bool,
	numberOfStar      : PropTypes.number,
	showAverageRating : PropTypes.func,
};
RelatedProducts.defaultProps = {
	data              : [],
	loading           : false,
	numberOfStar      : 0,
	showAverageRating : () => {},
};

export default RelatedProducts;
