/* eslint-disable */
import { APIResponse } from '@/types/api';
import {  JobRequestData, JobRequestSummary, BillOfQuantity } from '@/types/jobRequest'
import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class JobService extends Service<JobRequestData, BillOfQuantity>{
    url = "/jobRequests";
    
    allJobs = qs.stringify({
        limit: 1000000
    });

    async getSummary(query?: string) {
        return API.get(`${this.url}`)
            .then(({ data }: AxiosResponse<APIResponse<JobRequestSummary>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }
}
