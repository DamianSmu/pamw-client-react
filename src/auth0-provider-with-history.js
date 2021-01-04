import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {

    const history = useHistory();
    const onRedirectCallback = (appState) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            //redirectUri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
            domain={process.env.REACT_APP_DOMAIN}
            clientId={process.env.REACT_APP_CLIENT_ID}
            redirectUri={process.env.REACT_APP_REDIRECT_URI}
            audience={"https://" + process.env.REACT_APP_DOMAIN + "/api/v2/"}
            scope="openid profile name email"
        >
            {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;