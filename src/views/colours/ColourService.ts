import { APIResponse3, APIResponse2, APIResponse } from '@/types/api';
import { ColourData, NewColourData, Pagination } from '@/types/colour';
// import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from '@/services/Service';

export default class ColourService extends Service<ColourData, NewColourData>{
    url = "/metadata/colours?select=-_id,name,hex";
    
    constructor(url?: string) {
        super(url);
    }

    async getSummary(query?: string) {
        return API.get(`${this.url}${query ? '?' + query : ''}`)
            //.then(({ data }: AxiosResponse<APIResponse3<ColourData>>) => {
            .then(({ data }: AxiosResponse<APIResponse3<Pagination>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }

    async getTime(query?: string) {
        return API.get(`${this.url}${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse<NewColourData>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }
}