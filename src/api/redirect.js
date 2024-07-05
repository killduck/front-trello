import { URL_PUBLIC } from "./config";

export default function redirect() {
    window.location.replace(URL_PUBLIC + "login/");
}