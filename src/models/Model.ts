/* eslint-disable */
// @ts-ignore
import { format } from "timeago.js";

export default class Model {
    id!: number;
    created_at!: Date;
    updated_at!: Date;


    get createdAtFormated() {
        return this.toDaysAgo(this.created_at);
    }

    get updatedAtFormated() {
        return this.toDaysAgo(this.updated_at);
    }

    toDaysAgo(dateValue: Date | string) {
        return dateValue ? format(dateValue) : "-";
    }

    formatDate(dateValue: Date) {
        return dateValue ? new Date(dateValue).toDateString() : "-";
    }

    // eslint-disable-next-line
    toCreateParam(param?: any): any {
        return {};
    }

}