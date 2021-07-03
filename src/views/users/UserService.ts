// import { APIResponse, APIResponse4 } from '@/types/api';
import { APIResponse3 } from '@/types/api';
import { UserData, Profile, Pagination } from '@/types/users'
// import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from '@/services/Service';

// export default class AdminService extends Service<UserData, Profile>{
// export default class AdminService extends Service<UserData, Pagination>{
    export default class AdminService extends Service<Profile, Pagination>{
    url = "/admin/users";
    constructor(url?: string) {
        super(url);
    }
    
    async getSummary(query?: string) {
        return API.get(`${this.url}${query ? '?' + query : ''}`)
            // .then(({ data }: AxiosResponse<APIResponse3<Pagination>>) => {
                .then(({ data }: AxiosResponse<APIResponse3<Profile>>) => {
                return data.data;
            }).catch((error) => {
                throw error;
            });
    }

}
