import React, { useEffect, useState } from 'react';
import { getProductBySlug } from '../../../library/services/product';
import Carousel from '../../../library/components/Carousel';
import ProductListItem from './components/ProductListItem/ProductListItem';
import RatingIcon from '../../../library/components/RatingIcon';
import Modal from '../../../library/components/Modal';

const ViewProduct = ({ match }) => {
	const { slug } = match.params;
	const [
		modalOpen,
		setModalOpen,
	] = useState(false);
	const [
		product,
		setProduct,
	] = useState();
	const [
		loading,
		setLoading,
	] = useState(false);
	const [
		rating,
		setRating,
	] = useState(0);
	const [
		hoverRating,
		setHoverRating,
	] = useState(0);

	const star = [
		1,
		2,
		3,
		4,
		5,
	];

	async function fetchProductBySlug(){
		try {
			setLoading(true);
			const result = await getProductBySlug(slug);
			setProduct(result);
			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert(error);
		}
	}
	function onMouseEnter(index){
		setHoverRating(index);
	}
	function onMouseLeave(){
		setHoverRating(0);
	}
	function onSaveRating(index){
		setRating(index);
	}

	function openModal(){
		setModalOpen(true);
	}

	function closeModal(){
		setModalOpen(false);
	}

	useEffect(() => {
		fetchProductBySlug();
		// eslint-disable-next-line
	}, []);

	const { title, description, brand, images } = product || {};

	// console.log(product);
	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			{
				loading ? <h2>🌀 Loading....</h2> :
				<div>
					<section className='grid grid-cols-[50%_auto] gap-3 my-10'>
						<div className='col-span-1'>
							<Carousel images={images} />
						</div>
						<div className='col-span-1 mx-5 my-5'>
							<div className='text-gray-400 text-xs'>{brand}</div>
							<label className='text-2xl font-bold'>{title}</label>
							<div class='place-items-center my-2'>
								{star.map((index) => {
									return (
										<RatingIcon
											star={star}
											index={index}
											rating={rating}
											hoverRating={hoverRating}
											onMouseEnter={onMouseEnter}
											onMouseLeave={onMouseLeave}
											onSaveRating={onSaveRating}
											starClass='w-6 h-6 cursor-pointer border-gray-500 mx-auto'
										/>
									);
								})}
							</div>
							<p className='mb-5'>{description}</p>
							<ProductListItem data={product} />

							<button
								type='button'
								class='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								Add to Cart
							</button>
							<button
								type='button'
								class='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								Add to Wishlist
							</button>
							<button
								onClick={openModal}
								type='button'
								class='text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								Leave Rate
							</button>
						</div>
					</section>
					<section className='my-5'>Related Products</section>
					<Modal
						modalContainerClass='relative bg-white rounded-lg shadow-xl w-80 mx-auto'
						modalTitle='Rate'
						isOpen={modalOpen}
						onClose={closeModal}
					>
						<div class='place-items-center my-2'>
							{star.map((index) => {
								return (
									<RatingIcon
										star={star}
										index={index}
										rating={rating}
										hoverRating={hoverRating}
										onMouseEnter={onMouseEnter}
										onMouseLeave={onMouseLeave}
										onSaveRating={onSaveRating}
										starClass='w-12 h-12 cursor-pointer border-gray-500 mx-auto'
									/>
								);
							})}
						</div>
					</Modal>
				</div>}
		</div>
	);
};

export default ViewProduct;
