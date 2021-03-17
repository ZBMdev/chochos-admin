
export interface APIResponse<T> {
    code: number;
    data: T;
    message: string;
    devMessage: string;
}

export interface PaginatedResponse<T> {
    total: number;
    total_pages: number;
    current_page: number;
    limit: number;
    previous_page: number;
    next_page: number;
    data: T[];
}