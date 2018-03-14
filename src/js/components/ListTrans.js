import React from 'react';
import {connect} from "react-redux";

import {transactionsActions} from 'src/js/actions';

class ListTrans extends React.Component {

    componentDidMount() {
        this.props.dispatch(transactionsActions.getAll());
    }

    handleDeleteTransaction(id) {
        this.props.dispatch(transactionsActions.deleteTransaction(id));
    }

    render() {
        const transactions = this.props.transactions.items;
        const banks = this.props.banks;

        const Transactions = transactions && banks && transactions.map((transaction) => {

            const bank = banks.filter(function (bank) {
                return bank.bankId === transaction.bankId;
            });

            return <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.amount}</td>
                <td>{bank[0].bankName}</td>
                <td>{
                    transaction.deleting ? <em> - Deleting...</em>
                        : transaction.deleteError ? <span className="has-error"> - ERROR: {transaction.deleteError}</span>
                        : <button onClick={() => this.handleDeleteTransaction(transaction.id)}> Delete</button>
                }</td>
            </tr>
        })

        return ( <div>
                <h1>List of transactions!</h1>
                <table className="trans_table">
                    <tbody>
                    <tr>
                        <th>transaction ID</th>
                        <th>amount</th>
                        <th>Bank</th>
                        <th></th>
                    </tr>
                    {Transactions}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {transactions: state.transactions};
};

const connectedListTrans = connect(mapStateToProps)(ListTrans);
export default connectedListTrans;
