import { APIResponse, PaginatedResponse } from '@/types/api';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import { VendorData, VendorRegisterParams, VendorSummary } from '@/types/vendors'
import Service from './Service';
import qs from 'qs';

export default class VendorService extends Service<VendorData, VendorRegisterParams>{
    url = "/vendors";
    url2 = "/auth";

    allUsers = qs.stringify({
        limit: 1000000
    });

    public createVendor(payload: VendorRegisterParams){
        return API.post(`${this.url2}/register`, payload)
            .then(({ data }: AxiosResponse<APIResponse<PaginatedResponse<VendorRegisterParams>>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>>>", error.message.error)
            })
    }

    async getSummary(query?: string) {
        return API.get(`${this.url}`)
            .then(({ data }: AxiosResponse<APIResponse<VendorSummary>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }
}

