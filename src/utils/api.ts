import Axios from 'axios';
import handleError from "./handleError";
// import { useToast } from 'primevue/usetoast';

const API = Axios

// use this if you don't have the local server "https://cors-anywhere.herokuapp.com/http://46.101.48.195:90/v1";

API.defaults.baseURL = process.env.NODE_ENV === "production" ? process.env.VUE_APP_API_URL : "http://localhost:90/v1"
API.defaults.headers.post["Content-Type"] = "application/json";
API.defaults.headers["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJidXNvbGFva2Vtb25leUBnbWFpbC5jb20iLCJsb2dpbl90eXBlIjoiZW1haWxfYW5kX3Bhc3N3b3JkIiwiaWF0IjoxNjEyMjY0Nzg3fQ.zhb5WUld_X3LeTf4dxPjFX7NlpFVe1VSMkbnK0FAf8U";
Axios.interceptors.response.use(
    function (response) {
        return Promise.resolve(response);
    },
    function (error) {
        // handle error
        handleError(error);

        return Promise.reject(error);
    });

export { API }