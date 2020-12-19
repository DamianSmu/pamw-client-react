import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
        return (
            <div className="text-danger" role="alert">
                Pole jest wymagane.
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="text-danger" role="alert">
                Niepoprawny adres email.
            </div>
        );
    }
};

const vusername = value => {
    var re = /[a-z]{3,12}/g
    if (!re.exec(value)) {
        return (
            <div className="text-danger" role="alert">
                Nazwa użytkownika musi zawierać od 3 do 12 małych liter.
            </div>
        );
    }
};

const vusernameAvailable = value => {
    var response = AuthService.getLoginAvailability(value);
    if (response === "taken") {
        return (
            <div className="text-danger" role="alert">
                Użytkownik o podanej nazwie istnieje już w bazie.
            </div>
        );
    }
    if (response === "error") {
        return (
            <div className="text-danger" role="alert">
                Błąd serwera.
            </div>
        );
    }
};

const vname = value => {
    var re = /[A-Z{ĄĆĘŁŃÓŚŹŻ}][a-z{ąćęłńóśźż}]+/g
    if (!re.exec(value)) {
        return (
            <div className="text-danger" role="alert">
                Wpisz poprawne dane.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 8) {
        return (
            <div className="text-danger" role="alert">
                Hasło musi zawierać co najmniej 8 znaków.
            </div>
        );
    }
};

const vrepassword = (value, props, components) => {
    if (value !== components['password'][0].value) {
        return (
            <div className="text-danger" role="alert">
                Hasła nie są takie same.
            </div>
        );
    }
};

export default class Register extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeRePassword = this.onChangeRePassword.bind(this)
        this.onChangeAddress = this.onChangeAddress.bind(this)

        this.state = {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            password: "",
            repassword: "",
            adress: "",
            successful: false,
            message: "",
            loading: false
        };


    }

    onChangeFirstName(e) {
        this.setState({
            firstname: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastname: e.target.value
        });
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeRePassword(e) {
        this.setState({
            repassword: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false,
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.firstname,
                this.state.lastname,
                this.state.username,
                this.state.email,
                this.state.password,
                this.state.address
            ).then(
                response => {
                    this.setState({
                        message: response.data.message,
                        successful: true,
                        loading: false
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage,
                        loading: false
                    });
                }
            );
        }
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <div className="container content">
                <div className="row justify-content-lg-center">
                    <div className="col-6">
                        {!this.state.successful && (<Form
                            onSubmit={this.handleRegister}
                            ref={c => {
                                this.form = c;
                            }}
                        >
                            <div className="form-group">
                                <h3>Rejestracja</h3>
                            </div>
                            {!this.state.successful && (
                                <div>
                                    <div className="form-group">
                                        <label htmlFor="firstname">Imię</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="firstname"
                                            value={this.state.firstname}
                                            onChange={this.onChangeFirstName}
                                            validations={[required, vname]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastname">Nazwisko</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="lastname"
                                            value={this.state.lastname}
                                            onChange={this.onChangeLastName}
                                            validations={[required, vname]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="username">Nazwa użytkownika</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="username"
                                            value={this.state.username}
                                            onChange={this.onChangeUsername}
                                            validations={[required, vusername, vusernameAvailable]}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                            validations={[required, email]}
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
                                            validations={[required, vpassword]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="repassword">Powtórz hasło</label>
                                        <Input
                                            type="password"
                                            className="form-control"
                                            name="repassword"
                                            value={this.state.repassword}
                                            onChange={this.onChangeRePassword}
                                            validations={[required, vrepassword]}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Adres</label>
                                        <Input
                                            type="text"
                                            className="form-control"
                                            name="address"
                                            value={this.state.address}
                                            onChange={this.onChangeAddress}
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
                                            <span>Zarejestruj</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                            <CheckButton
                                style={{ display: "none" }}
                                ref={c => {
                                    this.checkBtn = c;
                                }}
                            />
                        </Form>
                        )}
                        {this.state.message && (
                            <div className="form-group">
                                <div
                                    className={
                                        this.state.successful
                                            ? "alert alert-success"
                                            : "alert alert-danger"
                                    }
                                    role="alert"
                                >
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}