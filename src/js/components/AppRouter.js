import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";

import {AuthedRoute}  from 'src/js/helpers/AuthedRoute';
import App from 'src/js/components/App';

import Login from 'src/js/components/Login';

import { history } from 'src/js/helpers/history'

import 'src/styles/app.scss';

class AppRouter extends React.Component {

    render() {
        const auth = this.props.authentication;
        return (    <div className="app_wrapper">
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <AuthedRoute path="/" auth={auth} component={App}/>
                </Switch>
            </Router>
        </div>)
    };
}


const mapStateToProps = state => {
    return { authentication: state.authentication };
};

const connectedAppRouter = connect(mapStateToProps)(AppRouter);
export default connectedAppRouter;