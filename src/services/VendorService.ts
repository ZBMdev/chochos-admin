// import { APIResponse } from '@/types/api';
// import { API } from '@/utils/api';
// import { AxiosResponse } from 'axios';
import { VendorData, VendorRegisterParams } from '@/types/vendors'
import Service from './Service';
import qs from 'qs';

export default class VendorService extends Service<VendorData, VendorRegisterParams>{
    url = "/vendors";

    allUsers = qs.stringify({
        limit: 1000000
    });
}

