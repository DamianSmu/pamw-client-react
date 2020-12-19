import React, {Component} from "react";

export default class Start extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
                <div className="jumbotron">
                    <h1 className="display-3">Paczkopol</h1>
                    <p className="lead">Paczkopol to ciekawy system do obsługi paczek.</p>
                    <a className="btn btn-lg btn-success" href="/signup" role="button">Zarejestruj się za
                        darmo!</a>
                    
                </div>
        );
    }
}