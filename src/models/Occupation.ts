import { OccupationCreateParam, OccupationData } from '@/types/occupation'
// eslint-disable-next-line
// @ts-ignore
import { format } from "timeago.js";

export default class Occupation {
    id!:                    number;
    name!:                  string;
    image!:                 string;
    iconName!:              string;
    description!:           string;
    tags!:                  string;
    isActive!:              boolean;
    isFeatured!:            boolean;
    updated_on!:            Date;
    created_on!:            Date;
    deletedAt!:             null;

    constructor(data?: Partial<OccupationData>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    get createdAt() {
        return format(this.created_on);
    }

    get updatedAt() {
        return format(this.updated_on)
    }

    toCreateParam(password: string) {
        return {
            name: this.name,
            description: this.description
        } as OccupationCreateParam;
    }
}