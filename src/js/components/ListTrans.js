import React from 'react';
import { connect } from "react-redux";

import { transactionsActions } from '../actions';

class TransList extends React.Component {

    componentDidMount() {
        this.props.dispatch(transactionsActions.getAll());
    }

    handleDeleteTransaction(id) {
        this.props.dispatch(transactionsActions.deleteTransaction(id));
    }

    render() {
        const transactions = this.props.appState.transactions.items;

        return (
            <div>
            <h1>List of transactions !</h1>
                <div>
                    {transactions && <ul>
                        {transactions.map((transaction, index) =>
                            <li key={transaction.id}>
                                {transaction.id + ' ' + transaction.amount}
                                {
                                    transaction.deleting ? <em> - Deleting...</em>
                                        : transaction.deleteError ? <span className="error"> - ERROR: {transaction.deleteError}</span>
                                        : <span> - <a onClick={()=> this.handleDeleteTransaction(transaction.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { appState: state };
};

const connectedTransList = connect(mapStateToProps)(TransList);
export default connectedTransList;
