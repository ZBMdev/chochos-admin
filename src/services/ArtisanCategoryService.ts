import { APIResponse } from '@/types/api';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import { ArtisanCategoryData, ArtisanCategoryCreate } from '@/types/artisanCategory'
import Service from './Service';
import qs from 'qs';

export default class ArtisanCategoryService extends Service<ArtisanCategoryData, ArtisanCategoryCreate>{
    url = "/v1/occupationCategories";

    allArtisansCategory = qs.stringify({
        limit: 1000000,
        pageSize: 1000000,
    });

    getAllCategories() {
        return API.get(`/v1/occupationCategories`)
            .then(({ data }: AxiosResponse<APIResponse<ArtisanCategoryData[]>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }

    updateCategory(payload: ArtisanCategoryCreate, id: number) {
        return API.patch(`/v1/occupationCategories/${id}`, payload)
            .then(({ data }: AxiosResponse<APIResponse<ArtisanCategoryData>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }

}

