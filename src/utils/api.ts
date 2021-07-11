import { APIErrorResponse } from '@/types/api';
import Axios, { AxiosError } from 'axios';
import handleError from "./handleError";
import store from "@/store"

const API = { ...Axios }

store.dispatch("Admin/getToken");

API.defaults.baseURL = "https://chochos-list.herokuapp.com/api";
// API.defaults.baseURL = "http://localhost:8083/api";
API.defaults.headers.post["Content-Type"] = "application/json";
API.defaults.headers["Authorization"] = `Bearer ${store.state.Admin.token}`;
// used before API.defaults.headers["Authorization"] = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InR5cGUiOiJ1c2VyIiwiX2lkIjo0OCwiZW1haWwiOiJxd2VydHl1c2VyQGdtYWlsLmNvbSIsInVzZXJDYXRlZ29yeSI6MCwiaGFzV29ya2VyUHJvZmlsZSI6ZmFsc2UsIm1vYmlsZSI6IiIsImNhdGVnb3J5SWQiOm51bGx9LCJpYXQiOjE2MjQ0ODM0NjUsImV4cCI6MTYyODY1OTQ2NX0.e0_s603o7y206TAWvbaCCruFyT1mCKF6gWy5VrMOJ-I";


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
