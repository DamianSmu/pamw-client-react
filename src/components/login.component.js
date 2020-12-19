import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Pole jest wymagane!
            </div>
        );
    }
};

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();
        AuthService.login(this.state.username, this.state.password).then(
            () => {
                this.props.history.push("/dashboard");
                window.location.reload();
            },
            error => {
                var resMessage = ""
                if (error.response.status === 401) { 
                    resMessage = "Nieprawidłowa nazwa użytkownika lub hasło." 
                }
                else {
                    resMessage = (error.response && error.response.data && error.response.data.message) || error.message ||
                        error.toString();
                }

                this.setState({
                    loading: false,
                    message: resMessage
                });
            }
        );
       
    }

    render() {
        return (
            <div className="container content">
                <div className="row justify-content-lg-center">
                    <div className="col-6">
                        <Form
                            onSubmit={this.handleLogin}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            <div className="form-group">
                                <h3>Logowanie</h3>
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">Nazwa użytkownika</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Hasło</label>
                                <Input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChangePassword}
                                    validations={[required]}
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    className="btn btn-primary btn-block"
                                    disabled={this.state.loading}
                                >
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Zaloguj</span>
                                </button>
                            </div>
                            {this.state.message && (
                                <div className="form-group">
                                    <div className="alert alert-danger" role="alert">
                                        {this.state.message}
                                    </div>
                                </div>
                            )}
                        </Form>
                    </div>
                </div>
            </div>
        );
    }
}