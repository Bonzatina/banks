import React from 'react';
import { Route,  Link } from 'react-router-dom';
import { connect } from "react-redux";

import { userActions, banksActions } from 'src/js/actions';
import ListTrans from 'src/js/components/ListTrans';
import NewTrans from 'src/js/components/NewTrans';

class App extends React.Component {

    componentDidMount() {
        this.props.dispatch(banksActions.getBanksList());
    }

    handleLogOut() {
        this.props.dispatch(userActions.logout());
    }

    render() {
        const banks = this.props.banks.banksList;
        return (
            <div className="app_body">

                <div className="app_body_text">
                    <Route path="/list" render={()=><ListTrans banks={banks}/>}/>
                    <Route path="/new"  render={()=><NewTrans banks={banks}/>} />
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
    return { banks: state.banks };
};

const connectedApp = connect(mapStateToProps)(App);
export default connectedApp;


