/* eslint-disable */
import { APIResponse } from '@/types/api';
import { JobData, JobRequest, JobsSummary } from '@/types/jobs'
import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class JobService extends Service<JobData, JobRequest>{
    url = "/jobs";
    
    allJobs = qs.stringify({
        limit: 1000000,
        pageSize: 1000000,
    });

    async getSummary(query?: string) {
        return API.get(`${this.url}`)
            .then(({ data }: AxiosResponse<APIResponse<JobsSummary>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }
}
