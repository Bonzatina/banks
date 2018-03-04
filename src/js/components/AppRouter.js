import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { AuthedRoute } from '../helpers/AuthedRoute';
import App from './App';

import Login from './Login';

import { history } from '../helpers/history'

import '../../styles/app.scss';

export default () => (
    <div className="app_wrapper">
    <Router history={history} >
        <Switch>
            <Route path="/login" component={Login} />
            <AuthedRoute path="/" component={App} />
        </Switch>
    </Router>
    </div>
);