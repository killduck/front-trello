
import axios from "axios";
import { URL_API } from "./config";


export default function request(params = { method: 'GET', url: '', callback: '', data: null, status: 200 }) {

    if (params.method === "GET") {
        axios.get(URL_API + params.url)
            .then((response) => {

                if (response.status === params.status) {
                    params.callback(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }


    if (params.method === "POST") {
        axios.post(URL_API + params.url, params.data)
            .then((response) => {
                console.log(response.data);
                if (response.status === params.status) {
                    params.callback(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
}
