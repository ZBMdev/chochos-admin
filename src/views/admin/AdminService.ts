// import { APIResponse, APIResponse4 } from '@/types/api';
import { APIResponse } from '@/types/api';
import { AdminCreateParam, AdminUpdateParam, AdminChangePassword, AdminData, AdminLoginParam, VerifyEmail, ForgotPassword, AdminResetPassParam, ResendOTP,GenerateUsername, LoginData } from '@/types/admin'
// import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from '@/services/Service';

export default class AdminService extends Service<AdminData, AdminUpdateParam>{
    // url = "/auth";
    constructor(url?: string) {
        super(url);
    }
    /**
     * Login
     */
    /* public login(payload: AdminLoginParam) {
        return API.post('/auth/signin', payload)
            .then(({ data }: AxiosResponse<APIResponse4<LoginData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>", error.message, error)
                throw error;
            });
    }*/
    public login(payload: AdminLoginParam) {
        return API.post('/auth/signin', payload)
            .then(({ data }: AxiosResponse<APIResponse<LoginData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>", error.message, error)
                throw error;
            });
    }
    
    /**
     *Create
     */
    public createadmin(payload: AdminCreateParam){
        return API.post('/auth/signup', payload)
            .then(({ data }: AxiosResponse<APIResponse<AdminCreateParam>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>>>", error.message.error)
            })
    }
        
    /**
    *Verify Email
     */
    public verifyEmail(payload: VerifyEmail){
        return API.post('/auth/verify', payload)
            .then(({ data }: AxiosResponse<APIResponse<LoginData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>>>", error.message.error)
            })
    }

    public forgotPassword(payload: ForgotPassword) {
        return API.post('/auth/forgot-password', payload)
            .then(({ data }: AxiosResponse<APIResponse<ForgotPassword>>) => {
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
        return API.put('/auth/reset-password', payload)
            .then(({ data }: AxiosResponse<APIResponse<LoginData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>", error.message, error)
                throw error;
            });
    }

    public resendOTP(payload: ResendOTP) {
        return API.post('/auth/resend-otp', payload)
            .then(({ data }: AxiosResponse<APIResponse<LoginData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>", error.message, error)
                throw error;
            });
    }

    public getCurrentUser() {
        return API.get('/admin/profile',)
            .then(({ data }: AxiosResponse<APIResponse<AdminData>>) => {
                return data.data;
            }).catch((error) => {
                console.error("AdminService.ts >>>>>", error.message, error)
                throw error;
            });
    }
}
