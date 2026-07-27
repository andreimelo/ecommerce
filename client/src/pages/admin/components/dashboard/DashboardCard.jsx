import React from 'react';
import PropTypes from 'prop-types';
import { formatPercent } from '../../utils/dashboardFormatters';

function DashboardCard({ title, value, accent, trend, icon }) {
	const isPositive = trend >= 0;
	return (
		<div className={`rounded-[28px] border bg-white/90 p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.32)] backdrop-blur ${accent}`}>
			<div className='flex items-start justify-between gap-4'>
				<div>
					<div className='text-sm font-medium text-slate-500'>{title}</div>
					<div className='mt-2 text-3xl font-semibold tracking-tight text-slate-900'>{value}</div>
					<div className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${isPositive ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
						{formatPercent(trend)} this month
					</div>
				</div>
				<div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-white/90 text-slate-700 shadow-sm'>
					{icon}
				</div>
			</div>
		</div>
	);
}

DashboardCard.propTypes = {
	title  : PropTypes.string.isRequired,
	value  : PropTypes.string.isRequired,
	accent : PropTypes.string.isRequired,
	trend  : PropTypes.number.isRequired,
	icon   : PropTypes.node.isRequired,
};

export default DashboardCard;
