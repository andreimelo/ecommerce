import React,{ useEffect, useState} from 'react';
import { Route, useHistory, withRouter } from "react-router-dom";
// Commented might used this in the future
// import LoadingToRedirect from './LoadingToRedirect';

const AdminRoute = withRouter(({ component: Component, ...rest }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const {role, token } = rest || {};
    const history = useHistory();
    async function redirectTo() {
        let isNotAdmin =
            role !== "admin" &&
            token
        let isAdminUndefined =
            role === undefined &&
            token === undefined;
        // set default empty object value for user
        if (isNotAdmin || isAdminUndefined) {
            return history.push('/')
        } 
        else {
            return setIsAdmin(true);
        }
    }

    useEffect(() => {
        redirectTo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdmin]);

    // might cause problem in role props
    return isAdmin &&
        (<> 
        <Route render={() => <Component role={role}/>}/>
        </>);
  });

export default AdminRoute;