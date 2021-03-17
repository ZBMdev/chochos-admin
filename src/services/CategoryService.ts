/* eslint-disable */
import { CategoryData, CategoryCreateParam } from "@/types/category";
import Service from "./Service";
import { APIResponse } from '@/types/api'
import { API } from '@/utils/api'
import { AxiosResponse } from 'axios';

export default class CategoryService extends Service<CategoryData, CategoryCreateParam> {
    url = "/admin/categories";

    getWithProducts() {
        return API.get(`${this.url}?withProducts=1&notNested=1`)
            .then(({ data }: AxiosResponse<APIResponse<CategoryData[]>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }
}
