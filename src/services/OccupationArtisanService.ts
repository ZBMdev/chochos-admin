/* eslint-disable */
import { OccupationArtisanData, UserCategoryRecord} from "@/types/occupationArtisan";
import Service from "./Service";
import { APIResponse } from '@/types/api'
import { API } from '@/utils/api'
import { AxiosResponse } from 'axios';
import qs from "qs";

export default class OccupationsService extends Service<OccupationArtisanData, UserCategoryRecord > {
    url = "/occupations";

    allOccupations = qs.stringify({
        limit: 1000000,
        pageSize: 1000000,
    });

    // public occupationartisans(id: number){
    //     async delete(id: number, query?: string): Promise<string> {
    //         return API.delete(`${this.url}/${id}${query ? '?' + query : ''}`)
         
    //     return API.get(`/occupations/${id}`)
    //         .then(({ data }: AxiosResponse<APIResponse<AdminUpdateParam>>) => {
    //             return data.data;
    //         }).catch((error) => {
    //             console.error("AdminService.ts >>>>>>>", error.message.error)
    //         })
    // }
    
}
