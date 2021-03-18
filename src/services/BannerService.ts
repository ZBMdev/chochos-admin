// import { APIResponse, PaginatedResponse } from '@/types/api';
import { BannerCreateParam, BannerData } from '@/types/banner'
// import qs from 'qs';
// import { API } from '@/utils/api';
// import { AxiosResponse } from 'axios';
import Service from './Service';

export default class BannerService extends Service<BannerData, BannerCreateParam>{
    url = "/admin/banners";
    constructor(url?: string) {
        super(url);
    }
}