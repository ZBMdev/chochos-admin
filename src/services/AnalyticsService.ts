import { APIResponse } from '@/types/api';
import { AnalyticsSummary, TimeSummary, ProductRatingSummary } from '@/types/analytics';
// import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class DashboardService extends Service<AnalyticsSummary,TimeSummary>{
    url = "/dashboard/admin";
    
    constructor(url?: string) {
        super(url);
    }

    async getAnalytics(query?: string) {
        return API.get(`${this.url}${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse<AnalyticsSummary>>) => {
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

    async getProductRating(query?: string) {
        return API.get(`${this.url}${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse<ProductRatingSummary>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }
}