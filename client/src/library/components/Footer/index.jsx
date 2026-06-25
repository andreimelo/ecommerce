import React from 'react';
import { useHistory } from 'react-router-dom';
import { images } from '../../../resources/images';
import './style.css';
import '../../../resources/styles/global.css';

function Footer(){
	const history = useHistory();
	return (
		<footer className='shadow dark:bg-gray-900'>
			<div className='w-full max-w-screen-xl mx-auto md:py-8'>
				<div className='sm:flex sm:items-center sm:justify-between'>
						<div
							className='self-center text-2xl font-semibold whitespace-nowrap'
							id='logo'
							onClick={() => history.push('/')}
						>
							<img
								className='w-30 h-20 object-contain'
								alt='brandLogo'
								src={images['brandLogo']}
							/>
						</div>
					<ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400'>
						<li>
							<a href='/' className='hover:underline me-4 md:me-6'>
								About
							</a>
						</li>
						<li>
							<a href='/' className='hover:underline me-4 md:me-6'>
								Privacy Policy
							</a>
						</li>
						<li>
							<a href='/' className='hover:underline me-4 md:me-6'>
								Licensing
							</a>
						</li>
						<li>
							<a href='/' className='hover:underline'>
								Contact
							</a>
						</li>
					</ul>
				</div>
				<hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
				<span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
					© 2023{' '}
					<a href='https://andreimelo.netlify.app/' className='hover:underline'>
						Melo™
					</a>. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
}

export default React.memo(Footer);
