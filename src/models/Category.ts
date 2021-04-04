/* eslint-disable */

import Product from './Product';
import { CategoryCreateParam, CategoryData, ProductCategory } from '@/types/category'
// eslint-disable-next-line
// @ts-ignore
import { format } from "timeago.js";

export default class Category {
    id!:         number;
    name!:       string;
    updated_on!: Date;
    created_on!: Date;
    ProductCategory!: ProductCategory;
    products!: Product[]

    constructor(data?: Partial<CategoryData>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    get createdAtFormated() {
        return format(this.created_on);
    }

    toCreateParam(password: string) {
        return {
            name: this.name,
        } as CategoryCreateParam;
    }
}