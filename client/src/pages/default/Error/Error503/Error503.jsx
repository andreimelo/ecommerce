import React from 'react';

function Error503(){
	return (
		<div className='w-full max-w-screen-xl mx-auto'>
			<div className='flex h-screen min-h-full flex-col justify-center'>
				<main className='flex flex-col flex-grow place-content-center'>
					<div className='text-center'>
						<div className='text-5xl font-bold'>
							WE'RE DOWN FOR MAINTENANCE
						</div>
						<span>
							This page is undergoing maintenance and will be back soon.
						</span>
					</div>
				</main>
			</div>
		</div>
	);
}

export default Error503;
