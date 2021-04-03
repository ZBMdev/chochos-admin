/* eslint-disable */
// import { APIResponse, PaginatedResponse } from '@/types/api';
import { JobData, JobRequest } from '@/types/jobs'
import qs from 'qs';
// import { API } from '@/utils/api';
// import { AxiosResponse } from 'axios';
import Service from './Service';

export default class JobService extends Service<JobData, JobRequest>{
    url = "/jobs";
    
    allJobs = qs.stringify({
        limit: 1000000
    });
}
