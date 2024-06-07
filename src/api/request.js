import axios from "axios";
import { URL_API } from "./config";
// export default function request(method, url, callback, data = null, status = 200) {
export default function request(method='', url='', callback='', data = null, status = 200) {

    if (method === "GET") {
        axios.get(URL_API + url)
            .then((response) => {

                // console.log(response.data);
                if (response.status === status) {
                    callback(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }


    if (method === "POST") {
        axios.post(URL_API + url, data)
            .then((response) => {
                console.log(response.data);
                if (response.status === status) {
                    callback(response.data);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
}
