import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SideBar from '../../../library/components/SideBar';
import PropTypes from 'prop-types';
import { getWishList, removeFromWishList } from '../../../library/services/user';
import Spinner from '../../../library/components/Spinner/Spinner';

function Wishlist({ role }){
	const [
		wishList,
		setWishList,
	] = useState([]);
	const [
		loading,
		setLoading,
	] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [brandFilter, setBrandFilter] = useState('all');
	const [sortBy, setSortBy] = useState('newest');
	const [page, setPage] = useState(1);
	const ITEMS_PER_PAGE = 6;
	const { user } = useSelector((state) => ({ ...state }));

	const brandOptions = useMemo(() => {
		const brandSet = new Set(
			wishList
				.map((item) => item.brand)
				.filter(Boolean),
		);

		return Array.from(brandSet).sort((a, b) => a.localeCompare(b));
	}, [wishList]);

	const filteredWishlist = useMemo(() => {
		const normalizedSearch = searchTerm.trim().toLowerCase();

		const filtered = wishList.filter((item) => {
			const title = (item.title || '').toLowerCase();
			const brand = (item.brand || '').toLowerCase();
			const matchesSearch = !normalizedSearch || title.includes(normalizedSearch) || brand.includes(normalizedSearch);
			const matchesBrand = brandFilter === 'all' || brand === brandFilter.toLowerCase();

			return matchesSearch && matchesBrand;
		});

		if (sortBy === 'price-low') {
			return [...filtered].sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
		}

		if (sortBy === 'price-high') {
			return [...filtered].sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
		}

		if (sortBy === 'title-az') {
			return [...filtered].sort((a, b) => (a.title || '').localeCompare(b.title || ''));
		}

		if (sortBy === 'title-za') {
			return [...filtered].sort((a, b) => (b.title || '').localeCompare(a.title || ''));
		}

		return filtered;
	}, [brandFilter, searchTerm, sortBy, wishList]);

	const totalPages = Math.max(1, Math.ceil(filteredWishlist.length / ITEMS_PER_PAGE));
	const paginatedWishlist = useMemo(() => {
		const start = (page - 1) * ITEMS_PER_PAGE;
		return filteredWishlist.slice(start, start + ITEMS_PER_PAGE);
	}, [filteredWishlist, page]);

	async function fetchWishlist(){
		try {
			setLoading(true);
			const result = await getWishList(user.token);
			if (result.ok) {
				setLoading(false);
				setWishList(result.wishlist);
			}
		} catch (error) {
			setLoading(false);
			alert(error);
		}
	}

	async function onRemoveWishList(productId, token){
		try {
			let confirmation = window.confirm(
				'Are sure you want to remove this from wishlist?',
			);
			if (confirmation) {
				const result = await removeFromWishList(productId, token);
				if (result.ok) {
					fetchWishlist();
					alert('Successfully remove from wishlist');
				}
			}
		} catch (error) {
			alert(error);
		}
	}
	useEffect(() => {
		fetchWishlist();
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		setPage(1);
	}, [searchTerm, brandFilter, sortBy]);

	useEffect(() => {
		if (page > totalPages) {
			setPage(totalPages);
		}
	}, [page, totalPages]);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10 max-[600px]:flex-col max-[600px]:items-baseline'>
				<div className='flex-none w-40 border-r border-gray-200 max-[600px]:border-none'>
					<SideBar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Wishlist</label>
					{loading ? <Spinner /> :
						<div className='my-6'>
							<div className='mb-4 grid gap-3 md:grid-cols-3'>
								<input
									type='text'
									value={searchTerm}
									onChange={(event) => setSearchTerm(event.target.value)}
									placeholder='Search by product or brand'
									className='rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400'
								/>
								<select
									value={brandFilter}
									onChange={(event) => setBrandFilter(event.target.value)}
									className='rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400'
								>
									<option value='all'>All brands</option>
									{brandOptions.map((brandName) => (
										<option key={brandName} value={brandName}>{brandName}</option>
									))}
								</select>
								<select
									value={sortBy}
									onChange={(event) => setSortBy(event.target.value)}
									className='rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-slate-400'
								>
									<option value='newest'>Default order</option>
									<option value='price-low'>Price: Low to High</option>
									<option value='price-high'>Price: High to Low</option>
									<option value='title-az'>Title: A to Z</option>
									<option value='title-za'>Title: Z to A</option>
								</select>
							</div>
							{filteredWishlist.length <= 0 && (
								<div className='rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500'>
									No wishlist items match your filters.
								</div>
							)}
							<div className='grid gap-4 md:grid-cols-2'>
								{paginatedWishlist.map((item) => (
									<div key={item._id} className='rounded-2xl border border-slate-200 bg-white p-4 shadow-sm'>
										<Link to={`/product/${item.slug}`} className='block'>
											{item.images?.[0]?.url ? (
												<img
													src={item.images[0].url}
													alt={item.title}
													className='h-40 w-full rounded-xl object-cover'
												/>
											) : (
												<div className='h-40 w-full rounded-xl bg-slate-100' />
											)}
											<div className='mt-3 text-lg font-semibold text-slate-900'>{item.title}</div>
											<div className='text-sm text-slate-500'>{item.brand || 'Brand unavailable'}</div>
											<div className='mt-2 text-sm font-semibold text-slate-800'>${item.price}</div>
										</Link>
										<div className='mt-4 flex justify-end'>
											<button
												type='button'
												onClick={() => onRemoveWishList(item._id, user.token)}
												className='rounded-full bg-rose-50 px-4 py-2 text-xs font-semibold text-rose-600'
											>
												Remove
											</button>
										</div>
									</div>
								))}
							</div>
							{filteredWishlist.length > ITEMS_PER_PAGE && (
								<div className='mt-4 flex items-center justify-end gap-2'>
									<button
										type='button'
										onClick={() => setPage((prev) => Math.max(1, prev - 1))}
										disabled={page === 1}
										className='rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 disabled:opacity-50'
									>
										Previous
									</button>
									<span className='text-xs text-slate-500'>Page {page} of {totalPages}</span>
									<button
										type='button'
										onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
										disabled={page === totalPages}
										className='rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-slate-700 disabled:opacity-50'
									>
										Next
									</button>
								</div>
							)}
						</div>}
				</div>
				{/*  */}
			</div>
		</div>
	);
}

Wishlist.propTypes = {
	role : PropTypes.string,
};

export default Wishlist;
