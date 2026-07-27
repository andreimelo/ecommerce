export function startOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getTrend(currentValue, previousValue) {
	if (!previousValue && !currentValue) {
		return 0;
	}

	if (!previousValue) {
		return 100;
	}

	return ((currentValue - previousValue) / previousValue) * 100;
}

export function buildMonthlySeries(orders, accessor) {
	const now = new Date();
	const months = Array.from({ length: 6 }, (_, index) => {
		const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
		return {
			key: `${date.getFullYear()}-${date.getMonth()}`,
			label: date.toLocaleDateString('en-US', { month: 'short' }),
			value: 0,
		};
	});

	const monthMap = months.reduce((accumulator, month) => {
		accumulator[month.key] = month;
		return accumulator;
	}, {});

	orders.forEach((order) => {
		const createdAt = new Date(order.createdAt);
		const key = `${createdAt.getFullYear()}-${createdAt.getMonth()}`;
		if (monthMap[key]) {
			monthMap[key].value += accessor(order);
		}
	});

	return months;
}

export function getStatusBadgeColor(status) {
	const badgeColors = {
		'Not yet processed'        : 'bg-violet-50 text-violet-700',
		'Ongoing process'          : 'bg-sky-50 text-sky-700',
		'Order has been dispatched': 'bg-amber-50 text-amber-700',
		'Out for delivery'         : 'bg-cyan-50 text-cyan-700',
		'Order has been cancelled' : 'bg-rose-50 text-rose-700',
		'Order is completed'       : 'bg-emerald-50 text-emerald-700',
	};

	return badgeColors[status] || 'bg-slate-100 text-slate-700';
}
