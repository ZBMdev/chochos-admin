/* eslint-disable*/
import { DeliveryMethodData } from "@/types/delivery-method";
import { PaymentMethodData } from "@/types/payment-method";
import { OrderData, OrderItemData, ShippingAddressData } from "@/types/orders";
// import { format } from "timeago.js";
import Model from "./Model";
import CustomerService from "@/services/CustomerService";
import Customer from "./Customer";

export default class Order extends Model {
    id!: number;
    user_id!: number;
    order_number!: string;
    total_amount!: number;
    amount_paid!: number;
    sub_total_amount!: number;
    status!: string;
    payment_status!: string;
    delivery_fee!: number;
    address_id!: number;
    payment_method_id!: number;
    delivery_method_id!: number;
    delivery_date!: null;
    created_at!: Date;
    updated_at!: Date;
    payment_method!: PaymentMethodData;
    shipping_address!: ShippingAddressData;
    delivery_method!: DeliveryMethodData;
    order_items!: OrderItemData[];
    user!: Customer;

    constructor(data?: Partial<OrderData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }


    get createdAt() {
        return this.formatDate(this.created_at)
    }

    get total() {
        return this.total_amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' });
    }

    /*
    toCreateParam() {
        return {
            name: this.name,
            description: this.description,
            amount: this.amount,
            activated: this.activated,
        } as OrderCreateParam;
    }
    */

}