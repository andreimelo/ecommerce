import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { string } from '../../common/constants/strings';
import { type } from '../../common/constants/types';
import CustomInput from '../Input';
import './style.css';
import { logOutAction } from '../../common/actions/authentication';

function Header(role) {
	
	const history = useHistory();
	const dispatch = useDispatch();
    const { user } = useSelector((state) => ({ ...state }));

	function renderRoleHeader(role) {
		switch (role) {
			case 'admin':
				return (
					<nav className='nav-container shadow'>
					<div className='nav-sub-container layout-default'>
						<div id='logo'>{string.common.logoTitle}</div>
						<div className="nav-link-container">
							{/* Input */}
							{user &&
								(<div className="settings">
									<div className="nav-title list">
										{(user && user.email) || (!user && string.routes.userNamePlaceHolderTitle)}
									</div>
									<div className="settings-content" onClick={() => logOutAction(history, dispatch)} >{string.routes.logOutTitle}</div>
								</div>)
							}
							{!user &&
								(
									<>
										<div className="nav-title" onClick={() => history.push('/login')}>
											{string.routes.loginTitle}
										</div>
										<div className="nav-title" onClick={() => history.push('/register')}>
											{string.routes.registerTitle}
										</div>
									</>
								)
							}
						</div>
					</div>
				</nav>
				);
			default:
				return (
					<nav className='nav-container shadow'>
						<div className='nav-sub-container layout-default'>
							<div id='logo'>{string.common.logoTitle}</div>
							<div className="nav-link-container">
								<div className="nav-title" onClick={() => history.push('/')}>
									{string.routes.homeTitle}
								</div>
								<div className="nav-title" onClick={() => history.push('/shop')}>{string.navigation.shopTitle}</div>
								<div className="nav-title" onClick={() => history.push('/cart')}>{string.navigation.cartTitle}</div>
								{/* Input */}
								<CustomInput type={type.input.search} name={"search"} placeHolder={"Search"} variant="inp fix-size" onChange={(event) => console.log(event)} />
								{user &&
									(<div className="settings">
										<div className="nav-title list">
											{(user && user.email) || (!user && string.routes.userNamePlaceHolderTitle)}
										</div>
										<div className="settings-content" onClick={() => logOutAction(history, dispatch)} >{string.routes.logOutTitle}</div>
									</div>)
								}
								{!user &&
									(
										<>
											<div className="nav-title" onClick={() => history.push('/login')}>
												{string.routes.loginTitle}
											</div>
											<div className="nav-title" onClick={() => history.push('/register')}>
												{string.routes.registerTitle}
											</div>
										</>
									)
								}
							</div>
						</div>
						{/*  .category
					<div className='nav-link-container'>
					<div className="nav-title category">{string.navigation.categoriesTitle}</div>
					<div className="nav-title category">
						{string.navigation.subCategoriesTitle}
					</div>
				</div> */}
					</nav>
				);
		}
	}

	return renderRoleHeader(role)
}

export default React.memo(Header);
