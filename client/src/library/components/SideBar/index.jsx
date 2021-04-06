import React from 'react';
import './style.css';
import { 
    Link
 } from 'react-router-dom';
import { string } from '../../common/constants/strings';

function Sidebar() {
    return (
        <div>
           <div>
                <Link to="/user/history" >{string.routes.historyTitle}</Link>
           </div>
            <div>
                <Link to='/user/change-password'>{string.routes.changePasswordTitle}</Link>
           </div>
            <div>
                <Link to='/user/wishlist'>{string.routes.wishlistTitle}</Link>
           </div>
        </div>
    );
}

export default React.memo(Sidebar);