/* eslint-disable */
// import { APIResponse, PaginatedResponse } from '@/types/api';
import { CustomerData, RegisterObject } from '@/types/customer'
import qs from 'qs';
// import { API } from '@/utils/api';
// import { AxiosResponse } from 'axios';
import Service from './Service';

export default class CustomerService extends Service<CustomerData, RegisterObject>{
    url = "/users";
    
    allUsers = qs.stringify({
        limit: 1000000
    });
}
