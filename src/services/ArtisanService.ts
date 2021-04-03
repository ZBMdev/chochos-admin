// import { APIResponse } from '@/types/api';
// import { API } from '@/utils/api';
// import { AxiosResponse } from 'axios';
import { ArtisanData, ArtisanRegisterParams } from '@/types/artisan'
import Service from './Service';
import qs from 'qs';

export default class ArtisanService extends Service<ArtisanData, ArtisanRegisterParams>{
    url = "/artisans";

    allUsers = qs.stringify({
        limit: 1000000
    });
}

