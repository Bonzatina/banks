import React from 'react';
import {connect} from "react-redux";

import {transactionsActions} from '../actions';

class NewTrans extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            bankId: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const {name, value} = e.target;

        if (name === "bankId") {
            const banks = this.props.banks;
            const bank = banks.filter(function (bank) {

                return bank.bankName === value;
            });
            console.log(bank)
            if (bank.length > 0) {
                this.setState({[name]: bank[0].bankId});
            }
            else {
                this.setState({[name]: ''});
            }
        }

        else {
            this.setState({[name]: value});
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        const transaction = this.state;

        this.setState({submitted: true});
        if (transaction.amount && transaction.bankId) {
            this.props.dispatch(transactionsActions.addTransaction(transaction));
        }
    }

    render() {
        const {amount, submitted, bankId} = this.state;
        const banks = this.props.banks;

        const BankSelect = banks && banks.map((bank) => {

            return <option key={bank.bankId} value={banks.bankId}>{bank.bankName}</option>
        })


        return (
            <div>
                <h1>New Transaction</h1>
                <form className="app_form" onSubmit={this.handleSubmit}>
                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            name="amount"
                            value={amount}
                            onChange={this.handleChange}
                        />
                        {submitted && !amount &&
                        <div className="help-block">Amount is required</div>
                        }
                        <br/>
                    </div>
                    <div>
                        <label htmlFor="title">Bank</label>

                        {banks && <select name="bankId"
                                          onChange={this.handleChange}>
                            <option defaultValue>Choose the bank from the list</option>
                            {BankSelect}
                        </select>}
                        {submitted && !bankId &&
                        <div className="help-block">Choose the bank</div>
                        }
                    </div>
                    <button className="submit_button" type="submit">
                        Make Transaction
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {appState: state};
};

const connectedNewTrans = connect(mapStateToProps)(NewTrans);
export default connectedNewTrans;