import { APIResponse, APIResponse2, PaginatedResponse } from '@/types/api';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import { ArtisanData, ArtisanRegisterParams, ArtisanSummary } from '@/types/artisan'
import { ReviewData, Rating, Reviewer } from '@/types/reviews'
import Service from './Service';
import qs from 'qs';

export default class ArtisanService extends Service<ArtisanData, ArtisanRegisterParams>{
    url = "/artisans";

    url2 = "/admins"
    url3 = "/auth"

    allArtisans = qs.stringify({
        limit: 1000000,
        pageSize: 1000000,
    });

    public createArtisan(payload: ArtisanRegisterParams){
        return API.post(`${this.url3}/register`, payload)
            .then(({ data }: AxiosResponse<APIResponse<PaginatedResponse<ArtisanRegisterParams>>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>>>", error.message.error)
            })
    }

    public getReviews(id: number,  query?: string) {
        return API.get(`${this.url}/${id}/ratings${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse2<ReviewData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("Service.ts >>>>>", error.message, error)
                throw error;
            });
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

