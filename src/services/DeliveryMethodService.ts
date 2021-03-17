// import { APIResponse, PaginatedResponse } from '@/types/api';
import { DeliveryMethodCreateParam, DeliveryMethodData } from '@/types/delivery-method'
// import qs from 'qs';
// import { API } from '@/utils/api';
// import { AxiosResponse } from 'axios';
import Service from './Service';

export default class DeliveryMethodService extends Service<DeliveryMethodData, DeliveryMethodCreateParam>{
    url = "/admin/delivery-methods";
    constructor(url?: string) {
        super(url);
    }
}