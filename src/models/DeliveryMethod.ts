/* eslint-disable*/
import { DeliveryMethodData, DeliveryMethodCreateParam } from "@/types/delivery-method";
// import { format } from "timeago.js";
import Model from "./Model";

export default class DeliveryMethod extends Model {
    id!: number;
    name = "";
    description = "";
    amount = 0;
    activated = true;
    created_at!: Date;
    updated_at!: Date;

    constructor(data?: Partial<DeliveryMethodData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    toCreateParam() {
        return {
            name: this.name,
            description: this.description,
            amount: this.amount,
            activated: this.activated,
        } as DeliveryMethodCreateParam;
    }

}