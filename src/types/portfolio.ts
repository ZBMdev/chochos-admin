export interface PortfolioSummary {
    page:       number;
    pageSize:   number;
    items:      Portfolio;
    totalCount: number;
}

export interface Portfolio {
    count: number;
    rows:  Row[];
}

export interface Row {
    id:          number;
    name:        string;
    url:         string;
    description: string;
    user_id:     number;
}