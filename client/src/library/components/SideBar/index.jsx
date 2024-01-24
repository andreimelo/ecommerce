import React from 'react';
import './style.css';
import { 
    Link
 } from 'react-router-dom';
import { string } from '../../common/constants/strings';
import PropTypes from 'prop-types';


function Sidebar({ role }) {
    function renderSideBar() {
        switch (role) {
            case 'subscriber':
                
                return (
                    <>
                        <div>   
                                <Link to="/user/history" >{string.routes.historyTitle}</Link>
                        </div>
                        <div>
                                <Link to='/user/change-password'>{string.routes.changePasswordTitle}</Link>
                        </div>
                        <div>
                                <Link to='/user/wishlist'>{string.routes.wishlistTitle}</Link>
                        </div>
                    </>
                )
            case 'admin': 
            return (
                <>
                    <div>   
                            <Link to="/admin/dashboard" >{string.routes.homeTitle}</Link>
                    </div>
                    <div>   
                            <Link to="/admin/product" >{string.routes.admin.productTitle}</Link>
                    </div>
                    <div>   
                            <Link to="/admin/products" >{string.routes.admin.productsTitle}</Link>
                    </div>
                    <div>   
                            <Link to="/admin/category" >{string.routes.admin.categoryTitle}</Link>
                    </div>
                    <div>   
                            <Link to="/admin/sub" >{string.routes.admin.subCategoryTitle}</Link>
                    </div>
                    <div>   
                            <Link to="/admin/sub" >{string.routes.admin.couponTitle}</Link>
                    </div>
                    {/* <div>   
                            <Link to="/user/password" >Welcome to change password</Link>
                    </div> */}
                </>
            )
            default:
                break;
        }
    }
    return (
        renderSideBar()
    );
}

Sidebar.propTypes = {
    role: PropTypes.string.isRequired,
    
}

export default React.memo(Sidebar);