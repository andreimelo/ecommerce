import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
	getProductBySlug,
	putProductStarRating,
	deleteProductReview,
	getRelatedProducts,
} from '../../../library/services/product';
import { addToWishList } from '../../../library/services/user';
import { removeReviewImage, uploadReviewImage } from '../../../library/services/image';
import Carousel from '../../../library/components/Carousel';
import ProductListItem from './components/ProductListItem/ProductListItem';
import RatingIcon from '../../../library/components/RatingIcon';
import RatingModal from './components/RatingModal';
import RelatedProducts from './components/RelatedProducts';
import { useSelector, useDispatch } from 'react-redux';
import { showAverageRating, numberOfStar } from '../../../library/helpers/rating';
import { addToCart } from '../../../library/helpers/cart';
import { documentTitle } from '../../../library/helpers/tags';
import Spinner from '../../../library/components/Spinner/Spinner';
import Helmet from '../../../library/components/Helmet';
import Resizer from 'react-image-file-resizer';

const ViewProduct = ({ match }) => {
	const { slug } = match.params;
	const dispatch = useDispatch();
	const history = useHistory();
	const location = useLocation();
	const [
		modalOpen,
		setModalOpen,
	] = useState(false);
	const [
		product,
		setProduct,
	] = useState();
	const user = useSelector((item) => item.user);
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
	const [reviewComment, setReviewComment] = useState('');
	const [reviewImages, setReviewImages] = useState([]);
	const [submittingReview, setSubmittingReview] = useState(false);
	const [
		relatedProduct,
		setRelatedProduct,
	] = useState([]);
	const { average, length } = showAverageRating(product) || {};
	const { title, description, brand, images, _id, ratings, quantity } = product || {};
	const helmetTitle = documentTitle(`${title + ' - ' + brand}`) || '';
	const sortedReviews = useMemo(() => {
		if (!ratings || !ratings.length) {
			return [];
		}

		return [...ratings].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
	}, [ratings]);

	const currentUserId = useMemo(() => {
		if (!user?._id) {
			return '';
		}

		return user._id.toString();
	}, [user]);

	function getReviewOwnerId(review) {
		if (!review?.postedBy) {
			return '';
		}

		return typeof review.postedBy === 'string' ? review.postedBy : review.postedBy?._id;
	}

	function getReviewOwnerName(review) {
		if (!review?.postedBy) {
			return 'Customer';
		}

		if (typeof review.postedBy === 'string') {
			return getReviewOwnerId(review) === currentUserId && user?.name
				? user.name
				: 'Customer';
		}

		return review.postedBy.name || review.postedBy.email || 'Customer';
	}

	function getReviewDate(review) {
		if (!review?.createdAt) {
			return '';
		}

		return new Date(review.createdAt).toLocaleString();
	}

	async function fetchProductBySlug(){
		try {
			setLoading(true);
			const resultProductBySlug = await getProductBySlug(slug);
			setProduct(resultProductBySlug);
			if (resultProductBySlug && resultProductBySlug._id) {
				const result = await getRelatedProducts(resultProductBySlug._id);
				setRelatedProduct(result);
			}
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

	async function handleReviewImageUpload(event) {
		const files = event.target.files;
		if (!files || !user?.token) {
			return;
		}

		for (let index = 0; index < files.length; index += 1) {
			Resizer.imageFileResizer(
				files[index],
				720,
				720,
				'JPEG',
				90,
				0,
				async (uri) => {
					try {
						const result = await uploadReviewImage({ image: uri }, user.token);
						setReviewImages((prev) => [...prev, result]);
					} catch (error) {
						alert('Review image upload failed');
					}
				},
				'base64',
			);
		}
	}

	async function handleRemoveReviewImage(publicId) {
		if (!user?.token) {
			return;
		}

		try {
			await removeReviewImage(publicId, user.token);
			setReviewImages((prev) => prev.filter((item) => item.public_id !== publicId));
		} catch (error) {
			alert('Unable to remove review image right now.');
		}
	}

	async function handleSubmitReview() {
		if (!user?.token) {
			return;
		}

		if (!rating) {
			alert('Please select a star rating first.');
			return;
		}

		try {
			setSubmittingReview(true);
			await putProductStarRating(
				_id,
				{
					star    : rating,
					comment : reviewComment,
					images  : reviewImages,
				},
				user.token,
			);
			await fetchProductBySlug();
			setModalOpen(false);
			setReviewComment('');
			setReviewImages([]);
			alert('Your review has been saved.');
		} catch (error) {
			alert('Unable to save your review right now.');
		} finally {
			setSubmittingReview(false);
		}
	}

	async function handleDeleteReview() {
		if (!user?.token || !_id) {
			return;
		}

		const confirmed = window.confirm('Delete your review for this product?');
		if (!confirmed) {
			return;
		}

		try {
			setSubmittingReview(true);
			const result = await deleteProductReview(_id, user.token);
			if (!result?.ok) {
				throw new Error(result?.message || 'Unable to delete review right now.');
			}

			setRating(0);
			setReviewComment('');
			setReviewImages([]);
			await fetchProductBySlug();
			alert('Review deleted successfully.');
		} catch (error) {
			alert(error?.message || 'Unable to delete your review right now.');
		} finally {
			setSubmittingReview(false);
		}
	}

	function openModal(){
		if (user && user.token) {
			return setModalOpen(true);
		}
		return history.push({
			pathname : '/login',
			state    : {
				from : `/product/${slug}?review=1`,
			},
		});
	}
	async function saveToWishlist(productId, token){
		if (!token) {
			history.push({
				pathname : '/login',
				state    : {
					from : `/product/${slug}`,
				},
			});
			return;
		}

		try {
			const result = await addToWishList(productId, token);
			if (result.ok) {
				alert('Successfully added to wishlist');
			}
		} catch (error) {
			alert('Unable to add product to wishlist right now.');
		}
	}

	function closeModal(){
		setModalOpen(false);
	}

	useEffect(() => {
		fetchProductBySlug();
		// eslint-disable-next-line
	}, []);

	useEffect(
		() => {
			if (ratings && user?._id) {
				let existingRating = [...ratings]
					.find((item) => getReviewOwnerId(item) === user._id.toString());

				if (existingRating) {
					setRating(existingRating.star);
					setReviewComment(existingRating.comment || '');
					setReviewImages(existingRating.images || []);
				} else {
					setRating(0);
					setReviewComment('');
					setReviewImages([]);
				}
			}
		},
		[
			ratings,
			user,
		],
	);

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		const shouldOpenReview = params.get('review') === '1';

		if (shouldOpenReview && user?.token) {
			setModalOpen(true);
		}
	}, [location.search, user]);

	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			<Helmet title={helmetTitle} />
			{
				loading ? <Spinner /> :
				<div>
					{/* Mobile View - n refactor */}
					<section className='grid grid-cols-2 gap-3 max-[600px]:grid-cols-1 my-10'>
						<div className='col-span-1'>
							<Carousel images={images} />
						</div>
						<div className='col-span-1 mx-5 my-5'>
							<div className='text-gray-400 text-xs'>{brand}</div>
							<label className='text-2xl font-bold'>{title}</label>
							<div className='flex place-items-center my-2'>
								{numberOfStar.map((index) => {
									return <RatingIcon index={index} rating={average} />;
								})}
								<div>{length > 0 && ` (${length}) `}</div>
							</div>
							<p className='mb-5'>{description}</p>
							<ProductListItem data={product} />
							{
								quantity && quantity > 0 ? <button
									type='button'
									className='font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
									onClick={() => addToCart(product, dispatch)}
								>
									Add to Cart
								</button> :
								<span
									type='button'
									className='font-semibold text-white bg-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
								>
									Sold out
								</span>}
							<button
								type='button'
								className='font-semibold text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
								onClick={() => saveToWishlist(_id, user.token)}
							>
								Add to Wishlist
							</button>
							<button
								onClick={openModal}
								type='button'
								className='font-semibold text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
							>
								{
									user && user.token ? 'Leave Rate' :
									'Login to leave rating'}
							</button>
						</div>
					</section>
					<RelatedProducts
						data={relatedProduct}
						loading={loading}
						numberOfStar={numberOfStar}
						showAverageRating={showAverageRating}
					/>
					<section className='my-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm'>
						<div className='mb-4 flex items-center justify-between'>
							<h2 className='text-2xl font-semibold text-slate-900'>Customer Reviews</h2>
							<button
								type='button'
								onClick={openModal}
								className='rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white'
							>
								{user && user.token ? 'Write review' : 'Login to review'}
							</button>
						</div>
						{!sortedReviews.length && (
							<div className='rounded-xl bg-slate-50 px-4 py-5 text-sm text-slate-500'>No reviews yet. Be the first to review this product.</div>
						)}
						<div className='space-y-4'>
							{sortedReviews.map((item, index) => {
								const ownerId = getReviewOwnerId(item);
								const isCurrentUserReview = ownerId && ownerId === currentUserId;
								const reviewerName = getReviewOwnerName(item);
								const submittedOn = getReviewDate(item);

								return (
									<div key={`${item.postedBy}-${index}`} className='rounded-xl border border-slate-200 p-4'>
										<div className='mb-2 flex items-center justify-between'>
											<div className='text-sm font-semibold text-slate-800'>{reviewerName}</div>
											{submittedOn && <div className='text-xs text-slate-500'>Submitted on {submittedOn}</div>}
										</div>
									<div className='flex items-center justify-between gap-2'>
										<div className='flex items-center gap-2'>
										{numberOfStar.map((starItem) => (
											<span key={`${item.postedBy}-${index}-${starItem}`}>
												<RatingIcon
													index={starItem}
													rating={item.star}
													onMouseEnter={() => {}}
													onMouseLeave={() => {}}
													onSaveRating={() => {}}
													starClass='w-5 h-5'
												/>
											</span>
										))}
										</div>
										{isCurrentUserReview && (
											<div className='flex items-center gap-2'>
												<button
													type='button'
													onClick={() => {
														setRating(item.star || 0);
														setReviewComment(item.comment || '');
														setReviewImages(item.images || []);
														setModalOpen(true);
													}}
													className='rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'
												>
													Edit
												</button>
												<button
													type='button'
													onClick={handleDeleteReview}
													className='rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600'
												>
													Delete
												</button>
											</div>
										)}
									</div>
									{item.comment && <p className='mt-2 text-sm text-slate-600'>{item.comment}</p>}
									{item.images && item.images.length > 0 && (
										<div className='mt-3 grid grid-cols-4 gap-2'>
											{item.images.map((image) => (
												<img
													key={image.public_id || image.url}
													src={image.url}
													alt='review'
													className='h-16 w-full rounded-lg object-cover'
												/>
											))}
										</div>
									)}
									</div>
								);
							})}
						</div>
					</section>
					<RatingModal
						id={_id}
						star={numberOfStar}
						rating={rating}
						hoverRating={hoverRating}
						onMouseEnter={onMouseEnter}
						onMouseLeave={onMouseLeave}
						onSaveRating={onSaveRating}
						onSubmitReview={handleSubmitReview}
						comment={reviewComment}
						onCommentChange={setReviewComment}
						reviewImages={reviewImages}
						onRemoveImage={handleRemoveReviewImage}
						onFileUpload={handleReviewImageUpload}
						submitting={submittingReview}
						modalOpen={modalOpen}
						closeModal={closeModal}
					/>
				</div>}
		</div>
	);
};

export default ViewProduct;
