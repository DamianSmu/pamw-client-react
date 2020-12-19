import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';
import authService from '../services/auth.service';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {
        var isUserLoggedIn = authService.isUserLoggedIn();
        return (
            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href='/'>PaczkoPol</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav activeKey={this.props.location.pathname} className="ml-auto">
                            {!isUserLoggedIn && <Nav.Link href="/signup">Zarejestruj</Nav.Link>}
                            {!isUserLoggedIn && <Nav.Link href="/login">Zaloguj</Nav.Link>}
                            {isUserLoggedIn && <Nav.Link href="/logout">Wyloguj</Nav.Link>}
                            {isUserLoggedIn && <Nav.Link href="/dashboard">Przesyłki</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        )
    }
}

export default withRouter(HeaderComponent)