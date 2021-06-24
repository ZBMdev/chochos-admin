import { APIResponse } from '@/types/api';
import {RegisterObject, LoginObject, Admins, AdminsData, AdminCreateParam, AdminUpdateParam, AdminChangePassword, AdminData, AdminLoginParam, AdminResetPassParam, AdminInitResetPassParam, LoginData } from '@/types/admin'
import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class AdminService extends Service<AdminData, AdminUpdateParam>{
    url = "/admins";
   // url = "/views/auth/";
    constructor(url?: string) {
        super(url);
    }
    allAdmins = qs.stringify({
        limit: 1000000,
        pageSize: 1000000,
    });
    /**
     * Register
     */
    public login(payload: AdminLoginParam) {
        return API.post('/auth/login', payload)
            .then(({ data }: AxiosResponse<APIResponse<LoginData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("Login error >>>>>", error.message, error);
                throw error;
            });
    }
    
    /**
     *Create
     */
    public createadmin(payload: AdminCreateParam){
        return API.post('/admins', payload)
            .then(({ data }: AxiosResponse<APIResponse<AdminCreateParam>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>>>", error.message.error)
            })
    }


    /**
     *Update
     */
    public updateadmin(id: number, payload: AdminUpdateParam,  query?: string){
        return API.put(`admins/${id}${query ? '?' + query : ''}`, payload)
            .then(({ data }: AxiosResponse<APIResponse<AdminUpdateParam>>) => {
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
       return API.post(`/admins/${id}/change-password`, payload)
           .then(({ data }: AxiosResponse<APIResponse<LoginData>>) => {
               return data.data;
           }).catch((error) => {
               console.error("AdminService.ts >>>>>>>", error.message.error)
               throw error;
           });
    }
  

    public resetPassword(payload: AdminResetPassParam) {
        return API.post('/admins/reset-password', payload)
            .then(({ data }: AxiosResponse<APIResponse<LoginData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>", error.message, error)
                throw error;
            });
    }
    public getCurrentAdmin() {
        // return API.get('/admins/profile')
        return API.get('/admins')
            .then(({ data }: AxiosResponse<APIResponse<AdminsData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>", error.message, error)
                throw error;
            });
    }
}
