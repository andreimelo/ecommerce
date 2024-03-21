import React from 'react';
import './style.css';
import { NavLink, useLocation } from 'react-router-dom';
import { string } from '../../common/constants/strings';
import PropTypes from 'prop-types';

function Sidebar({ role }){
	const { pathname } = useLocation();
	const active = 'text-sm font-semibold';
	const inactive = 'text-sm text-gray-500';

	function isActiveLink(currentPath, staticPath){
		//@return boolean
		return currentPath === staticPath;
	}

	function renderSideBar(){
		switch (role) {
			case 'subscriber':
				return (
					<nav>
						<div>
							<NavLink
								to='/history'
								className={() =>

										isActiveLink(pathname, '/history') ? active :
										inactive}
							>
								{string.routes.historyTitle}
							</NavLink>
						</div>
						<div>
							<NavLink
								to='/user/change-password'
								className={() =>

										isActiveLink(
											pathname,
											'/user/change-password',
										) ? active :
										inactive}
							>
								{string.routes.changePasswordTitle}
							</NavLink>
						</div>
						<div>
							<NavLink
								to='/user/wishlist'
								className={() =>

										isActiveLink(
											pathname,
											'/user/wishlist',
										) ? active :
										inactive}
							>
								{string.routes.wishlistTitle}
							</NavLink>
						</div>
					</nav>
				);
			case 'admin':
				return (
					<nav>
						<div>
							<NavLink
								to='/'
								className={() =>

										isActiveLink(pathname, '/') ? active :
										inactive}
							>
								{string.routes.homeTitle}
							</NavLink>
						</div>
						<div>
							<NavLink
								to='/admin/product'
								className={() =>

										isActiveLink(
											pathname,
											'/admin/product',
										) ? active :
										inactive}
							>
								{string.routes.admin.productTitle}
							</NavLink>
						</div>
						<div>
							<NavLink
								to='/admin/products'
								className={() =>

										isActiveLink(
											pathname,
											'/admin/products',
										) ? active :
										inactive}
							>
								{string.routes.admin.productsTitle}
							</NavLink>
						</div>
						<div>
							<NavLink
								to='/admin/category'
								className={() =>

										isActiveLink(
											pathname,
											'/admin/category',
										) ? active :
										inactive}
							>
								{string.routes.admin.categoryTitle}
							</NavLink>
						</div>
						<div>
							<NavLink
								to='/admin/sub-category'
								className={() =>

										isActiveLink(
											pathname,
											'/admin/sub-category',
										) ? active :
										inactive}
							>
								{string.routes.admin.subCategoryTitle}
							</NavLink>
						</div>
						<div>
							<NavLink
								to='/admin/coupon'
								className={() =>

										isActiveLink(pathname, '/admin/coupon') ? active :
										inactive}
							>
								{string.routes.admin.couponTitle}
							</NavLink>
						</div>
						<div>
							<NavLink
								to='/admin/accounts'
								className={() =>

										isActiveLink(
											pathname,
											'/admin/accounts',
										) ? active :
										inactive}
							>
								{string.routes.admin.accountsTile}
							</NavLink>
						</div>
					</nav>
				);
			default:
				return null;
		}
	}
	return renderSideBar();
}

Sidebar.propTypes = {
	role : PropTypes.string.isRequired,
};

export default React.memo(Sidebar);
