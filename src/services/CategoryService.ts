/* eslint-disable */
import { CategoryData, CategoryCreateParam } from "@/types/category";
import Service from "./Service";
import { APIResponse } from '@/types/api'
import { API } from '@/utils/api'
import { AxiosResponse } from 'axios';
import qs from 'qs'

export default class CategoryService extends Service<CategoryData, CategoryCreateParam> {
    url = "/productCategories";

    allCategories = qs.stringify({
        limit: 1000000,
        pageSize: 1000000,
    });

    getAllCategories() {
        return API.get(`/productCategories`)
            .then(({ data }: AxiosResponse<APIResponse<CategoryData[]>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }

    updateCategory(payload: CategoryCreateParam, id: number) {
        return API.patch(`/productCategories/${id}`, payload)
            .then(({ data }: AxiosResponse<APIResponse<CategoryData>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }
}