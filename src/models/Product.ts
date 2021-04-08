/* eslint-disable */

import { BombsightImage } from '@/types/bombsight';
import { CategoryData } from '@/types/category';
// import { ImageData, ProductCreateParam, ProductData, ProductImageUpdateParam, StockStatus } from '@/types/product'
import { ProductImage, ProductData, ProductCreateParam, ProductImageUpdateParam, StockStatus } from '@/types/product'
// eslint-disable-next-line
// @ts-ignore
import { format } from "timeago.js";
import Category from './Category';
import Model from './Model';

export default class Product extends Model {
    id!:                 number;
    name!:               string;
    description!:        string;
    colour!:             string;
    quantity!:           number;
    isDeleted!:          null;
    brand!:              null;
    metricQuantity!:     number;
    metric!:             string;
    rating!:             number;
    unitPrice!:          number;
    userId!:             number;
    productCategoryId!:  number;
    updatedOn!:          Date;
    createdOn!:          Date;
    productCategory_id!: number;
    productImages:      ProductImage[] = [];
    
    constructor(data?: Partial<ProductData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }


    get stockAvailability() {
        return (this.quantity > 10) ? StockStatus.INSTOCK : (this.quantity > 0) ? StockStatus.LOWSTOCK : StockStatus.OUTOFSTOCK;
    }

    get averageRating() {
        return this.rating;
    }
    get priceCurrency() {
        return this.unitPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
    }


    get coloursList() {
        if (!!!this.colour) return [];
        return this.colour.trim().split(",")
    }
    set coloursList(colour: string[]) {
        this.colour = colour.join(",")
    }


    get sizeMetricList() {
        if (!!!this.metric) return [];
        return this.metric.trim().split(",")
    }
    set sizeMetricList(metric: string[]) {
        this.metric = metric.join(",")
    }


    get mainImage() {
        return this.productImages[0] ? this.productImages[0].url : require("@/assets/images/default-placeholder-image.png");
    }

    get imageUrls() {
        return Product.toImageUrls(this.productImages);
    }

    static toImageUrls(images: (ProductImage | BombsightImage)[]): ProductImageUpdateParam {
        const imageUrls = images.map((image) => image.url);
        return { urls: imageUrls };
    }

    toCreateParam() {
        return {
            name: this.name,
            description: this.description,
            unitPrice: this.unitPrice,
            quantity: this.quantity,
            colour: this.colour,
            brand:  this.brand,
            metricQuantity: this.metricQuantity,
            metric: this.metric,
            rating: this.rating,
            updatedOn: this.updatedOn,
            createdOn: this.createdOn,
        } as ProductCreateParam;
    }


}