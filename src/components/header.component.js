import React, { Component } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { withRouter } from 'react-router-dom';

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isUserLoggedIn: false
        }
        this.checkLoggedin = this.checkLoggedin.bind(this);
    }

    checkLoggedin(){
        var user = JSON.parse(localStorage.getItem('user'));
        if(user == null){
            this.setState({isUserLoggedIn: false})
        } else {
            this.setState({isUserLoggedIn: true})
        }
    }
    componentDidMount(){
        this.checkLoggedin();
        window.addEventListener('storageChanged', this.checkLoggedin , []);
    }

    render() {
        return (
            <header>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href='/'>PaczkoPol</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav activeKey={this.props.location.pathname} className="ml-auto">
                            {!this.state.isUserLoggedIn && <Nav.Link href="/signup">Zarejestruj</Nav.Link>}
                            {!this.state.isUserLoggedIn && <Nav.Link href="/login">Zaloguj</Nav.Link>}
                            {this.state.isUserLoggedIn && <Nav.Link href="/logout">Wyloguj</Nav.Link>}
                            {this.state.isUserLoggedIn && <Nav.Link href="/dashboard">Przesyłki</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header>
        )
    }
}

export default withRouter(HeaderComponent)