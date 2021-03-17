import { DeliveryMethodData } from "./delivery-method";
import { PaymentMethodData } from "@/types/payment-method";

export interface OrderData {
    id: number;
    user_id: number;
    order_number: string;
    total_amount: number;
    amount_paid: number;
    sub_total_amount: number;
    status: OrderStatus;
    payment_status: string;
    delivery_fee: number;
    address_id: number;
    payment_method_id: number;
    delivery_method_id: number;
    delivery_date: null;
    created_at: Date;
    updated_at: Date;
    payment_method: PaymentMethodData;
    shipping_address: ShippingAddressData;
    delivery_method: DeliveryMethodData;
    order_items: OrderItemData[];
}

export interface OrderItemData {
    id: number;
    order_id: number;
    product_id: number;
    name: string;
    description: string;
    amount: number;
    quantity: number;
    image_url: string;
    delivery_date: null;
    created_at: Date;
    updated_at: Date;
}

export interface ShippingAddressData {
    id: number;
    user_id: number;
    name: string;
    address: string;
    additional_info: string;
    city: string;
    state: string;
    mobile_number: string;
    house_number: string;
    zip_code: string;
    is_primary_address: boolean;
    created_at: Date;
    updated_at: Date;
}

export enum OrderStatus {
    Pending = "pending",
    Processing = "processing",
    shipped = "shipped",
    Delivered = "delivered",
}

export enum PaymentStatus {
    Pending = "pending",
    Confirming = "confirming",
    Confirmed = "confirmed",
}