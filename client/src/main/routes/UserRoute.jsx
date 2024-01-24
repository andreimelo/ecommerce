import React from 'react';
import { Route, withRouter, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = withRouter(({ component: Component, isLoggedIn, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const { role, token } = user || {};
  const history = useHistory();

  const componentCheck = props => {
    let isSubscriber =
      role === 'subscriber' &&
      token;
    let isSubscriberUndefined =
      role === undefined &&
      token === undefined;
    let isAdmin =
      role === "admin" &&
      token; 
    
      if (isSubscriber || isSubscriberUndefined) {
        return <Component {...props} role={role}/>;
      } 
      if (isAdmin) {
        return history.push('/admin/dashboard')
      }
  };
  return (
      <>
        <Route {...rest} render={props => componentCheck(props)} />
      </>
  );
});
 
export default UserRoute;