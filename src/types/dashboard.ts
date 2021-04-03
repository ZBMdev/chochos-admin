export interface DashboardSummary {
    newOrders:          number;
    transactions:       number;
    customers:          number;
    artisans:           number;
    vendors:            number;
    productSold:        number;
    lowStockProduct:    number;
    ordersCompleted:    number;
    uploadedProducts:   number;
    soldProducts:       number;
    jobs:               number;
    requestedJobs:      number;
    monthlyEarning:     number;
}

export interface TopArtisans {
    name:             string;
    image:            string;
    job:              string;
}

export interface TimeSummary {
    hourly:         number;
    daily:          number;
    weekly:         number;
    monthly:        number;
}