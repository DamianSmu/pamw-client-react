import axios from "axios";
import jwt from 'jsonwebtoken';
axios.defaults.withCredentials = true;

const API_URL = process.env.API_BASE_URL + "auth/";

class AuthService {
    login(username, password) {

        return axios.post(API_URL + "signin", {
            username,
            password
        }).then(response => {
            if (response.data) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        });
    
    }

    logout() {
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
        return JSON.parse(localStorage.getItem('user'));;
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
        const userData = JSON.parse(localStorage.getItem('user'));
        if(userData !== null){
            const token = userData.accessToken;
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