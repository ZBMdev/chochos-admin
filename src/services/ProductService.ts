/* eslint-disable */
// import Product from '@/models/Product';
import { APIResponse, PaginatedResponse } from '@/types/api';
import { ProductCreateParam, ProductData, UpdateProductParam, ProductImageUpdateParam, ProductImage } from '@/types/product'
// import { ProductCreateParam, ProductData } from '@/types/product'
import { API } from '@/utils/api';
import { AxiosResponse } from 'axios';
import Service from './Service';
import qs from 'qs'

export default class ProductService extends Service<ProductData, ProductCreateParam>{

    url = "/products";

    allProducts = qs.stringify({
        limit: 1000000,
        pageSize: 1000000,
    });

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

    async updateImages(payload: ProductImageUpdateParam, productId: number) {
        return API.patch(`${this.url}/${productId}/images/sync`, payload)
            .then(({ data }: AxiosResponse<APIResponse<ProductData>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    }

    /* async updateProduct(payload: UpdateProductParam, productId: number) {
        return API.put(`${this.url}/${productId}`, payload)
            .then(({ data }: AxiosResponse<APIResponse<ProductCreateParam>>) => {
                return data.data;
            }).catch((error) => {
                console.log(error.message, error)
                throw error;
            });
    } */
    
}
