import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { string } from '../../common/constants/strings';
import { type } from '../../common/constants/types';
import CustomInput from '../Input';
import PropTypes from 'prop-types';
import './style.css';
import { logOutAction } from '../../common/actions/authentication';
import icons from '../../../resources/icons';
import Profile from '../../components/Profile';

function Header({role, imageURL}) {
	
	const history = useHistory();
	const dispatch = useDispatch();
	const { user } = useSelector((state) => ({ ...state }));

	function renderRoleHeader() {
		switch (role) {
			case 'admin':
				return (
					<nav className='nav-container shadow'>
					<div className='nav-sub-container layout-default'>
						<div id='logo' onClick={()=>history.push('/')}>{string.common.logoTitle}</div>
						<div className="nav-link-container">
							{/* Input */}
							{user &&
								(<div className="settings">
									<div className="nav-title list">
										{(user && <Profile imageURL={imageURL}/>) || (!user && string.routes.userNamePlaceHolderTitle)}
									</div>
									<div className="settings-content bg-white border" onClick={() => logOutAction(history, dispatch)} >{string.routes.logOutTitle}</div>
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
							<div id='logo'  onClick={()=>history.push('/')}>{string.common.logoTitle}</div>
							<div className="nav-link-container">
								{/* <div className="nav-title" onClick={() => history.push('/')}>
									{string.routes.homeTitle}
								</div> */}
								{/* Input */}
								<CustomInput type={type.input.search} name={"search"} placeHolder={"Search"} variant="inp mx-20 rounded-full border border-gray-500 fix-size" onChange={(event) => console.log(event)} />
								<div className="nav-title" onClick={() => history.push('/shop')}>{icons['shop']}</div>
								<div className="nav-title" onClick={() => history.push('/cart')}>{icons['cart']}</div>
								{user &&
									(<div className="settings">
										<div className="nav-title list">
											{(user && <Profile imageURL={imageURL}/>) || (!user && string.routes.userNamePlaceHolderTitle)}
										</div>
										<div className="settings-content bg-white border" onClick={() => logOutAction(history, dispatch)} >{string.routes.logOutTitle}</div>
									</div>)
								}
								{!user &&
									(
										<>
											<div className="nav-title text-sm" onClick={() => history.push('/login')}>
												{string.routes.loginTitle}
											</div>
											{/* <div className="nav-title" onClick={() => history.push('/register')}>
												{string.routes.registerTitle}
											</div> */}
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

	return renderRoleHeader()
}

Header.propTypes = {
	role: PropTypes.string.isRequired,
	imageURL: PropTypes.string,
};

export default React.memo(Header);
