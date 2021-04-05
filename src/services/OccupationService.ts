/* eslint-disable */
import { OccupationData, OccupationCreateParam } from "@/types/occupation";
import Service from "./Service";
import { APIResponse } from '@/types/api'
import { API } from '@/utils/api'
import { AxiosResponse } from 'axios';
import qs from "qs";

export default class OccupationsService extends Service<OccupationData, OccupationCreateParam > {
    url = "/skills";

    allOccupations = qs.stringify({
        limit: 1000000
    });
    
}
