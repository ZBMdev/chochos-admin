import { OccupationCreateParam, OccupationData } from '@/types/occupation'
// eslint-disable-next-line
// @ts-ignore
import { format } from "timeago.js";

export default class Occupation {
    id!:                    number;
    name!:                  string;
    image!:                 null;
    description!:           string;
    occupationCategory_id!: number;
    updated_on!:            Date;
    created_on!:            Date;

    constructor(data?: Partial<OccupationData>) {
        if (data) {
            Object.assign(this, data);
        }
    }

    get createdAtFormated() {
        return format(this.created_on);
    }

    toCreateParam(password: string) {
        return {
            name: this.name,
            description: this.description
        } as OccupationCreateParam;
    }
}