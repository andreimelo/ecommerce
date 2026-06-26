import React from 'react';
import NewArrivals from './components/NewArrivals';
import BestSellers from './components/BestSellers';
import Hero from './components/Hero';
import FeaturedCategories from './components/FeaturedCategories';

const Home = () => {
	return (
		<div className='w-full max-w-screen-xl mx-auto whitespace-pre-wrap break-words px-4'>
			<Hero />
			<FeaturedCategories />
			<NewArrivals />
			<BestSellers />
		</div>
	);
};

export default Home;
