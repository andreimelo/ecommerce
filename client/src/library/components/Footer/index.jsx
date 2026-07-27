import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { images } from '../../../resources/images';
import './style.css';
import '../../../resources/styles/global.css';

function Footer({ role }){
	const history = useHistory();
	const shellClass = role === 'admin' ? 'max-w-screen-[1680px]' : 'max-w-screen-xl';
	const footerClass = role === 'admin'
		? 'border-t border-slate-200 bg-white/95 text-slate-500'
		: 'bg-slate-900 text-slate-400';
	const linkClass = role === 'admin' ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white';
	return (
		<footer className={footerClass}>
			<div className={`w-full ${shellClass} mx-auto px-4 py-10 md:px-6`}>
				<div className='flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between'>
						<div
							className='self-center whitespace-nowrap'
							id='logo'
							onClick={() => history.push('/')}
						>
							<img
								className='h-16 object-contain md:h-20'
								alt='brandLogo'
								src={images['brandLogo']}
							/>
						</div>
					<ul className='flex flex-wrap items-center gap-5 text-sm font-medium'>
						<li>
							<a href='/' className={linkClass}>
								About
							</a>
						</li>
						<li>
							<a href='/' className={linkClass}>
								Privacy Policy
							</a>
						</li>
						<li>
							<a href='/' className={linkClass}>
								Licensing
							</a>
						</li>
						<li>
							<a href='/' className={linkClass}>
								Contact
							</a>
						</li>
					</ul>
				</div>
				<hr className={`my-6 sm:mx-auto lg:my-8 ${role === 'admin' ? 'border-slate-200' : 'border-slate-700'}`} />
				<span className='block text-sm sm:text-center'>
					© 2023{' '}
					<a href='https://andreimelo.netlify.app/' className={linkClass}>
						Melo™
					</a>. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
}

Footer.propTypes = {
	role : PropTypes.string,
};

Footer.defaultProps = {
	role : '',
};

export default React.memo(Footer);
