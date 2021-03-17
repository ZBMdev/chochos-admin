export interface DeliveryMethodData {
    id: number;
    name: string;
    description: string;
    activated: boolean;
    amount: number;
    created_at: Date;
    updated_at: Date;
}

export interface DeliveryMethodCreateParam {
    name: string;
    description: string;
    activated: boolean;
    amount: number;
}
