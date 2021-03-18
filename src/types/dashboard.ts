export interface DashboardSummary {
    newOrders:       number;
    sales:           number;
    customers:       number;
    productSold:     number;
    lowStockProduct: number;
    product1:        number;
    product2:        number;
    product3:        number;
}

export interface TimeSummary {
    hourly:         number;
    daily:          number;
    weekly:         number;
    monthly:        number;
}