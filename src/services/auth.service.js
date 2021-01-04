import axios from "axios";
import jwt from 'jsonwebtoken';
axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_BASE_URL + "auth/";

class AuthService {
    login(username, password) {

        return axios.post(API_URL + "signin", {
            username,
            password
        }).then(response => {
            if (response.data) {
                localStorage.setItem("token", JSON.stringify("MyBearer " + response.data.accessToken));
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    
    }

    logout() {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('user')
    }

    register(firstname, lastname, username, email, password, address) {
        return axios.post(API_URL + "signup", {
            firstname,
            lastname,
            username,
            email,
            password,
            address
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('token'));;
    }

    getLoginAvailability(value){
        return axios.get(API_URL + 'check/' + value).then(response => {
            if(response.status !== 200){
                return "error";
            } else{
                return response.data.message;
            }
                
        });
    }

    isUserLoggedIn(){
        var isUserLoggedIn = false;
        var token = JSON.parse(localStorage.getItem('token'));
        var user = JSON.parse(localStorage.getItem('user'));
        if(token !== null && user !== null){
            if(token.startsWith("Bearer ")){
                token = token.substr(7)
            } else if(token.startsWith("MyBearer ")){
                token = token.substr(9)
            } else {
                return isUserLoggedIn;
            }

            var decodedToken=jwt.decode(token, {complete: true});
            var dateNow = new Date();
            if(decodedToken.payload.exp > (dateNow.getTime() / 1000)){
                isUserLoggedIn = true;
            }
        }
        return isUserLoggedIn;
    }
}

export default new AuthService();