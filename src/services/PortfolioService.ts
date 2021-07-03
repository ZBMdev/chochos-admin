import { APIResponse2, PaginatedResponse } from '@/types/api';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import { PortfolioSummary, Portfolio, Row } from '@/types/portfolio'
import Service from './Service';
import qs from 'qs';

export default class ArtisanService extends Service<PortfolioSummary, Portfolio>{
    url = "/v1/users";
    allArtisans = qs.stringify({
        limit: 1000000,
        pageSize: 1000000,
    });

    public userPortfolio(id: number,  query?: string) {
        return API.get(`${this.url}/${id}/portfolios${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse2<PortfolioSummary>>) => {
                return data.data;
            }).catch((error) => {
                console.error("Service.ts >>>>>", error.message, error)
                throw error;
            });
    }
}

