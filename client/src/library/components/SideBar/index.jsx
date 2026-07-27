import React from 'react';
import './style.css';
import { NavLink, useLocation } from 'react-router-dom';
import { string } from '../../common/constants/strings';
import PropTypes from 'prop-types';
import icons from '../../../resources/icons';

function Sidebar({ role, collapsed, onToggle }){
	const { pathname } = useLocation();
	const baseLinkClass = 'group flex items-center gap-3 rounded-[20px] px-3 py-3 text-sm transition';
	const active = `${baseLinkClass} bg-slate-900 text-white shadow-[0_20px_45px_-28px_rgba(15,23,42,0.65)] hover:text-white visited:text-white focus:text-white`;
	const inactive = `${baseLinkClass} text-slate-500 hover:bg-slate-100 hover:text-slate-900`;

	function isActiveLink(currentPath, staticPath){
		if (staticPath === '/') {
			return currentPath === '/';
		}

		return currentPath === staticPath || currentPath.startsWith(`${staticPath}/`);
	}

	function renderLink(to, label, shortLabel, iconKey) {
		const selected = isActiveLink(pathname, to);
		return (
			<NavLink
				to={to}
				className={() => (selected ? active : inactive)}
				style={{ color: selected ? '#ffffff' : undefined }}
				title={collapsed ? label : undefined}
			>
				<span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${selected ? 'bg-white/12 text-white group-hover:text-white' : 'bg-slate-100 text-slate-600 group-hover:bg-white group-hover:text-slate-700'}`}>
					{icons[iconKey] || shortLabel}
				</span>
				{!collapsed && <span className={`truncate text-[15px] font-medium ${selected ? 'text-white' : 'text-slate-500 group-hover:text-slate-900'}`}>{label}</span>}
			</NavLink>
		);
	}

	function renderSideBar(){
		switch (role) {
			case 'subscriber':
				return (
					<nav className='space-y-2'>
						{renderLink('/user/profile', string.routes.profileTitle, 'P', 'accounts')}
						{renderLink('/user/orders', string.routes.ordersTitle, 'O', 'products')}
						{renderLink('/user/wishlist', string.routes.wishlistTitle, 'W', 'coupon')}
					</nav>
				);
			case 'admin':
				return (
					<div className='flex h-full flex-col'>
						<div className={`mb-3 flex items-center ${collapsed ? 'justify-center' : 'justify-between'} gap-3`}>
							<button
								type='button'
								onClick={onToggle}
								className='flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-500 transition hover:border-slate-300 hover:text-slate-900'
								aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
							>
								<span className='space-y-1'>
									<span className='block h-0.5 w-4 rounded bg-current' />
									<span className='block h-0.5 w-4 rounded bg-current' />
									<span className='block h-0.5 w-4 rounded bg-current' />
								</span>
							</button>
						</div>
						<nav className='space-y-2'>
							{renderLink('/', string.routes.homeTitle, 'H', 'home_admin')}
							{renderLink('/admin/products', string.routes.admin.productsTitle, 'P', 'products')}
							{renderLink('/admin/category', string.routes.admin.categoryTitle, 'C', 'category')}
							{renderLink('/admin/sub-category', string.routes.admin.subCategoryTitle, 'S', 'subCategory')}
							{renderLink('/admin/coupon', string.routes.admin.couponTitle, 'Q', 'coupon')}
							{renderLink('/admin/accounts', string.routes.admin.accountsTile, 'A', 'accounts')}
						</nav>
						{!collapsed && (
							<div className='mt-8 rounded-[24px] border border-slate-200 bg-slate-50 p-4'>
								<div className='text-sm font-semibold text-slate-900'>Admin tools</div>
								<p className='mt-2 text-xs leading-5 text-slate-500'>Switch between products, coupons, and account management without leaving the workspace.</p>
							</div>
						)}
					</div>
				);
			default:
				return null;
		}
	}
	return renderSideBar();
}

Sidebar.propTypes = {
	role      : PropTypes.string.isRequired,
	collapsed : PropTypes.bool,
	onToggle  : PropTypes.func,
};

Sidebar.defaultProps = {
	collapsed : false,
	onToggle  : () => {},
};

export default React.memo(Sidebar);
