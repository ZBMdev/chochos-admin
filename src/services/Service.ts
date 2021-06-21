// import Category from '@/models/Category';
// import Product from '@/models/Product';
import { APIResponse, PaginatedResponse, PaginatedResponse2 } from '@/types/api'
import { API } from '@/utils/api'
import { AxiosResponse } from 'axios';

export default class Service<Typ, CParam> {
    url!: string;

    constructor(url?: string) {
        if (url) { this.url = url; }
    }

    async getAllPaginated(query?: string) {
        return API.get(`${this.url}${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse<PaginatedResponse<Typ>>>) => {
                return data.data;
            }).catch((error) => {
                console.error("Service.ts >>>>>", error.message, error)
                throw error;
            });
    }

    async getAllPaginated2(query?: string) {
        return API.get(`${this.url}${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse<PaginatedResponse2<Typ>>>) => {
                return data.data;
            }).catch((error) => {
                console.error("Service.ts >>>>>", error.message, error)
                throw error;
            });
    }

    async getAll(query?: string) {
        return API.get(`${this.url}${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse<Typ[]>>) => {
                return data.data;
            }).catch((error) => {
                console.error("Service.ts >>>>>", error.message, error)
                throw error;
            });
    }

    async getOne(id: number, query?: string) {
        return API.get(`${this.url}/${id}${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse<Typ>>) => {
                return data.data;
            }).catch((error) => {
                console.error("Service.ts >>>>>", error.message, error)
                throw error;
            });
    }

    async create(payload: Partial<CParam>, query?: string) {
        return API.post(`${this.url}${query ? '?' + query : ''}`, payload)
            .then(({ data }: AxiosResponse<APIResponse<Typ>>) => {
                return data.data
            }).catch((error) => {
                console.error("Service.ts >>>>>", error.message, error)
                throw error;
            });
    }

    async update(id: number, payload: Partial<CParam>, query?: string) {
        return API.patch(`${this.url}/${id}${query ? '?' + query : ''}`, payload)
            .then(({ data }: AxiosResponse<APIResponse<Typ>>) => {
                return data.data
            }).catch((error) => {
                console.error("Service.ts >>>>>", error.message, error)
                throw error;
            });
    }

    async put(id: number, payload: Partial<CParam>, query?: string) {
        return API.put(`${this.url}/${id}${query ? '?' + query : ''}`, payload)
            .then(({ data }: AxiosResponse<APIResponse<Typ>>) => {
                return data.data
            }).catch((error) => {
                console.error("Service.ts >>>>>", error.message, error)
                throw error;
            });
    }

    async delete(id: number, query?: string): Promise<string> {
        return API.delete(`${this.url}/${id}${query ? '?' + query : ''}`)
            .then(({ data }: AxiosResponse<APIResponse<{}>>) => {
                return data.message
            });
    }

}