
import axios from "axios";
import { URL_API } from "./config";

export default function request(params = { method: 'GET', url: '', callback: '', data: null, status: 200 } , responseAll = false) {

    if (params.method === "GET") {
        axios.get(URL_API + params.url)
            .then((response) => {

                if (response.status === params.status) {
                    // так получим весь response, если нужно
                    if(responseAll){
                        params.callback(response);
                    }
                    // так только response.data
                    params.callback(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }


    if (params.method === "POST" ) {
        axios.post(URL_API + params.url, params.data)
            .then((response) => {
                if (response.status === params.status) {
                    // так получим весь response, если нужно
                    if(responseAll){
                        params.callback(response);
                    }
                    // так только response.data
                    params.callback(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
    // if (params.method === "POST" && flag) {
    //     axios.post(URL_API + params.url, params.data)
    //         .then((response) => {
    //             // console.log(response.data);
    //             if (response.status === params.status) {
    //                 params.callback(response);
    //             }
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         })
    // }
}
