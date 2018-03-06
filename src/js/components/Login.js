import React from 'react';
import { connect } from "react-redux";

import { userActions } from '../actions';

class Login extends React.Component {

    constructor(props) {
        super(props);

        // reset login status
      //  this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {

        e.preventDefault();

        this.setState({submitted: true});
        const {username, password} = this.state;
        if (username && password) {
            this.props.dispatch(userActions.login(username, password));
        }
    }

    render() {

        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
            <div>
                <h2>Login</h2>
                <form className="app_form" name="form" onSubmit={this.handleSubmit}>
                    <div className={'login_form_field' + (submitted && !username ? ' has-error' : '')}>
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" name="username" value={username} onChange={this.handleChange} />
                        {submitted && !username &&
                        <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div className={'login_form_field' + (submitted && !password ? ' has-error' : '')}>
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
                        {submitted && !password &&
                        <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button >Login</button>


                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { appState: state };
};

const connectedLogin = connect(mapStateToProps)(Login);
export default connectedLogin;