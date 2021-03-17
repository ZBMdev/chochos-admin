// import { APIResponse, PaginatedResponse } from '@/types/api';
import { OrderData } from '@/types/orders'
// import qs from 'qs';
// import { API } from '@/utils/api';
// import { AxiosResponse } from 'axios';
import Service from './Service';

export default class DeliveryMethodService extends Service<OrderData, {}>{
    url = "/admin/orders";
    constructor(url?: string) {
        super(url);
    }
}