/* eslint-disable */
import { APIResponse, APIResponse2 } from '@/types/api';
import {  JobRequestData, JobRequestSummary, BillOfQuantity } from '@/types/jobRequest'
import { UserRequest } from '@/types/UserRequest'
import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';
import UserRequestModel from '@/models/UserRequest';

export default class JobService extends Service<JobRequestData, BillOfQuantity>{
    url = "/jobRequests";
    
    allJobs = qs.stringify({
        limit: 1000000,
        pageSize: 1000000,
    });

    public getUserRequest(id: number, query?: string) {
        return API.get(`${this.url}/${id}${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse2<UserRequest>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }

    async getSummary(query?: string) {
        return API.get(`${this.url}`)
            .then(({ data }: AxiosResponse<APIResponse<JobRequestSummary>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }
}
