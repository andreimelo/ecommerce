import React from 'react';
import Card from '../../../../../library/components/Card';
import PropTypes from 'prop-types';

const RelatedProducts = ({ data, loading, numberOfStar, showAverageRating }) => {
	return (
		<div>
			<section className='my-5 text-xl font-semibold'>Related Products</section>
			<div className='flex'>
				<div className='grid grid-cols-4 gap-4'>
					{
						loading ? <h2>🌀 Loading....</h2> :
						data &&
						data.map((item) => (
							<Card
								containerClass={
									'relative my-5 flex w-full max-w-xs flex-col'
								}
								imgContainerClass='relative flex h-60 overflow-hidden'
								imgSrc={item.images}
								title={item.title}
								description={item.description}
								slug={item.slug}
								linkTo={'/product'}
								isProductAndCart
								price={`$${item.price}`}
								star={numberOfStar}
								rating={showAverageRating(item)}
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
