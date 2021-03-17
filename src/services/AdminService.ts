import { APIResponse } from '@/types/api';
import { AdminCreateParam, AdminData, AdminLoginParam, LoginData } from '@/types/admin'
// import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class AdminService extends Service<AdminData, AdminCreateParam>{
    url = "/admin/";
    constructor(url?: string) {
        super(url);
    }
    /**
     * Register
     */
    public login(payload: AdminLoginParam) {
        return API.post('/account/sign-in', payload)
            .then(({ data }: AxiosResponse<APIResponse<LoginData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>", error.message, error)
                throw error;
            });
    }
}