import { APIResponse } from '@/types/api';
import { AdminCreateParam, AdminUpdateParam, AdminChangePassword, AdminData, AdminLoginParam, AdminResetPassParam, AdminInitResetPassParam, LoginData } from '@/types/admin'
// import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class AdminService extends Service<AdminData, AdminUpdateParam>{
    url = "/v1/users";
   // url = "/views/auth/";
    constructor(url?: string) {
        super(url);
    }
    /**
     * Register
     */
    public login(payload: AdminLoginParam) {
        return API.post('/login', payload)
            .then(({ data }: AxiosResponse<APIResponse<LoginData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("Login error >>>>>", error.message, error)
                throw error;
            });
    }
    
    /**
     *Create
     */
    public createadmin(payload: AdminCreateParam){
        return API.post('/admin/createadmin', payload)
            .then(({ data }: AxiosResponse<APIResponse<AdminCreateParam>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>>>", error.message.error)
            })
    }
        
    public initResetPassword(payload: AdminInitResetPassParam) {
        return API.post('/account/password/init-reset', payload)
            .then(({ data }: AxiosResponse<APIResponse<{}>>) => {
                return data.message;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>", error.message, error)
                throw error;
            });
    }




    /** 
    *Change Password
    */
    public changepassword(id: number, payload: AdminChangePassword){
       return API.post(`/admin/${id}/change-password`, payload)
           .then(({ data }: AxiosResponse<APIResponse<LoginData>>) => {
               return data.data;
           }).catch((error) => {
               console.error("AdminService.ts >>>>>>>", error.message.error)
               throw error;
           });
    }
  

    public resetPassword(payload: AdminResetPassParam) {
        return API.post('/reset-password', payload)
            .then(({ data }: AxiosResponse<APIResponse<LoginData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>", error.message, error)
                throw error;
            });
    }
    public getCurrentAdmin() {
        return API.get('/admin/profile',)
            .then(({ data }: AxiosResponse<APIResponse<AdminData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>", error.message, error)
                throw error;
            });
    }
}
