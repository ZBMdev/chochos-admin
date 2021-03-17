/* eslint-disable*/
import { PaymentMethodData, PaymentMethodCreateParam } from "@/types/payment-method";
// import { format } from "timeago.js";
import Model from "./Model";

export default class PaymentMethod extends Model {
    id!: number;
    name = "";
    description = "";
    image_url = "";
    activated = true;
    created_at!: Date;
    updated_at!: Date;

    constructor(data?: Partial<PaymentMethodData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    toCreateParam() {
        return {
            name: this.name,
            description: this.description,
            image_url: this.image_url,
            activated: this.activated,
        } as PaymentMethodCreateParam;
    }

}