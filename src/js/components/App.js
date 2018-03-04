import React from 'react';
import { Route,  Link } from 'react-router-dom';
import { connect } from "react-redux";

import { userActions } from '../actions';
import ListTrans from './ListTrans';
import NewTrans from './NewTrans';

class App extends React.Component {

    handleLogOut() {
        this.props.dispatch(userActions.logout());
    }

    render() {
        return (
            <div className="app_body">

                <div className="app_body_text">
                    <Route path="/list" component={ListTrans} />
                    <Route path="/new" component={NewTrans} />
                </div>

                <div className="nav">
                    <p><Link to="/list">List of transactions</Link></p>
                    <p><Link to="/new">New transaction</Link></p>
                    <p><Link onClick={ () => this.handleLogOut() } to="/">log out</Link></p>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return { appState: state };
};

const connectedApp = connect(mapStateToProps)(App);
export default connectedApp;


