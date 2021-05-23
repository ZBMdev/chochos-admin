/* import Axios from 'axios';
import handleError from "./handleError";
// import { useToast } from 'primevue/usetoast';

const API = Axios


// API.defaults.baseURL = process.env.NODE_ENV === "production" ? process.env.VUE_APP_API_URL : "http://localhost:8083/api"
// API.defaults.baseURL = process.env.VUE_APP_API_URL;
API.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://chochos-list.herokuapp.com/api"
API.defaults.headers.post["Content-Type"] = "application/json";
// API.defaults.headers["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJidXNvbGFva2Vtb25leUBnbWFpbC5jb20iLCJsb2dpbl90eXBlIjoiZW1haWxfYW5kX3Bhc3N3b3JkIiwiaWF0IjoxNjEyMjY0Nzg3fQ.zhb5WUld_X3LeTf4dxPjFX7NlpFVe1VSMkbnK0FAf8U";
API.defaults.headers["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJ1c2VyIiwiX2lkIjo0OCwiZW1haWwiOiJxd2VydHl1c2VyQGdtYWlsLmNvbSIsInVzZXJDYXRlZ29yeSI6MCwiaGFzV29ya2VyUHJvZmlsZSI6ZmFsc2UsIm1vYmlsZSI6IiIsImNhdGVnb3J5SWQiOm51bGx9LCJpYXQiOjE2MTY5NDk1ODYsImV4cCI6MTYyMTEyNTU4Nn0.W_NUr3ir67OgxhDKikeXI8KTDN46ni1-F798xz7ckoA";
Axios.interceptors.response.use(
    function (response) {
        return Promise.resolve(response);
    },
    function (error) {
        // handle error
        handleError(error);

        return Promise.reject(error);
    });

export { API } */

import { APIErrorResponse } from '@/types/api';
import Axios, { AxiosError } from 'axios';
import handleError from "./handleError";
import store from "@/store"

const API = { ...Axios }

store.dispatch("Admin/getToken");

// API.defaults.baseURL = "https://cors-anywhere.herokuapp.com/https://chochos-list.herokuapp.com/api";
API.defaults.baseURL = "https://chochos-list.herokuapp.com/api";
// API.defaults.baseURL = "http://localhost:8083/api";
API.defaults.headers.post["Content-Type"] = "application/json";
// API.defaults.headers["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJ1c2VyIiwiX2lkIjo0OCwiZW1haWwiOiJxd2VydHl1c2VyQGdtYWlsLmNvbSIsInVzZXJDYXRlZ29yeSI6MCwiaGFzV29ya2VyUHJvZmlsZSI6ZmFsc2UsIm1vYmlsZSI6IiIsImNhdGVnb3J5SWQiOm51bGx9LCJpYXQiOjE2MTY5NDk1ODYsImV4cCI6MTYyMTEyNTU4Nn0.W_NUr3ir67OgxhDKikeXI8KTDN46ni1-F798xz7ckoA";
API.defaults.headers["Authorization"] = `Bearer ${store.state.Admin.token}`;

// store.dispatch("Admin/getUser");
Axios.interceptors.response.use(
    function (response) {
        return Promise.resolve(response);
    },
    function (error: AxiosError<APIErrorResponse>) {
        // handle error
        handleError(error);

        return Promise.reject(error);
    });

export { API }
