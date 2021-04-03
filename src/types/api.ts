export interface APIResponse<T> {
    code: number;
    data: T;
    message: string;
    devMessage: string;
}

export interface PaginatedResponse<T> {
    page:       number;
    pageSize:   number;
    items:      T[];
    totalCount: number;
    limit:         number;
    total:         number;
    total_pages:   number;
    current_page:  number;
    previous_page: number;
    next_page:     number;
}


export interface APIErrorResponse {
    code: number;
    error: Partial<ErrorData>;
    message: string;
    devMessage: string;
    data: null;
}

export interface ErrorData {
    devMessage: string;
    possibleSolution: string;
    exceptionError: string;
    validationError: ValidationError[];
    userMessage: string;
    errorCode: number;
    statusCode: number;
}

export interface ValidationError {
    value: string;
    msg: string;
    param: string;
    location: string;
}
