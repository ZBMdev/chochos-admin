/*
export interface Welcome {
    error:      boolean;
    data:       Datum[];
    message:    string;
    pagination: Pagination;
}
*/
export interface UserData {
    _id:       string;
    createdAt: Date;
    updatedAt: Date;
    __v:       number;
    profile:   Profile | null;
}

export interface Profile {
    _id:      string;
    username: string;
    colour:   Colour;
    user:     string;
}

export interface Colour {
    _id:  string;
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
