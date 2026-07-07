import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { string } from '../../common/constants/strings';
import { images } from '../../../resources/images';
import PropTypes from 'prop-types';
import './style.css';
import { logOutAction } from '../../common/actions/authentication';
import icons from '../../../resources/icons';
import Profile from '../../components/Profile';
import SearchFilter from '../SearchFilter';

function Header({ role, imageURL }){
	const history = useHistory();
	const dispatch = useDispatch();
	const { user = {}, search = {}, cart = [] } = useSelector((state) => ({ ...state })) || {};
	const { text = '' } = search;
	const safeCart = Array.isArray(cart) ? cart : [];
	let totalCount = safeCart.reduce((acc, curr) => acc + (curr.count || 0), 0);

	async function handleSubmitSearch(e){
		e.preventDefault();
		history.push(`/shop?${text}`);
	}

	function renderRoleHeader(){
		switch (role) {
			case 'admin':
				return (
					<nav className='nav-container'>
						<div className='nav-sub-container w-full max-w-screen-xl mx-auto'>
							<div
								className='self-center text-2xl font-semibold whitespace-nowrap'
								id='logo'
								onClick={() => history.push('/')}
							>
								{/* {string.common.logoTitle} */}
								<img
									className='w-30 h-20 object-contain'
									alt='brandLogo'
									src={images['brandLogo']}
								/>
							</div>
							<div className='nav-link-container'>
								{user && (
									<div className='settings'>
										<div className='nav-title list'>
											{(user && <Profile imageURL={imageURL} />) ||
												(!user &&
													string.routes
														.userNamePlaceHolderTitle)}
										</div>
										<div
											className='settings-content bg-white border'
											onClick={() =>
												logOutAction(history, dispatch)}
										>
											{string.routes.logOutTitle}
										</div>
									</div>
								)}
							</div>
						</div>
					</nav>
				);
			case 'subscriber':
				return (
					<nav className='nav-container'>
						pepe
						<div className='nav-sub-container w-full max-w-screen-xl mx-auto'>
							<div
								className='self-center text-2xl font-semibold whitespace-nowrap'
								id='logo'
								onClick={() => history.push('/')}
							>
								{/* {string.common.logoTitle} */}
								<img
									className='w-30 h-20 object-contain'
									alt='brandLogo'
									src={images['brandLogo']}
								/>
							</div>
							{/* Input */}
							<form onSubmit={handleSubmitSearch}>
								<SearchFilter
									type='search'
									searchValue={text}
									placeHolder='Search'
									searchClass='mx-10'
									handleSearchFilterChange={(event) =>
										dispatch({
											type    : 'SEARCH_QUERY',
											payload : { text: event.target.value },
										})}
								/>
							</form>
							<div className='nav-link-container'>
								{/* <div
									className='nav-title'
									onClick={() => history.push('/shop')}
								>
									{icons['shop']}
								</div> */}
								<div
									className='nav-title relative flex'
									onClick={() => history.push('/cart')}
								>
									<li className='font-sans block mt-4 lg:inline-block lg:mt-0 align-middle text-black hover:text-gray-700'>
										{icons['cart']}
										{cart &&
										cart.length > 0 && (
											<span className='absolute text-xs left-8 bottom-3 rounded-full bg-red-600 top right p-1 m-0 text-white font-mono text-sm  leading-tight text-center'>
												{totalCount}
											</span>
										)}
									</li>
								</div>
								{user && (
									<div className='nav-link-container'>
										<div className='settings'>
											<div className='nav-title list'>
												{(user && (
													<Profile imageURL={imageURL} />
												)) ||
													(!user &&
														string.routes
															.userNamePlaceHolderTitle)}
											</div>
											<div className='w-full settings-content bg-white border'>
												<div
													onClick={() =>
														history.push('/user/profile')}
												>
													{' '}
													{string.routes.profileTitle}
												</div>
												<div
													onClick={() =>
														logOutAction(history, dispatch)}
												>
													{string.routes.logOutTitle}
												</div>
											</div>
										</div>
									</div>
								)}
								{!user && (
									<div>
										<div
											className='nav-title font-semibold text-sm'
											onClick={() => history.push('/login')}
										>
											{icons['login']}
										</div>
									</div>
								)}
							</div>
						</div>
					</nav>
				);
			default:
				return (
					<nav className='nav-container'>
						<div className='nav-sub-container w-full max-w-screen-xl mx-auto'>
							<div id='logo' onClick={() => history.push('/')}>
								{/* {string.common.logoTitle} */}
								<img
									className='w-30 h-20 object-contain'
									src={images['brandLogo']}
									alt='brandLogo'
								/>
							</div>
							<form onSubmit={handleSubmitSearch} >
									<SearchFilter
										type='search'
										searchValue={text}
										placeHolder='Search'
										searchClass='mx-5 rounded-lg overflow-hidden'
										handleSearchFilterChange={(event) =>
											dispatch({
												type    : 'SEARCH_QUERY',
												payload : { text: event.target.value },
											})}
									/>
								</form>
							<div className='nav-link-container'>
								{/* <div
									className='nav-title'
									onClick={() => history.push('/shop')}
								>
									{icons['shop']}
								</div> */}
								<div
									className='nav-title relative flex'
									onClick={() => history.push('/cart')}
								>
									<li className='font-sans block mt-4 lg:inline-block lg:mt-0 align-middle text-black hover:text-gray-700'>
										{icons['cart']}
										{cart &&
										cart.length > 0 && (
											<span className='absolute text-xs left-8 bottom-3 rounded-full bg-red-600 top right p-1 m-0 text-white font-mono text-sm  leading-tight text-center'>
												{totalCount}
											</span>
										)}
									</li>
								</div>
								{user && (
									<div className='settings'>
										<div className='nav-title list'>
											{(user && <Profile imageURL={imageURL} />) ||
												(!user &&
													string.routes
														.userNamePlaceHolderTitle)}
										</div>
										<div
											className='settings-content bg-white border'
											onClick={() =>
												logOutAction(history, dispatch)}
										>
											{string.routes.logOutTitle}
										</div>
									</div>
								)}
								{!user && (
									<div>
										<div
											className='nav-title font-semibold text-sm'
											onClick={() => history.push('/login')}
										>
											{icons['login']}
										</div>
									</div>
								)}
							</div>
						</div>
					</nav>
				);
		}
	}

	return renderRoleHeader();
}

Header.propTypes = {
	role     : PropTypes.string.isRequired,
	imageURL : PropTypes.string,
};

Header.defaultProps = {
	role     : '',
	imageURL : '',
};

export default React.memo(Header);
