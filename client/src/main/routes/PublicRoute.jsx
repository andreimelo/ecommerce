import React,{ useEffect } from 'react';
import { Route, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

const PublicRoute = ({...rest}) => {
    const { user } = useSelector((state) => ({ ...state }));
    const history = useHistory();
    const { role, token } = user || {};
   
    async function redirectTo() {
        let isAdmin =
            role === "admin" &&
            token;
        // if Admin is active route to /admin path
        if (isAdmin) {
            return history.push('/admin/dashboard');
        } 
    }

    useEffect(() => {
        redirectTo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return <Route {...rest} />
}

export default PublicRoute;