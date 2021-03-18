import { DeliveryMethodData } from "./delivery-method";
import { PaymentMethodData } from "@/types/payment-method";
import { CustomerData } from "./customer";

export interface OrderData {
    id: number;
    user_id: number;
    // order_number: string;
    orderNumber: string;
    reference: string;
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
    user: CustomerData;
    shipping_address: ShippingAddressData;
    payment_method: PaymentMethodData;
    delivery_method: DeliveryMethodData;
    order_items: OrderItemData[];
    status_histories: StatusHistoryData[];
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


export interface StatusHistoryData {
    id: number;
    order_id: number;
    from_status: string;
    to_status: string;
    comment: string;
    updated_by: number;
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

export interface OrderUpdateParam {
    updated_by: number;
    status: string;
    comment: string;
}

export enum OrderStatus {
    Pending = "pending",
    Processing = "processing",
    Shipped = "shipped",
    Delivered = "delivered",
    Declined = "declined",
}

export const statusDecorations = {
    [OrderStatus.Pending]: {
        colors: {
            light: "#ffcdd2",
            dark: "#c63737",
        },
        icon: "pi pi-ellipsis-h"
    },
    [OrderStatus.Processing]: {
        colors: {
            light: "#feedaf",
            dark: "#8a5340",
        },
        icon: "pi pi-cog"
    },
    [OrderStatus.Shipped]: {
        colors: {
            light: "#dbe6c8",
            dark: "#446025",
        },
        icon: "pi pi-send"
    },
    [OrderStatus.Delivered]: {
        colors: {
            light: "#c8e6c9",
            dark: "#256029",
        },
        icon: "pi pi-check"
    },
    [OrderStatus.Declined]: {
        colors: {
            light: "#bababa",
            dark: "#3c3c3c",
        },
        icon: "pi pi-times"
    },
}

export enum PaymentStatus {
    Pending = "pending",
    Confirming = "confirming",
    Confirmed = "confirmed",
}
