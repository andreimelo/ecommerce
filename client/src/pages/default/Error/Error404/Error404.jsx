import React from 'react';
import { useHistory } from 'react-router-dom';

function Error404({role}){
	const history = useHistory();
	const isAdmin = role === 'admin';
	return(
		<div className='w-full min-h-screen flex items-center justify-center'>
			<div className='w-full text-center'>
				{/* 404 Display */}
				<div className='mb-8'>
					<div className='text-8xl md:text-9xl font-bold text-slate-200 mb-4'>404</div>
					<div className='h-1 w-24 bg-slate-950 mx-auto mb-8'></div>
				</div>
				{/* Content */}
				<div className='mb-12'>
					<h1 className='text-3xl md:text-4xl font-semibold text-slate-950 mb-4'>
						Page not found
					</h1>
					<p className='text-base md:text-lg text-slate-600 max-w-xl mx-auto'>
						Sorry, we couldn't find the page you're looking for. The link might be broken, or the page may have been removed.
					</p>
				</div>

				{/* Actions */}
				<div className='flex flex-col sm:flex-row gap-4 justify-center'>
					<button
						onClick={() => history.push('/')}
						className='inline-flex items-center justify-center rounded-full bg-slate-950 px-8 py-3 text-sm font-semibold text-white transition hover:bg-slate-800'
					>
						Back to home
					</button>
					{!isAdmin && (
						<button
							onClick={() => history.push('/shop')}
							className='inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50'
						>
							Continue shopping
						</button>
					)}
				</div>

			</div>
		</div>
	);
}

export default Error404;
