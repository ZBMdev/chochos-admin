import { APIResponse } from '@/types/api';
import { RoleCreateParam, RoleData, RoleResourceParams } from '@/types/roles'
// import qs from 'qs';
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class RoleService extends Service<RoleData, RoleCreateParam>{
    url = "/admin/roles";
   // url = "/views/auth/";
    constructor(url?: string) {
        super(url);
    }

    addResource(payload: RoleResourceParams) {
        return API.post('/admin/roles/resource', payload)
            .then(({ data }: AxiosResponse<APIResponse<RoleData>>) => {
                return data.data
            }).catch((error) => {
                throw error;
            });
    }

    deleteResource(roleId: number, id: number) {
        return API.delete(`/admin/roles/${roleId}/resource/${id}`)
            .then(({ data }: AxiosResponse<APIResponse<null>>) => {
                return data.message
            }).catch((error) => {
                throw error;
            });
    }
}