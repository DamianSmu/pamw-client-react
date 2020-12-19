import axios from 'axios';
import authHeader from '../auth-header';


const API_URL = process.env.API_BASE_URL + "parcel/";

class ParcelService {

    getAll() {
        return axios.get(API_URL + "getAllByAuthenticated", {
            headers: authHeader()
        }).then(response => {
            return response.data;
        });
    }

    deleteParcel(id) {
        return axios.delete(API_URL + id,
            {
                headers: authHeader()
            }).then(response => {
                return response.data;
            });
    }

    addParcel(receiver, postOffice, size) {
        return axios.post(API_URL, {
            receiver,
            postOffice,
            size
        }, {
            headers: authHeader()
        }).then(response => {
            return response.data;
        });
    }
}

export default new ParcelService();