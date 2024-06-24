
import axios from "axios";
import { URL_API } from "./config";


export default function request(request = { method: 'GET', url: '', callback: '', data: null, status: 200 }) {
    console.log(request);
    if (request.method === "GET") {
        axios.get(URL_API + request.url)
            .then((response) => {

                if (response.status === request.status) {
                    request.callback(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }


    if (request.method === "POST") {
        axios.post(URL_API + request.url, request.data)
            .then((response) => {
                console.log(response.data);
                if (response.status === request.status) {
                    request.callback(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
}
