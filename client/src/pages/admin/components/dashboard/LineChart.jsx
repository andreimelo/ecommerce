import React from 'react';
import PropTypes from 'prop-types';

function LineChart({ data, color, fillColor, valueFormatter }) {
	if (!data.length) {
		return <div className='h-40 rounded-3xl border border-dashed border-slate-200 bg-slate-50' />;
	}

	const width = 100;
	const height = 50;
	const maxValue = Math.max(...data.map((item) => item.value), 1);
	const points = data.map((item, index) => {
		const x = (index / Math.max(data.length - 1, 1)) * width;
		const y = height - (item.value / maxValue) * (height - 6) - 3;
		return `${x},${y}`;
	}).join(' ');
	const areaPoints = `0,${height} ${points} ${width},${height}`;

	return (
		<div>
			<div className='mb-4 flex items-end justify-between'>
				<div className='text-sm text-slate-500'>Last 6 months</div>
				<div className='text-sm font-semibold text-slate-700'>
					{valueFormatter(data[data.length - 1]?.value || 0)}
				</div>
			</div>
			<svg viewBox='0 0 100 50' className='h-40 w-full'>
				<defs>
					<linearGradient id={`gradient-${color.replace('#', '')}`} x1='0' x2='0' y1='0' y2='1'>
						<stop offset='0%' stopColor={fillColor} stopOpacity='0.45' />
						<stop offset='100%' stopColor={fillColor} stopOpacity='0.03' />
					</linearGradient>
				</defs>
				<polyline
					fill={`url(#gradient-${color.replace('#', '')})`}
					stroke='none'
					points={areaPoints}
				/>
				<polyline
					fill='none'
					stroke={color}
					strokeWidth='2.4'
					strokeLinejoin='round'
					strokeLinecap='round'
					points={points}
				/>
				{data.map((item, index) => {
					const x = (index / Math.max(data.length - 1, 1)) * width;
					const y = height - (item.value / maxValue) * (height - 6) - 3;
					return <circle key={item.label} cx={x} cy={y} r='1.7' fill={color} />;
				})}
			</svg>
			<div className='mt-2 grid grid-cols-6 text-xs text-slate-400'>
				{data.map((item) => (
					<div key={item.label}>{item.label}</div>
				))}
			</div>
		</div>
	);
}

LineChart.propTypes = {
	data           : PropTypes.arrayOf(PropTypes.shape({
		label : PropTypes.string,
		value : PropTypes.number,
	})).isRequired,
	color          : PropTypes.string.isRequired,
	fillColor      : PropTypes.string.isRequired,
	valueFormatter : PropTypes.func,
};

LineChart.defaultProps = {
	valueFormatter : (value) => value,
};

export default LineChart;
