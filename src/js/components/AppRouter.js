import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import { AuthedRoute } from 'src/js/helpers/AuthedRoute';
import App from 'src/js/components/App';

import Login from 'src/js/components/Login';

import { history } from 'src/js/helpers/history'

import 'src/styles/app.scss';

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