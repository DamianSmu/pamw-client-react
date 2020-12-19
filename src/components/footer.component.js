import React, { Component } from 'react'

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <footer className="footer">
                <div className="row">
                    <p>© 2020 Damian Smugorzewski</p>
                    <a className="link ml-auto" href="https://github.com/DamianSmu/PAMW_20Z">Repozytorium</a>
                </div>
            </footer>
        )
    }
}

export default FooterComponent