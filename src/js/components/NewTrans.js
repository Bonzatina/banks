import React from 'react';
import { connect } from "react-redux";
import { transactionsActions } from '../actions';

class NewTrans extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
                amount: '',
                bank: '',
                // submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();

        // this.setState({ submitted: true });
        const transaction  = this.state;
        if (transaction.amount && transaction.bank) {
            this.props.dispatch(transactionsActions.addTransaction(transaction));
        }
    }

    render() {
        const { amount, bank } = this.state;
        return (
            <div>
            <h1>New Transaction</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Amount</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="amount"
                            value={amount}
                            onChange={this.handleChange}
                        />
                        <br/>
                        <label htmlFor="title">Bank</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="bank"
                            value={bank}
                            onChange={this.handleChange}
                        />

                    </div>
                    <button type="submit" >
                        Make Transaction
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { appState: state };
};

const connectedNewTrans = connect(mapStateToProps)(NewTrans);
export default connectedNewTrans;