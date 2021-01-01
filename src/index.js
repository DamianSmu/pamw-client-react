import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";

ReactDOM.render(
    
    <BrowserRouter>
        <Auth0Provider
        domain="dev-5ieroany.eu.auth0.com"
        clientId="1AxkKNnC0Lowxdfb4qheBYo1bdD6k6nN"
        redirectUri="https://localhost:9090/login"
       >
            <App />
         </Auth0Provider>
    </BrowserRouter>,
    document.getElementById("root")
);


