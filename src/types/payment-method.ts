export interface PaymentMethodData {
    id: number;
    name: string;
    description: string;
    image_url: string;
    activated: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface PaymentMethodCreateParam {
    name: string;
    description: string;
    image_url: string;
    activated: boolean;
}
