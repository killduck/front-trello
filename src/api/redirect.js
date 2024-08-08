import { URL_PUBLIC } from "./config";

export function redirect() {
    window.location.replace(URL_PUBLIC + "login/");
}

export function redirect_status404() {
    window.location.replace(URL_PUBLIC + "404/");
}
