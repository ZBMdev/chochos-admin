import { APIResponse } from '@/types/api';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import { VendorData, VendorRegisterParams, VendorSummary } from '@/types/vendors'
import Service from './Service';
import qs from 'qs';

export default class VendorService extends Service<VendorData, VendorRegisterParams>{
    url = "/vendors";

    allUsers = qs.stringify({
        limit: 1000000
    });

    async getSummary(query?: string) {
        return API.get(`${this.url}`)
            .then(({ data }: AxiosResponse<APIResponse<VendorSummary>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }
}

