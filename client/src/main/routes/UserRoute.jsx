import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingToRedirect from './LoadingToRedirect';

const UserRoute = withRouter(({ component: Component, isLoggedIn, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));
    const componentCheck = props => {
    if (user && user.token) {
      return <Component {...props} />;
    } else {
      return (
         <LoadingToRedirect/>
        // <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      );
    }
  };
  return <Route {...rest} render={props => componentCheck(props)} />;
});

export default UserRoute;