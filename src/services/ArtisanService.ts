import { APIResponse, PaginatedResponse } from '@/types/api';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import { ArtisanData, ArtisanRegisterParams, ArtisanSummary } from '@/types/artisan'
import Service from './Service';
import qs from 'qs';

export default class ArtisanService extends Service<ArtisanData, ArtisanRegisterParams>{
    url = "/artisans";

    url2 = "/admins"
    url3 = "/auth"

    allArtisans = qs.stringify({
        limit: 1000000
    });

    public createArtisan(payload: ArtisanRegisterParams){
        return API.post(`${this.url3}/register`, payload)
            .then(({ data }: AxiosResponse<APIResponse<PaginatedResponse<ArtisanRegisterParams>>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>>>", error.message.error)
            })
    }

    async getSummary(query?: string) {
        return API.get(`${this.url}`)
            .then(({ data }: AxiosResponse<APIResponse<ArtisanSummary>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }
}

