// import { APIResponse, PaginatedResponse } from '@/types/api';
import { PaymentMethodCreateParam, PaymentMethodData } from '@/types/payment-method'
// import qs from 'qs';
// import { API } from '@/utils/api';
// import { AxiosResponse } from 'axios';
import Service from './Service';

export default class PaymentMethodService extends Service<PaymentMethodData, PaymentMethodCreateParam>{
    url = "/admin/payment-methods";
    constructor(url?: string) {
        super(url);
    }
}