
export interface VendorRegisterParams {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    address: string;
    userCategory: number;
    categoryId?:       number;
    fullName?:         string;
    name?:  string;
    id?:               number;
    longitude?:        number ;
    latitude?:         number ;
    rating?:           number;
    totalRatingValue?: number ;
    mobile?:           string;
    photoUrl?:         string;
    last_login?:        Date;
    lastLogin?:        Date;
    created_at?:        Date;
    updated_at?:        Date;
    createdAtFormatted?: Date;
    updatedAtFormatted?: Date;
    about?:            string;
    languages?:        Languages;

}
export interface Data {
    page:       number;
    pageSize:   number;
    items:      VendorData[];
    totalCount: number;
}

export interface VendorSummary{
    page:       number;
    pageSize:   number;
    items:      VendorData[];
    totalCount: number;
}

export interface VendorData {
    fullName:         string;
    id:               number;
    lastName:         string;
    firstName:        string;
    email:            string;
    username:         string;
    userCategory:     number ;
    longitude:        number ;
    latitude:         number ;
    rating:           number;
    totalRatingValue: number ;
    address:          string;
    mobile:           string;
    photoUrl:         string;
    last_login:      string;
    about:            string;
    languages:        Languages;
    categoryId:       number;
}

export enum Languages {
    English = "English",
    Igbo = "Igbo",
}
