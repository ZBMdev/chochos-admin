import Product from "@/models/Product";
import { ProductData } from "./product";

export interface BannerData {
    id: number;
    name: string;
    description: string;
    image_url: string;
    order: number;
    activated: boolean;
    products: ProductData[];
    created_at: Date;
    updated_at: Date;
}
export interface BannerCreateParam {
    name: string;
    image_url: string;
    description: string;
    order: number;
    activated: boolean;
    products: (ProductData | Product)[];
}