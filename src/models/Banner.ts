/* eslint-disable*/
import { BannerData, BannerCreateParam } from "@/types/banner";
// import { format } from "timeago.js";
import Model from "./Model";
import Product from "./Product";
import { string, object, ref } from 'yup';
import { FormSchema } from '@/types/dynamicForm';
// import qs from "qs";
// import ProductService from "@/services/ProductService";

export default class Banner extends Model {
    id!: number;
    name = "";
    description = "";
    order = 0;
    image_url!: string;
    activated = true;
    created_at!: Date;
    updated_at!: Date;
    products: Product[] = [];

    constructor(data?: Partial<BannerData>) {
        super();
        if (data) {
            Object.assign(this, data);
            if (data.products) {
                this.products = data.products.map((prod) => {
                    delete prod.BannerProduct;
                    return new Product(prod)
                })
            }
        }
    }

    toCreateParam() {
        return {
            name: this.name,
            description: this.description,
            order: this.order,
            image_url: this.image_url,
            activated: this.activated,
            products: this.products,
        } as BannerCreateParam;
    }

}

export const bannerCreateForm = (products: Product[], values: Record<string, any>): FormSchema  => {
   const productOptions = products.map((prod) => ({ tag: "option", text: prod.name, value: prod}))
    return {
        fields: [
            {
                label: "Name",
                name: "name",
                as: "input",
            },
            {
                label: "Description",
                name: "description",
                as: "textarea",
            },
            // {
            //     label: "Image",
            //     name: "image",
            //     as: "input",
            //     type: "file",
            // },
            // {
            //     label: "Activated",
            //     name: "activated",
            //     as: "input",
            //     type: "checkbox",
            // },
            // {
            //     label: "Products",
            //     name: "products",
            //     as: "select",
            //     multiple: true,
            //     shouldFilter: true,
            //     filter(value: string) {
            //         (new ProductService()).search(qs.stringify({ is_published: true, name: value, limit: 30 }))
            //             .then((products) => {
            //                 this.options = [...products.data.map((prod) => new Product(prod))];
            //                 return products.data.map((prod) => new Product(prod));
            //             });
            //     },
            //     options: products,
            //     optionLabel: "name",
            //     children: productOptions,
            //     placeholder: "Select Products",
            // },
        ],
        validation: object({
            name: string().required(),
            description: string(),
        }),
        values,
    }
};
