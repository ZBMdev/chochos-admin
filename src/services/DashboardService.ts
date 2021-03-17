import { APIResponse } from '@/types/api';
import { DashboardSummary, TimeSummary } from '@/types/dashboard';
// import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class DashboardService extends Service<DashboardSummary, TimeSummary>{
    url = "/dashboard/admin";
    
    constructor(url?: string) {
        super(url);
    }

    async getSummary(query?: string) {
        return API.get(`${this.url}${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse<DashboardSummary>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }

    async getTime(query?: string) {
        return API.get(`${this.url}${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse<TimeSummary>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }
}