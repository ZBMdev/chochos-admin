/* eslint-disable */

import Product from './Product';
import { CreateSkillsParam, SkillsData } from '@/types/skills'
// eslint-disable-next-line
// @ts-ignore
import { format } from "timeago.js";

export default class Skills {
    id!:         number;
    name!:       string;
    updated_on!: Date;
    description!: string;
    created_on!: Date;

    constructor(data?: Partial<SkillsData>) {
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
        } as CreateSkillsParam;
    }
}