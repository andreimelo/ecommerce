import React from 'react';
import PropTypes from 'prop-types';

function DonutChart({ data }) {
	const total = data.reduce((sum, item) => sum + item.value, 0);
	if (!total) {
		return <div className='h-56 rounded-3xl border border-dashed border-slate-200 bg-slate-50' />;
	}

	let current = 0;
	const segments = data.map((item) => {
		const start = current;
		current += (item.value / total) * 100;
		return `${item.color} ${start}% ${current}%`;
	});

	return (
		<div className='flex flex-col gap-6 lg:flex-row lg:items-center'>
			<div
				className='relative mx-auto h-52 w-52 rounded-full'
				style={{ background: `conic-gradient(${segments.join(', ')})` }}
			>
				<div className='absolute inset-6 flex items-center justify-center rounded-full bg-white text-center shadow-inner'>
					<div>
						<div className='text-3xl font-semibold text-slate-900'>{total}</div>
						<div className='text-sm text-slate-500'>Products</div>
					</div>
				</div>
			</div>
			<div className='flex-1 space-y-4'>
				{data.map((item) => (
					<div key={item.label} className='flex items-center justify-between gap-4'>
						<div className='flex items-center gap-3'>
							<span className='h-3 w-3 rounded-full' style={{ backgroundColor: item.color }} />
							<span className='text-sm font-medium text-slate-700'>{item.label}</span>
						</div>
						<span className='text-sm text-slate-500'>
							{Math.round((item.value / total) * 100)}%
						</span>
					</div>
				))}
			</div>
		</div>
	);
}

DonutChart.propTypes = {
	data : PropTypes.arrayOf(PropTypes.shape({
		label : PropTypes.string,
		value : PropTypes.number,
		color : PropTypes.string,
	})).isRequired,
};

export default DonutChart;
