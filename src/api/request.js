
import axios from "axios";
import { URL_API } from "./config";
import redirect from "./redirect";

export default function request(params = { method: 'GET', url: '', callback: '', data: null, status: 200 }, responseAll = false) {
    let token = "";
    if (localStorage.getItem('trello_auth')) {
        token = 'Token ' + localStorage.getItem('trello_auth');
    }


    if (params.method === "GET") {
        axios.get(URL_API + params.url, {
            headers: {
                'Authorization': token,
            }
        })
            .then((response) => {

                if (response.status === params.status) {
                    // так получим весь response, если нужно
                    if (responseAll) {
                        params.callback(response);
                    }
                    // так только response.data
                    params.callback(response.data);
                }


            })
            .catch((error) => {
                redirect();
                console.error(error);
            })
    }


    if (params.method === "POST") {
        axios.post(URL_API + params.url, params.data, {
            headers: {
                'Authorization': token,
            }
        })
            .then((response) => {
                if (response.status === params.status) {
                    // так получим весь response, если нужно
                    if (responseAll) {
                        params.callback(response);
                    }
                    // так только response.data
                    params.callback(response.data);
                }
            })
            .catch((error) => {
                redirect();
                console.error(error);
            })
    }






}
