import React, { Component } from 'react'
import { Redirect } from 'react-router'
import authService from '../services/auth.service'

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

export default Logout