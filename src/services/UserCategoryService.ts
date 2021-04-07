import { UserCategoryData, UserCategoryCreate } from '@/types/customer'
import Service from './Service';
import qs from 'qs';

export default class UserCategoryService extends Service<UserCategoryData, UserCategoryCreate>{
    url = "/userCategories";

    allUsersCategory = qs.stringify({
        limit: 1000000
    });
}

