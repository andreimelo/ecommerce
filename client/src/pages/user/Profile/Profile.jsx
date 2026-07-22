import React, { useEffect, useState } from 'react';
import SideBar from '../../../library/components/SideBar';
import { useSelector } from 'react-redux';
import { getUserProfile, updateUserProfile, getNavLocation } from '../../../library/services/user';
import Spinner from '../../../library/components/Spinner/Spinner';
import icons from '../../../resources/icons';

const Profile = ({ role }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [values, setValues] = useState({
		name     : '',
		email    : '',
		address1 : '',
		address2 : '',
		state    : '',
		city     : '',
		zip_code : '',
	});

	function handleChange(name, value) {
		setValues((prev) => ({
			...prev,
			[name] : value,
		}));
	}

	async function fetchProfile() {
		try {
			setLoading(true);
			const result = await getUserProfile(user.token);
			if (!result?.ok || !result.user) {
				throw new Error(result?.message || 'Unable to load your profile right now.');
			}

			setValues({
				name     : result.user.name || '',
				email    : result.user.email || '',
				address1 : result.user.address1 || '',
				address2 : result.user.address2 || '',
				state    : result.user.state || '',
				city     : result.user.city || '',
				zip_code : result.user.zip_code || '',
			});
		} catch (error) {
			alert(error?.message || 'Unable to load your profile right now.');
		} finally {
			setLoading(false);
		}
	}

	async function handleSubmit(event) {
		event.preventDefault();
		try {
			setSaving(true);
			const result = await updateUserProfile(
				{
					name     : values.name,
					address1 : values.address1,
					address2 : values.address2,
					state    : values.state,
					city     : values.city,
					zip_code : values.zip_code,
				},
				user.token,
			);

			if (!result?.ok) {
				throw new Error(result?.message || 'Update failed');
			}

			alert('Profile updated successfully.');
		} catch (error) {
			alert(error?.message || 'Unable to update your profile right now.');
		} finally {
			setSaving(false);
		}
	}

	const getCurrentLocation = (e) => {
		e.preventDefault();
		if (!navigator.geolocation) {
		alert("Geolocation is not supported.");
		return;
		}

		 navigator.geolocation.getCurrentPosition(async (position)=>{

		const {latitude, longitude} = position.coords;

		const data = await getNavLocation(latitude, longitude);

		setValues({
				address2 : data.address.suburb || '',
				state    : data.address.state || '',
				city     : data.address.city || data.address.town || data.address.village || '',
				zip_code : data.address.postcode || '',
			});
 });
	};

	useEffect(() => {
		if (user?.token) {
			fetchProfile();
		}
		// eslint-disable-next-line
	}, [user?.token]);

	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex my-10 max-[600px]:flex-col max-[600px]:items-baseline'>
				<div className='flex-none w-40 border-r border-gray-200 max-[600px]:border-none'>
					<SideBar role={role} />
				</div>
				<div className='flex-auto w-64 mx-10'>
					<label className='text-2xl font-semibold'>Profile</label>
					<p className='text-sm text-slate-500 mt-2'>Manage your personal and shipping details.</p>
					{loading ? (
						<div className='mt-8'>
							<Spinner />
						</div>
					) : (
						<form onSubmit={handleSubmit} className='mt-6 grid gap-4 md:grid-cols-2'>
							<div className='md:col-span-2'>
								<label className='block text-sm font-semibold text-slate-600 mb-1'>Email</label>
								<input
									type='email'
									value={values.email}
									disabled
									className='w-full rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-slate-500'
								/>
							</div>
							<div className='md:col-span-2'>
								<label className='block text-sm font-semibold text-slate-600 mb-1'>Full Name</label>
								<input
									type='text'
									value={values.name}
									onChange={(event) => handleChange('name', event.target.value)}
									className='w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-700 outline-none focus:border-slate-400'
								/>
							</div>
							<div className='md:col-span-2'>
								<label className='block text-sm font-semibold text-slate-600 mb-1'>Address Line 1</label>
								<input
									type='text'
									value={values.address1}
									onChange={(event) => handleChange('address1', event.target.value)}
									className='w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-700 outline-none focus:border-slate-400'
								/>
							</div>
							<div className='md:col-span-2'>
								<label className='block text-sm font-semibold text-slate-600 mb-1'>Address Line 2</label>
								<input
									type='text'
									value={values.address2}
									onChange={(event) => handleChange('address2', event.target.value)}
									className='w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-700 outline-none focus:border-slate-400'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-600 mb-1'>City</label>
								<input
									type='text'
									value={values.city}
									onChange={(event) => handleChange('city', event.target.value)}
									className='w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-700 outline-none focus:border-slate-400'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-600 mb-1'>State</label>
								<input
									type='text'
									value={values.state}
									onChange={(event) => handleChange('state', event.target.value)}
									className='w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-700 outline-none focus:border-slate-400'
								/>
							</div>
							<div>
								<label className='block text-sm font-semibold text-slate-600 mb-1'>Zip Code</label>
								<div className='flex justify-between items-center'>
									<input
										type='text'
										value={values.zip_code}
										onChange={(event) => handleChange('zip_code', event.target.value)}
										className='w-full rounded-lg border border-slate-200 px-4 py-2 text-slate-700 outline-none focus:border-slate-400'
									/>
									<button onClick={(e) => getCurrentLocation(e)} className='rounded-full bg-slate-900 mx-3 px-3 py-3 text-sm font-semibold text-white'>{icons['target']}</button>
								</div>
							</div>
							<div className='md:col-span-2'>
								<button
									type='submit'
									disabled={saving}
									className='rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white disabled:opacity-50'
								>
									{saving ? 'Saving...' : 'Save profile'}
								</button>
							</div>
						</form>
					)}
				</div>
			</div>
		</div>
	);
};

export default Profile;
