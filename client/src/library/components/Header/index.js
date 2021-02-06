import React from 'react';
import {useHistory} from 'react-router-dom';
import {string} from '../../common/constants/strings';
import './style.css';

function Header(){
	let history = useHistory();

	return (
		<nav className='nav-container shadow'>
			<div className='nav-sub-container'>
				<span id='logo'>{string.common.logoTitle}</span>
				<span onClick={() => history.push('/')}>
					{string.routes.homeTitle}
				</span>
				<span>{string.navigation.shopTitle}</span>
				<span>{string.navigation.cartTitle}</span>
				{/* Input */}
				<span onClick={() => history.push('/login')}>
					{string.routes.loginTitle}
				</span>
				<span onClick={() => history.push('/register')}>
					{' '}
					{string.routes.registerTitle}
				</span>
			</div>
			<div className='nav-sub-container'>
				<span>{string.navigation.categoriesTitle}</span>
				<span>
					{string.navigation.subCategoriesTitle}
				</span>
			</div>
		</nav>
	);
}

export default React.memo(Header);
