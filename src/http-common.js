import axios from "axios";

export default axios.create({
    withCredentials: true,
    baseURL: "https://pamw-damian-smugorzewski-api.herokuapp.com/api/",
    headers: {
        "Content-type": "application/json"
    }
});