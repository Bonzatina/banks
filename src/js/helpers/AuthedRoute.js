import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthedRoute = ({ component: Component, auth: auth, ...rest }) => (
    <Route {...rest} render={props => (
        auth.loggedIn
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)