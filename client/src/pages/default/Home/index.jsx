import React from 'react';
import NewArrivals from './NewArrivals';

const Home = () => {
	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words'>
			<div className='flex my-5'>
				<NewArrivals />
			</div>
		</div>
	);
};

export default Home;
