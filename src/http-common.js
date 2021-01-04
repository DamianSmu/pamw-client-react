import axios from "axios";

export default axios.create({
    withCredentials: true,
    headers: {
        "Content-type": "application/json"
    }
});