/* eslint-disable */
import { SkillsData, CreateSkillsParam } from "@/types/skills";
import Service from "./Service";
import { APIResponse } from '@/types/api'
import { API } from '@/utils/api'
import { AxiosResponse } from 'axios';
import qs from "qs";

export default class SkillsService extends Service<SkillsData, CreateSkillsParam> {
    url = "/skills";

    allSkills = qs.stringify({
        limit: 1000000
    });

    /* getAllSkills() {
        return API.get(`/skills`)
            .then(({ data }: AxiosResponse<APIResponse<SkillsData[]>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }

    updateSkills(payload: CreateSkillsParam, id: number) {
        return API.patch(`/skills/${id}`, payload)
            .then(({ data }: AxiosResponse<APIResponse<SkillsData>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    } */

}
