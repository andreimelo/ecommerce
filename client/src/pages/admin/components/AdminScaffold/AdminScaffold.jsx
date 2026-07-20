import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../../../../library/components/SideBar';

const ADMIN_SIDEBAR_COLLAPSED_KEY = 'admin.sidebar.collapsed';

export function AdminShell({ role, title, description, actions, children }) {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
		if (typeof window === 'undefined') {
			return false;
		}

		return window.localStorage.getItem(ADMIN_SIDEBAR_COLLAPSED_KEY) === 'true';
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(ADMIN_SIDEBAR_COLLAPSED_KEY, String(sidebarCollapsed));
		}
	}, [sidebarCollapsed]);

	function handleSidebarToggle() {
		setSidebarCollapsed((currentCollapsed) => {
			const nextCollapsed = !currentCollapsed;
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(ADMIN_SIDEBAR_COLLAPSED_KEY, String(nextCollapsed));
			}
			return nextCollapsed;
		});
	}

	return (
		<div className='w-full bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)]'>
			<div className='mx-auto flex w-full max-w-screen-[1680px] gap-6 px-4 py-8 max-[900px]:flex-col md:px-6'>
				<div className={`flex-none transition-all duration-300 ${sidebarCollapsed ? 'md:w-24' : 'md:w-[310px]'}`}>
					<div className='sticky top-24 rounded-[32px] border border-slate-200 bg-white p-4 shadow-[0_30px_70px_-45px_rgba(15,23,42,0.42)]'>
						<Sidebar
							role={role}
							collapsed={sidebarCollapsed}
							onToggle={handleSidebarToggle}
						/>
					</div>
				</div>
				<div className='min-w-0 flex-1 overflow-hidden'>
					<div className='mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between'>
						<div>
							<div className='text-sm font-semibold uppercase tracking-[0.28em] text-slate-400'>Admin workspace</div>
							<h1 className='mt-2 text-4xl font-semibold tracking-tight text-slate-950'>{title}</h1>
							{description && <p className='mt-3 max-w-3xl text-sm leading-6 text-slate-500'>{description}</p>}
						</div>
						{actions && <div className='flex flex-wrap gap-3'>{actions}</div>}
					</div>
					{children}
				</div>
			</div>
		</div>
	);
}

AdminShell.propTypes = {
	role        : PropTypes.string,
	title       : PropTypes.string.isRequired,
	description : PropTypes.string,
	actions     : PropTypes.node,
	children    : PropTypes.node.isRequired,
};

AdminShell.defaultProps = {
	role        : '',
	description : '',
	actions     : null,
};

export function AdminPanel({ title, action, children, className }) {
	return (
		<section className={`rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur ${className}`}>
			{title && (
				<div className='mb-6 flex items-center justify-between gap-4'>
					<h2 className='text-lg font-semibold text-slate-900'>{title}</h2>
					{action}
				</div>
			)}
			{children}
		</section>
	);
}

AdminPanel.propTypes = {
	title     : PropTypes.string,
	action    : PropTypes.node,
	children  : PropTypes.node.isRequired,
	className : PropTypes.string,
};

AdminPanel.defaultProps = {
	title     : '',
	action    : null,
	className : '',
};

export function AdminDataTable({ children, className }) {
	return (
		<div className={`overflow-x-auto ${className}`}>
			<table className='w-full min-w-[680px] border-separate border-spacing-y-3'>
				{children}
			</table>
		</div>
	);
}

AdminDataTable.propTypes = {
	children  : PropTypes.node.isRequired,
	className : PropTypes.string,
};

AdminDataTable.defaultProps = {
	className : '',
};

export function AdminBadge({ children, tone }) {
	const tones = {
		default : 'bg-slate-100 text-slate-600',
		green   : 'bg-emerald-50 text-emerald-700',
		red     : 'bg-rose-50 text-rose-700',
		blue    : 'bg-sky-50 text-sky-700',
		amber   : 'bg-amber-50 text-amber-700',
	};

	return (
		<span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone] || tones.default}`}>
			{children}
		</span>
	);
}

AdminBadge.propTypes = {
	children : PropTypes.node.isRequired,
	tone     : PropTypes.string,
};

AdminBadge.defaultProps = {
	tone : 'default',
};