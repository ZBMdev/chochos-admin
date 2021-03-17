// import Category from '@/models/Category';
// import Product from '@/models/Product';
import { APIResponse } from '@/types/api'
import { BombsightImage } from '@/types/bombsight';
import { API } from '@/utils/api'
import { AxiosResponse } from 'axios';
const BASEURL = process.env.VUE_APP_BOMBSIGHT_URL || "https://bombsight.novugrid.com/api/v1";
// const BASEURL = "http://localhost:91/api/v1";
const API_KEY = process.env.VUE_APP_BOMBSIGHT_API_KEY;

// Read the docs: https://documenter.getpostman.com/view/8414365/TW6xmnKa
export default class BombsightService {
    baseUrl = BASEURL;

    async upload(payload: FormData) {
        return API.post(`/upload`, payload, {
            baseURL: this.baseUrl,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${API_KEY}`,
                Origin: "Foxygreen",
            },
        })
            .then(({ data }: AxiosResponse<APIResponse<BombsightImage>>) => {
                return data.data
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }
}