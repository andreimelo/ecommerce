export function formatCurrency(value) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		maximumFractionDigits: 0,
	}).format(value || 0);
}

export function formatPercent(value) {
	const prefix = value >= 0 ? '+' : '';
	return `${prefix}${value.toFixed(1)}%`;
}

export function formatShortDate(dateValue) {
	if (!dateValue) {
		return '--';
	}

	return new Date(dateValue).toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});
}

export function formatTime(dateValue) {
	if (!dateValue) {
		return '--';
	}

	return new Date(dateValue).toLocaleTimeString('en-US', {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});
}
