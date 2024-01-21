import React,{ useEffect, useState} from 'react';
import { Route, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
// Commented might used this in the future
// import LoadingToRedirect from './LoadingToRedirect';


const AdminRoute = ({...rest}) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [isAdmin, setIsAdmin] = useState(false);
    const { role, token } = user || {};
    const history = useHistory();

    async function fetchAdminData() {
        let isNotAdmin =
            role !== "admin" &&
            token && 
            window.location.pathname === "/admin/dashboard";
        let isAdminUndefined =
            role === undefined &&
            token === undefined &&
            window.location.pathname === "/admin/dashboard";
        
        // set default empty object value for user
        if (isNotAdmin) {
            return history.push('/')
        } else if (isAdminUndefined) {
            return history.push('/');
        }
        else {
            return setIsAdmin(true);
        }
    }

    useEffect(() => {
        fetchAdminData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, isAdmin]);

    return isAdmin &&
        (<> 
            <Route {...rest} />
        </>);
}

export default AdminRoute;