/* eslint-disable */
// import Product from '@/models/Product';
import { APIResponse, PaginatedResponse } from '@/types/api';
import { ProductCreateParam, ProductData } from '@/types/product'
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class ProductService extends Service<ProductData, ProductCreateParam>{
    url = "/admin/products";

    async getAllPaginated(findOptions = "page=1&limit=1000000") {
        return API.get(`/products?${findOptions}`)
            .then(({ data }: AxiosResponse<APIResponse<PaginatedResponse<ProductData>>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }

    async createImage(payload: ImageData, productId: number) {
        return API.post("/admin/images", payload)
            .then(({ data }: AxiosResponse<APIResponse<ImageData>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }
}