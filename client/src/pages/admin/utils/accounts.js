export const ROLE_OPTIONS = [
	'admin',
	'subscriber',
];

export function filterAccounts(accounts, searchValue) {
	return accounts.filter((item) => {
		const name = item.name?.toLowerCase() || '';
		const email = item.email?.toLowerCase() || '';
		const accessRole = item.role?.toLowerCase() || '';
		return name.includes(searchValue) || email.includes(searchValue) || accessRole.includes(searchValue);
	});
}
