import createAuth0Client from '@auth0/auth0-spa-js';
class Auth0Service {

    static myInstance = null;
s
    constructor() {
        this.auth0 = createAuth0Client({
            domain: 'dev-5ieroany.eu.auth0.com',
            client_id: '1AxkKNnC0Lowxdfb4qheBYo1bdD6k6nN'
        }).then(auth0 => {
            this.auth0 = auth0;
            console.log("Auth0 connected");
        }
        );
    }

    static getInstance(){
        if(this.myInstance == null){
            this.myInstance = new Auth0Service();
            return this.myInstance;
        } else{
            return this.myInstance;
        }
    }

    static logout() {
        this.auth0.logout({
            returnTo: 'https://localhost:9090'
        });
    }
}

export default Auth0Service;