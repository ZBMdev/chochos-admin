import { CategoryCreateParam, CategoryData } from "./category";

export interface ImageData {
    id: number;
    url: string;
    associate_model_id: number;
    associate_model_name: string;
    updated_on: Date | null;
    created_on: Date | null;
}

export interface ProductImageUpdateParam {
    urls: string[];
}




export interface ProductData {
    // eslint-disable-next-line
    BannerProduct?: any;
    id: number;
    name: string;
    description: string;
    price: number;
    max_price: number;
    discount: number;
    quantity: number;
    colors: string;
    size_variation: string;
    size_metric: string;
    average_rating: number;
    orders: number;
    reviews: number;
    specifications: string;
    tags: string;
    is_published: boolean;
    published_at: Date;
    created_at: Date | null;
    updated_at: Date | null;
    images: Partial<ImageData>[];
    categories: CategoryData[];
}

export interface ProductCreateParam {
    name: string;
    description: string;
    price: number;
    discount: number;
    quantity: number;
    size_variation: string;
    size_metric: string;
    specifications: string;
    tags: string;
    is_published: boolean;
    published_at: Date;
    categories: CategoryCreateParam[];
}

export enum StockStatus {
    INSTOCK = "INSTOCK",
    OUTOFSTOCK = "OUTOFSTOCK",
    LOWSTOCK = "LOWSTOCK"
}
