/* eslint-disable */
// import Product from '@/models/Product';
import { APIResponse, PaginatedResponse } from '@/types/api';
// import { ProductCreateParam, ProductData, ProductImageUpdateParam, ImageData } from '@/types/product'
import { ProductCreateParam, ProductData } from '@/types/product'
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';

export default class ProductService extends Service<ProductData, ProductCreateParam>{

    url = "/admin/products";
    constructor(url?: string) {
        super(url);
    }

    // async getAllPaginated(findOptions = "") {
    //     return API.get(`/products?${findOptions}`)
    //         .then(({ data }: AxiosResponse<APIResponse<PaginatedResponse<ProductData>>>) => {
    //             return data.data;
    //         }).catch((error) => {
    //             console.log(error.message, error)
    //             throw error;
    //         });
    // }

    async search(findOptions = "") {
        return API.get(`/products/filter?${findOptions}`)
            .then(({ data }: AxiosResponse<APIResponse<PaginatedResponse<ProductData>>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }

    /* async updateImages(payload: ProductImageUpdateParam, productId: number) {
        return API.patch(`${this.url}/${productId}/images/sync`, payload)
            .then(({ data }: AxiosResponse<APIResponse<ProductData>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    } */
    
}
