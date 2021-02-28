import React from 'react';
import { useHistory } from 'react-router-dom';
import { string } from '../../common/constants/strings';
import { type } from '../../common/constants/types';
import CustomInput from '../Input';
import './style.css';

function Header(){
	let history = useHistory();

	return (
		<nav className='nav-container shadow'>
			<div className='nav-sub-container'>
				<div id='logo'>{string.common.logoTitle}</div>
				<div className="position-right">
				<div className="nav-title" onClick={() => history.push('/')}>
					{string.routes.homeTitle}
				</div>
				<div className="nav-title" onClick={() => history.push('/shop')}>{string.navigation.shopTitle}</div>
				<div className="nav-title" onClick={() => history.push('/cart')}>{string.navigation.cartTitle}</div>
				{/* Input */}
				<CustomInput type={type.input.search} name={"search"} placeHolder={"Search"} variant="inp fix-size" />
				<div className="nav-title" onClick={() => history.push('/login')}>
					{string.routes.loginTitle}
				</div>
				<div  className="nav-title" onClick={() => history.push('/register')}>
					{string.routes.registerTitle}
				</div>
				</div>
			</div>
			<div className='nav-sub-container'>
				<div className="nav-title category">{string.navigation.categoriesTitle}</div>
				<div className="nav-title category">
					{string.navigation.subCategoriesTitle}
				</div>
			</div>
		</nav>
	);
}

export default React.memo(Header);
