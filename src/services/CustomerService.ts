/* eslint-disable */
import { APIResponse, PaginatedResponse } from '@/types/api';
import { CustomerData, RegisterObject, CustomerSummary } from '@/types/customer'
import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class CustomerService extends Service<CustomerData, RegisterObject>{
    url = "/users";
    
    allUsers = qs.stringify({
        limit: 1000000
    });

    async getSummary(query?: string) {
        return API.get(`${this.url}`)
            .then(({ data }: AxiosResponse<APIResponse<CustomerSummary>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }
}
