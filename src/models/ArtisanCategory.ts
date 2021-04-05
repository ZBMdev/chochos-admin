import { ArtisanCategoryData, ArtisanCategoryCreate } from "@/types/artisanCategory";
// import { format } from "timeago.js";
import Model from "./Model";

export default class ArtisanCategoryCategory extends Model {
    id!:          number;
    name!:        string;
    description!: string;
    updated_on!:  Date;
    created_on!:  Date;

    constructor(data?: Partial<ArtisanCategoryData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    get createdAt() {
        return this.formatDate(this.created_on)
    }

    toCreateParam(password: string) {
        return {
            name: this.name,
            description: this.description
        } as ArtisanCategoryCreate;
    }

}