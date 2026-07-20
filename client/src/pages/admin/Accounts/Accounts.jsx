import React, { useEffect, useMemo, useState } from 'react';
import { getUserAccounts } from '../../../library/services/user';
import { useSelector } from 'react-redux';
import Spinner from '../../../library/components/Spinner/Spinner';
import SearchFilter from '../../../library/components/SearchFilter';
import { deleteUserAccount, updateUserAccount } from '../../../library/services/admin';
import { AdminBadge, AdminDataTable, AdminPanel, AdminShell } from '../components/AdminScaffold';
import { filterAccounts, ROLE_OPTIONS } from '../utils/accounts';

const Accounts = ({ role }) => {
	const [accounts, setAccounts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [updatingUserId, setUpdatingUserId] = useState('');
	const [deletingUserId, setDeletingUserId] = useState('');
	const user = useSelector((state) => state.user);

	async function fetchUserAccounts(){
		try {
			setLoading(true);
			const result = await getUserAccounts(user.token);
			setAccounts(result);
			setLoading(false);
		} catch (error) {
			alert(error);
			setLoading(false);
		}
	}
	async function handleRoleChange(account, nextRole) {
		if (!account?._id || account.role === nextRole) {
			return;
		}

		try {
			setUpdatingUserId(account._id);
			const result = await updateUserAccount(
				account._id,
				{
					name  : account.name,
					email : account.email,
					role  : nextRole,
				},
				user.token,
			);

			if (result?.error || result?.message === 'User not found') {
				throw new Error(result?.error || result?.message);
			}

			if (result?.user) {
				setAccounts((prevAccounts) => prevAccounts.map((item) => (
					item._id === account._id ? result.user : item
				)));
			}
		} catch (error) {
			alert(error?.message || error);
		} finally {
			setUpdatingUserId('');
		}
	}

	async function handleDeleteAccount(account) {
		if (!account?._id) {
			return;
		}

		if (account._id === user._id) {
			alert('You cannot delete the current signed-in account.');
			return;
		}

		const confirmed = window.confirm(`Delete ${account.name || account.email}?`);
		if (!confirmed) {
			return;
		}

		try {
			setDeletingUserId(account._id);
			const result = await deleteUserAccount(account._id, user.token);

			if (result?.error || result?.message === 'User not found' || result?.message === 'You cannot delete the current signed-in account.') {
				throw new Error(result?.error || result?.message);
			}

			if (result?.user) {
				setAccounts((prevAccounts) => prevAccounts.filter((item) => item._id !== account._id));
				return;
			}

			throw new Error('Unable to delete this account right now.');
		} catch (error) {
			alert(error?.message || error);
		} finally {
			setDeletingUserId('');
		}
	}

	function handleSearchFilterChange(event) {
		setSearch(event.target.value.toLowerCase());
	}

	const filteredAccounts = useMemo(() => filterAccounts(accounts, search), [accounts, search]);

	useEffect(() => {
		fetchUserAccounts();
		// eslint-disable-next-line
	}, []);

	return (
		<AdminShell
			role={role}
			title='Accounts'
			description='Manage customer access roles and review account activity from a cleaner table view.'
			actions={
				<AdminBadge tone='blue'>
					{accounts.length} total accounts
				</AdminBadge>
			}
		>
			<AdminPanel title='Account Directory'>
				<div className='mb-6 grid gap-4 lg:grid-cols-[1fr_auto]'>
					<SearchFilter
						searchValue={search}
						handleSearchFilterChange={handleSearchFilterChange}
						showButton={false}
						placeHolder='Search name, email, or role'
						searchClass='w-full'
					/>
					<AdminBadge tone='green'>{filteredAccounts.length} visible</AdminBadge>
				</div>
				{loading ? (
					<div className='py-10 text-center'>
						<Spinner />
					</div>
				) : (
					<AdminDataTable>
						<thead>
							<tr className='text-left text-xs font-semibold uppercase tracking-[0.18em] text-slate-400'>
								<th className='px-4 py-2'>Name</th>
								<th className='px-4 py-2'>Email Address</th>
								<th className='px-4 py-2'>Access Role</th>
								<th className='px-4 py-2'>Joined</th>
								<th className='px-4 py-2'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{filteredAccounts.map((item) => (
								<tr key={item._id} className='bg-slate-50 text-sm text-slate-600 shadow-sm'>
									<td className='rounded-l-3xl px-4 py-4 font-semibold text-slate-800'>{item.name || 'Unnamed user'}</td>
									<td className='px-4 py-4'>{item.email}</td>
									<td className='px-4 py-4'>
										<select
											value={item.role || 'subscriber'}
											disabled={updatingUserId === item._id}
											onChange={(event) => handleRoleChange(item, event.target.value)}
											className='rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 outline-none focus:border-slate-400'
										>
											{ROLE_OPTIONS.map((option) => (
												<option key={option} value={option}>{option}</option>
											))}
										</select>
									</td>
									<td className='px-4 py-4 text-sm text-slate-500'>
										{item.createdAt ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '--'}
									</td>
									<td className='rounded-r-3xl px-4 py-4'>
										<button
											type='button'
											disabled={item._id === user._id || deletingUserId === item._id}
											onClick={() => handleDeleteAccount(item)}
											className='rounded-full bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 disabled:cursor-not-allowed disabled:opacity-50'
										>
											{item._id === user._id ? 'Current user' : deletingUserId === item._id ? 'Deleting...' : 'Delete'}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</AdminDataTable>
				)}
			</AdminPanel>
		</AdminShell>
	);
};

export default Accounts;
