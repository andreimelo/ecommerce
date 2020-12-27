import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

function Header(){
	let history = useHistory();

	return (
		<nav className='nav-container shadow'>
			<div className='nav-sub-container'>
				<span id='logo'>Logo</span>
				<span onClick={() => history.push('/')}> Home</span>
				<span> Shop </span>
				<span> Cart </span>
				{/* Input */}
				<span onClick={() => history.push('/login')}> Login</span>
				<span onClick={() => history.push('/register')}> Register</span>
			</div>
			<div className='nav-sub-container'>
				<span> Categories </span>
				<span> Sub Categories </span>
			</div>
		</nav>
	);
}

export default React.memo(Header);
