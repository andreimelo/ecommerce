import React,{ useEffect, useState} from 'react';
import { Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';
import { currentAdmin } from '../../library/services/auth'

const AdminRoute = ({children, ...rest}) => {
    const { user } = useSelector((state) => ({ ...state }));
    const [isAdmin, setIsAdmin] = useState(false);
    
    async function fetAdminData(user) {
        // set default empty object value for user
        let { role, token } = user || {};
        if (role === 'admin' && token) {
            console.log(user);
            try {
                let result = await currentAdmin(token);
                
                if (result) {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.log('Admin route error log',error);
                setIsAdmin(false);
            }
        }
        return user;
    }

    useEffect(() => {
        fetAdminData(user);
    }, [user]);

    return isAdmin ? <Route {...rest} render={() => children} /> : <LoadingToRedirect />;
}

export default AdminRoute;