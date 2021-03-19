/* eslint-disable */

import { BombsightImage } from '@/types/bombsight';
import { CategoryData } from '@/types/category';
import { ImageData, ProductCreateParam, ProductData, ProductImageUpdateParam, StockStatus } from '@/types/product'
// eslint-disable-next-line
// @ts-ignore
import { format } from "timeago.js";
import Category from './Category';
import Model from './Model';

export default class Product extends Model {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    max_price!: number;
    discount!: number;
    quantity!: number;
    protected colors: string = ""; // Comma separated
    protected size_variation: string = ""; // Comma separated
    protected size_metric: string = ""; // Comma separated
    average_rating!: number;
    orders!: number;
    reviews!: number;
    specifications: string = "";
    protected tags: string = "";
    is_published = false;
    published_at!: Date;
    created_at!: Date;
    updated_at!: Date;
    images: ImageData[] = [];
    categories: Category[] = [];

    constructor(data?: Partial<ProductData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
        if (data && data.categories) {
            this.categories = data.categories.map((cat) => new Category(cat));
        } else {
            this.categories = []
        }
    }


    get stockAvailability() {
        return (this.quantity > 10) ? StockStatus.INSTOCK : (this.quantity > 0) ? StockStatus.LOWSTOCK : StockStatus.OUTOFSTOCK;
    }

    get rating() {
        return this.average_rating;
    }
    get priceCurrency() {
        return this.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
    }

    get tagList() {
        if (!!!this.tags) return [];
        return this.tags.trim().split(",")
        // .map((t) => t.trim());
    }
    set tagList(tags: string[]) {
        this.tags = tags.join(",")
    }

    get colorsList() {
        if (!!!this.colors) return [];
        return this.colors.trim().split(",")
    }
    set colorsList(colors: string[]) {
        this.colors = colors.join(",")
    }

    get sizeVariationList() {
        if (!!!this.size_variation) return [];
        return this.size_variation.trim().split(",")
    }
    set sizeVariationList(size_variation: string[]) {
        this.size_variation = size_variation.join(",")
    }

    get sizeMetricList() {
        if (!!!this.size_metric) return [];
        return this.size_metric.trim().split(",")
    }
    set sizeMetricList(size_metric: string[]) {
        this.size_metric = size_metric.join(",")
    }

    get specificationsObj() {
        if (!!!this.specifications) return {};
        return JSON.parse(this.specifications)
    }
    set specificationsObj(specifications: Record<string, string>) {
        this.specifications = JSON.stringify(specifications)
    }

    get publishedAtFormated() {
        return this.published_at ? format(this.published_at) : "-";
    }

    get categoriesNames() {
        return this.categories.map((category) => {
            return category.name;
        }).join(", ")
    }

    get mainImage() {
        return this.images[0] ? this.images[0].url : require("@/assets/images/default-placeholder-image.png");
    }

    get imageUrls() {
        return Product.toImageUrls(this.images);
    }

    static toImageUrls(images: (ImageData | BombsightImage)[]): ProductImageUpdateParam {
        const imageUrls = images.map((image) => image.url);
        return { urls: imageUrls };
    }

    toCreateParam() {
        return {
            name: this.name,
            description: this.description,
            price: this.price,
            discount: this.discount ? this.discount : 0,
            quantity: this.quantity,
            size_variation: this.size_variation,
            size_metric: this.size_metric,
            specifications: this.specifications,
            tags: this.tags,
            is_published: this.is_published,
            published_at: this.published_at,
            categories: this.categories,
        } as ProductCreateParam;
    }


}