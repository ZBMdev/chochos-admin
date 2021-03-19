// import Category from '@/models/Category';
// import Product from '@/models/Product';
import { APIResponse } from '@/types/api'
import { BombsightImage } from '@/types/bombsight';
import { API } from '@/utils/api'
import { AxiosResponse } from 'axios';
const BASEURL = process.env.VUE_APP_BOMBSIGHT_URL || "https://bombsight.novugrid.com/api/v1";
//const BASEURL = process.env.VUE_APP_BOMBSIGHT_URL || "https://cors-anywhere.herokuapp.com/https://bombsight.novugrid.com/api/v1";
// const BASEURL = "https://chochos-list.herokuapp.com/api";

const API_KEY = process.env.VUE_APP_BOMBSIGHT_API_KEY;

const BombsightAxiosConfig = {
    baseURL: BASEURL,
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${API_KEY}`,
    },
}
// Read the docs: https://documenter.getpostman.com/view/8414365/TW6xmnKa
export default class BombsightService {
    baseUrl = BASEURL;

    async upload(payload: FormData) {
        return API.post(`/upload`, payload, BombsightAxiosConfig)
            .then(({ data }: AxiosResponse<APIResponse<BombsightImage>>) => {
                return data.data
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }

    async uploadMultiple(payload: FormData) {
        return API.post(`/upload/multiple`, payload, BombsightAxiosConfig)
            .then(({ data }: AxiosResponse<APIResponse<BombsightImage[]>>) => {
                return data.data
            }).catch((error) => {
                console.log(error.message, error);
                throw error;
            });
    }
}