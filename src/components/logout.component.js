import React, { Component } from 'react'
import { Redirect } from 'react-router'
import authService from '../services/auth.service'
import LogoutButton from "./authLogout.component";
import { withAuth0 } from '@auth0/auth0-react';

class Logout extends Component {
    constructor(props) {
       
        super(props)

        this.state = {
            removed: false,
            redirect: false
        }
    }

    componentDidMount() {
        authService.logout()
        const { logout } = this.props.auth0;
        logout({ returnTo: window.location.origin })
        if (window.localStorage.getItem('user') == null) {
            this.setState({
                removed: true,
            });
        }
        this.id = setTimeout(() => this.setState({ redirect: true }), 5000)
    }
    render() {
        return (
            <div className="container content">
                <LogoutButton></LogoutButton>
                {this.state.removed &&
                    <div className="alert alert-success" role="alert">
                        Wylogowano poprawnie.
                    </div>
                }
                {this.state.redirect ?
                    (<Redirect to="/" />) :
                    (<div className="alert alert-warning" role="alert">
                        Za chwilę zostaniesz przeniesiony na stronę główną
                    </div>)}
            </div>


        )
    }
}

export default withAuth0(Logout)