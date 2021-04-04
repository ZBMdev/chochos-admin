// import { ProductData } from "./product";

export interface CategoryData {
    id:         number;
    name:       string;
    updated_on: Date;
    created_on: Date;
    /* sub_categories: CategoryData[]
    ProductCategory: ProductCategory;
    products?: ProductData[]; */
}

export interface CategoryCreateParam {
    id: number;
    name: string;
}


export interface ProductCategory {
    id: number;
    product_id: number;
    category_id: number;
    // product?: ProductData;
    category?: CategoryData;
    created_at: Date | null;
    updated_at: Date | null;
}

export interface TreeNode {
    key: number,
    label: string,
    data: unknown,
    children: TreeNode[],
}

export interface SelectedCheckbox extends Record<number, { checked: boolean }> {

}