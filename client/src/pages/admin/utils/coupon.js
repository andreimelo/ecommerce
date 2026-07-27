export const INITIAL_COUPON_VALUES = {
	name     : '',
	discount : '',
	expiry   : '',
};

export function formatDateForInput(value) {
	if (!value) {
		return '';
	}

	return new Date(value).toISOString().slice(0, 10);
}

export function formatDateForTable(value) {
	if (!value) {
		return '--';
	}

	return new Date(value).toLocaleDateString('en-US', {
		month : 'short',
		day   : 'numeric',
		year  : 'numeric',
	});
}
