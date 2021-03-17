/* eslint-disable */

import Product from './Product';
import { CategoryCreateParam, CategoryData, ProductCategory, SelectedCheckbox, TreeNode } from '@/types/category'
// eslint-disable-next-line
// @ts-ignore
import { format } from "timeago.js";

export default class Category {
    id!: number;
    name: string = "";
    description: string = "";
    parent_id!: number;
    tags: string = "";
    image_url: string = "";
    is_featured!: boolean;
    is_activated!: boolean;
    created_at!: Date;
    updated_at!: Date;
    sub_categories!: Category[]
    ProductCategory!: ProductCategory;
    products!: Product[]

    constructor(data?: Partial<CategoryData>) {
        if (data) {
            Object.assign(this, data);
        }
        if (data && data.sub_categories) {
            this.sub_categories = data.sub_categories.map((cat) => new Category(cat));
        } else {
            this.sub_categories = []
        }
        if (data && data.products) {
            this.products = data.products.map((cat) => new Product(cat));
        } else {
            this.products = []
        }
    }

    get imageURL() {
        return this.image_url ?? "data:image/png;base64,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OVrl52vPuO7hTxGjcrp+ZcmAP/8Jf74b8zHxw7VnnNLh+2vPOObEv96N+d8SKVhUrjc9Y5+t8stNz9hli8rl2jOuXbbKT9eecTfmr2M+EH689oxzusqP155xSofvrz3j+Dl8oKi86RmHdGP+pq59tqhcburaZRvz83VyYM2Lv9yJ+YhjfrxODszpKj9cJwemLltUDtfJgTFd5W8mB/ocY/7y8edp4dM9fLzKrzeF7bLhbxJmTYe/SZh/dtly/gb/9y5bVA7dp1/xhk2fD385gg835tcu8bBJjZ8z46fuwJh/TYgPV/mhSxyVfebK913enH8kKcNVfnk+fJCofCQpw435sUsclWPmMd9nxneZx3yXuPJLlzgq58yVn1OO+cuBpIxW+QG+Eb5LnPNrlzgqj+JDVH7Oib883s1HG/NT5mEzZMb3T4QPNVf5YFLGqvzSJY7KJXPlH0zKWDk/Zq58anzfJe4qu8xjvksclUuXeMynxs+Zx/z8nMPmVeWfc8xfni5t4FulzV8j50Xlk/Y2F72NYeMilWuu0rBJE5V6G2njA7jPsM8XlS5Sxrzexgdwvc1fu6v0AVzOP1tU6m3MVRo28NF7G12lD+B6G8PGRcpc5f8Zf+wVZ2NjTvwZHv5X419VXlSqPDy8qIQXlfDwohJeVMLDi0rDJhy+b49/r8K/ZsY3rvzb4R/vmlZ+rfr1awD8qep9a4zvjv/uAPiqV2r8G/zhsIPPiX9vh+/hG+GHavwZvhH+0g4/ZsZP1fgP+EOvudb+khl/aohfMuOre+LXzPi3hviP1Pi+YV9WjR8atjbV+LFhd1CNnxpeYKvxc8MLbDV+aRjz1fiPhklZj+/bJWU9fmgXNvX4qV3Y1OOXZj3lF+A/2v29fgF+aNUcfAV+bnWJ+gr8R6ug/BL8t6P2v320x7d7wcPDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDw8PDwz8X/n+WXGil7JVbGAAAAABJRU5ErkJggg==";
    }

    get tagList() {
        if (!!!this.tags) return [];
        return this.tags.trim().split(",")
        // .map((t) => t.trim());
    }
    set tagList(tags: string[]) {
        this.tags = tags.join(",")
    }

    get createdAtFormated() {
        return format(this.created_at);
    }

    get updatedAtFormated() {
        return format(this.updated_at);
    }

    toCreateParam() {
        let param = {
            name: this.name,
            description: this.description,
            tags: this.tags,
            image_url: this.image_url,
            is_featured: this.is_featured ? true : false,
            is_activated: this.is_activated ? true : false,
        } as CategoryCreateParam;
        if (this.parent_id) {
            param = {
                ...param, parent_id: this.parent_id,
            };
        }
        return param;
    }

    toTreeNode(): TreeNode {
        return {
            key: this.id,
            label: this.name,
            data: this,
            children: this.sub_categories.map((cat) => cat.toTreeNode()),
        } as TreeNode;
    }

    static toSelectedKeys(nodes: TreeNode[]): SelectedCheckbox {
        let keys: SelectedCheckbox = {}
        nodes.forEach((node) => {
            keys = { ...keys, [node.key]: { checked: true } };
        })
        return keys;
    }

    static fromSelectedKeys(selected: SelectedCheckbox, nodes: TreeNode[]): Category[] {
        let keys: number[] = Object.keys(selected).map((key) => Number(key));
        let selectedCategories = nodes.filter((node) => keys.includes(node.key))
            .map((node) => node.data as Category);
        return selectedCategories;
    }

}