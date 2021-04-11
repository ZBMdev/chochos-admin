// import { CategoryCreateParam, CategoryData } from "./category";

export interface ProductData {
    id:                 number;
    name:               string;
    description:        string;
    colour:             string;
    quantity:           number;
    isDeleted:          null;
    brand:              null;
    metricQuantity:     number;
    metric:             string;
    rating:             number;
    unitPrice:          number;
    userId:             number;
    productCategoryId:  number;
    updatedOn:          Date;
    createdOn:          Date;
    productCategory_id: number;
    productImages:      Partial<ProductImage>[];
}

export interface ProductCreateParam {
    name:               string;
    description:        string;
    colour:             string;
    quantity:           number;
    brand:              null;
    metricQuantity:     number;
    metric:             string;
    rating:             number;
    unitPrice:          number;
    updatedOn:          Date;
    createdOn:          Date;
}

export interface UpdateProductParam {
    name:               string;
    description:        string;
    colour:             string;
    quantity:           number;
    brand:              null;
    metricQuantity:     number;
    metric:             string;
    rating:             number;
    unitPrice:          number;
}

export interface ProductImage {
    id:        number;
    url:       string;
    order:     number;
    updatedOn: Date;
    createdOn: Date;
    productId: number;
    deletedAt: null;
}
export interface ProductImageUpdateParam {
    urls: string[];
}

export enum StockStatus {
    INSTOCK = "INSTOCK",
    OUTOFSTOCK = "OUTOFSTOCK",
    LOWSTOCK = "LOWSTOCK"
}
