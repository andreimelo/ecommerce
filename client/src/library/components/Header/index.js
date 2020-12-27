import React from 'react';
import './style.css';

function Header(){
	return (
		<nav className='nav-container shadow'>
			<div className='nav-sub-container'>
				<span id='logo'>Logo</span>
				<span> Home </span>
				<span> Shop </span>
				<span> Cart </span>
				{/* Input */}
				<span> Login </span>
				<span> Register </span>
			</div>
			<div className='nav-sub-container'>
				<span> Categories </span>
				<span> Sub Categories </span>
			</div>
		</nav>
	);
}

export default React.memo(Header);
