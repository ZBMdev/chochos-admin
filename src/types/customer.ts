export interface RegisterObject{
    email:	string;
    password:	string;
    firstName:	string;
    lastName:	string;
    fullName:	string;
    username:	string;
    userCategory:	number;
}

export interface LoginObject {
    email: string;
    password: string;
}

export interface Customer {
    page:       number;
    pageSize:   number;
    items:      CustomerData[];
    totalCount: number;
}

export interface CustomerData {
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
    categoryId:       number ;
}

export enum Languages {
    English = "English",
    Igbo = "Igbo",
}
