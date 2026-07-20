import React from 'react';
import './style.css';
import { NavLink, useLocation } from 'react-router-dom';
import { string } from '../../common/constants/strings';
import PropTypes from 'prop-types';

const NAV_ICONS = {
	home       : (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' className='h-4 w-4'>
			<path strokeLinecap='round' strokeLinejoin='round' d='M3 11.5 12 4l9 7.5V20a1 1 0 0 1-1 1h-5.5v-6h-5v6H4a1 1 0 0 1-1-1v-8.5Z' />
		</svg>
	),
	products   : (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' className='h-4 w-4'>
			<path strokeLinecap='round' strokeLinejoin='round' d='M4 7.5 12 3l8 4.5-8 4.5L4 7.5Z' />
			<path strokeLinecap='round' strokeLinejoin='round' d='M4 7.5V16.5L12 21l8-4.5V7.5' />
			<path strokeLinecap='round' strokeLinejoin='round' d='M12 12v9' />
		</svg>
	),
	category   : (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' className='h-4 w-4'>
			<rect x='4' y='4' width='6' height='6' rx='1.5' />
			<rect x='14' y='4' width='6' height='6' rx='1.5' />
			<rect x='4' y='14' width='6' height='6' rx='1.5' />
			<rect x='14' y='14' width='6' height='6' rx='1.5' />
		</svg>
	),
	subCategory: (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' className='h-4 w-4'>
			<path strokeLinecap='round' strokeLinejoin='round' d='M7 6h10M7 12h10M7 18h10' />
			<circle cx='5' cy='6' r='1' fill='currentColor' stroke='none' />
			<circle cx='5' cy='12' r='1' fill='currentColor' stroke='none' />
			<circle cx='5' cy='18' r='1' fill='currentColor' stroke='none' />
		</svg>
	),
	coupon     : (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' className='h-4 w-4'>
			<path strokeLinecap='round' strokeLinejoin='round' d='M8 4h8l5 5v7l-5 5H8l-5-5V9l5-5Z' />
			<path strokeLinecap='round' strokeLinejoin='round' d='M9 12h6' />
			<circle cx='9' cy='9' r='1' fill='currentColor' stroke='none' />
			<circle cx='15' cy='15' r='1' fill='currentColor' stroke='none' />
		</svg>
	),
	accounts   : (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' className='h-4 w-4'>
			<path strokeLinecap='round' strokeLinejoin='round' d='M16 19a4 4 0 0 0-8 0' />
			<circle cx='12' cy='10' r='3' />
			<path strokeLinecap='round' strokeLinejoin='round' d='M5 19h14' />
		</svg>
	),
};

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
					{NAV_ICONS[iconKey] || shortLabel}
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
							{renderLink('/', string.routes.homeTitle, 'H', 'home')}
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
