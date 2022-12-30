import axios from "axios";
import { parseCookies } from "nookies";

const { 'singular.token': token } = parseCookies();

export const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
    headers: {
        Authorization: `Bearer ${token}`,
    }
})
