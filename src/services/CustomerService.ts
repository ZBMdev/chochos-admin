/* eslint-disable */
// import { APIResponse, PaginatedResponse } from '@/types/api';
import { CustomerData, CustomerRegisterParams, LoginType } from '@/types/customer'
import qs from 'qs';
// import { API } from '@/utils/api';
// import { AxiosResponse } from 'axios';
import Service from './Service';

export default class CustomerService extends Service<CustomerData, CustomerRegisterParams>{
    url = "/admin/users";
    unanonymousUsersQuery = qs.stringify({
        login_type: [
            LoginType.APPLE,
            LoginType.EMAIL_N_PASSWORD,
            LoginType.FACEBOOK,
            LoginType.GITHUB,
            LoginType.GOOGLE,
            LoginType.LINKEDLN,
            LoginType.TWITTER,
        ]
    })
    allUsers = qs.stringify({
        limit: 1000000
    });
}
