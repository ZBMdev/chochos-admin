// import { APIResponse } from '@/types/api';
// import { API } from '@/utils/api';
// import { AxiosResponse } from 'axios';
import { ArtisanCategoryData, ArtisanCategoryCreate } from '@/types/artisanCategory'
import Service from './Service';
import qs from 'qs';

export default class ArtisanCategoryService extends Service<ArtisanCategoryData, ArtisanCategoryCreate>{
    url = "/v1/occupationCategories";

    allArtisansCategory = qs.stringify({
        limit: 1000000
    });
}

