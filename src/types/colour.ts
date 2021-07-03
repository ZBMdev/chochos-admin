/*
export interface Colour{
    error:      boolean;
    data:       ColourData[];
    message:    string;
    pagination: Pagination;
} */

export interface ColourData {
    name: string;
    hex:  string;
}

export interface NewColourData {
    name: string;
    hex:  string;
}

export interface Pagination {
    nextPage:     Page;
    previousPage: Page;
    currentPage:  number;
    totalCounts:  number;
    totalPages:   number;
}

export interface Page {
}