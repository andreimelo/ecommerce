import React, { useState, useEffect } from 'react';
import Sidebar from '../../../library/components/SideBar';
import { getUserAccounts } from '../../../library/services/user';
import { useSelector } from 'react-redux';
import Spinner from '../../../library/components/Spinner/Spinner';

const Accounts = ({ role }) => {
	const [
		accounts,
		setAccounts,
	] = useState('');
	const [
		loading,
		setLoading,
	] = useState(false);
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

	useEffect(() => {
		fetchUserAccounts();
		// eslint-disable-next-line
	}, []);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10 max-[600px]:flex-col max-[600px]:items-baseline'>
				<div class='flex-none w-40 border-r border-gray-200 max-[600px]:border-none'>
					<Sidebar role={role} />
				</div>
				<div class='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Accounts</label>
					{/* will refactor */}
					{
						loading ? <h2 className='my-10'>
							<Spinner />
						</h2> :
						<div className='relative overflow-x-auto shadow-md sm:rounded-lg mt-5'>
							<table className='w-full text-sm text-left rtl:text-right  bg-gray-100'>
								<thead className='text-xs text-white uppercase bg-gray-900 dark:text-white'>
									<tr>
										<th scope='col' class='px-6 py-3'>
											Name
										</th>
										<th scope='col' class='px-6 py-3'>
											Email Address
										</th>
										<th scope='col' class='px-6 py-3'>
											Role
										</th>
										<th scope='col' class='px-6 py-3'>
											Action
										</th>
									</tr>
								</thead>
								<tbody>
									{accounts &&
										accounts.map((item) => (
											<tr className='text-gray-600'>
												<th
													scope='row'
													className='px-6 py-4 font-medium text-gray-600 whitespace-nowrap'
												>
													{item.name}
												</th>
												<td className='px-6 py-4'>
													{item.email}
												</td>
												<td className='px-6 py-4'>{item.role}</td>
												<td className='px-6 py-4'>Edit</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>}
					{/*  */}
				</div>
			</div>
		</div>
	);
};

export default Accounts;
