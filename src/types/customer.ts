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

/*
export interface UserModel{
    jobCompleted: string;
    fullName:	string;
    firstName:	string;
    lastName:	string;
    username: string;
    email: string;
    longitude:	number;
    latitude:	number;
    userCategory: number;
    address:	string;
    mobile:	string;
    photoUrl:	string;
    // about:	string;
    // push_token:	string;
    last_login: Date;
    updated_on: Date;
    created_on: Date;
    id: number;
    rating: number;
}

export interface UserUpdateModel{
    fullName:	string;
    firstName:	string;
    lastName:	string;
    longitude:	number;
    latitude:	number;
    address:	string;
    mobile:	string;
    photoUrl:	string;
    about:	string;
    push_token:	string;
}



export interface VendorModel{
    fullName:	string;
    firstName:	string;
    lastName:	string;
    longitude:	number;
    latitude:	number;
    address:	string;
    mobile:	string;
    photoUrl:	string;
    businessEmail:	string;
    identificationImageUrl:	string;
    PHCNbillImageUrl:	string;
    state:	string;
    city:	string;
    officialPhoneNumber:	string;
    about:	string;
    occupation:	string;
}

export interface ArtisanModel{
    fullName:	string;
    firstName:	string;
    lastName:	string;
    longitude:	number;
    latitude:	number;
    address:	string;
    mobile:	string;
    photoUrl:	string;
    businessEmail:	string;
    identificationImageUrl:	string;
    PHCNbillImageUrl:	string;
    state:	string;
    city:	string;
    officialPhoneNumber:	string;
    about:	string;
    feeRate:	number; // (has an enum)
    fee:	number;
    occupation:	string;
    tools:	string;
}

export interface UserLocationUpdateModel{
    longitude:	number;
    latitude:	number;
}

export interface UserViewModel{
    jobCompleted:	string;
    fullName:	string;
    firstName:	string;
    lastName:	string;
    longitude:	number;
    latitude:	number;
    userCategory:	number;
    address:	string;
    mobile:	string;
    photoUrl:	string;
    username:	string;
    email:	string;
    last_login:	Date;
    updated_on:	Date;
    created_on:	Date;
    id:	number;
    rating:	number;
}

export interface UserCategoryViewModel{
    PHCNbillImageUrl:	number;
    about:	string;
    address:	string;
    businessEmail:	string;
    city:	string;
    created_on:	Date;
    fee:	number;
    feeRate:	string;
    id:	number;
    identificationImageUrl:	string;
    last_login:	Date;
    occupation:	string;
    officialPhoneNumber:	string;
    skills:	string;
    state:	string;
    tools:	string;
    updated_on:	Date;
    userCategory:	number;
    user_id:	number;
    username:	string;
}

export interface UserPortfolioPayload{
    name:	string;
    url:	string;
    user_id:	number;
}

export interface NewUserPortfolioPayload{
    name:	string;
    url:	string;
}

export interface UserSkill{
    id:	number;
    deleteRecord:	boolean;
}

export interface ExtendedUserViewModel{
    occupationCategory:	number;
    jobsCompleted:	number;
    ratings:	number;
    fullName:	string;
    firstName:	string;
    lastName:	string;
    longitude:	number;
    latitude:	number;
    address:	string;
    mobile:	string;
    photoUrl:	string;
    email:	string;
    businessEmail:	string;
    username:	string;
    userCategory:	number;
    categoryId:	number;
    state:	string;
    city:	string;
    officialPhoneNumber:	string;
    phtotoUrl:	string;
    about:	string;
    feeRate:	number; // - (has an enum)
    fee:	number;
    occupation:	string;
    tools:	string;
    portfolios:    string;
    skills: string;
}
*/

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

