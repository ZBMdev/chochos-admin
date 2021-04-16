export interface CustomerSummary{
    page:       number;
    pageSize:   number;
    items:      CustomerData[];
    totalCount: number;
}

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

export interface UserCategoryData {
    id:                       number;
    tools:                    PhcNbillImageURL;
    occupation:               string;
    occupationCategory_id:    number;
    feeRate:                  number;
    fee:                      number;
    jobsCompleted:            number;
    businessEmail:            PhcNbillImageURL;
    address:                  string;
    state:                    PhcNbillImageURL;
    city:                     PhcNbillImageURL;
    about:                    string;
    identificationImageUrl:   PhcNbillImageURL;
    PHCNbillImageUrl:         PhcNbillImageURL;
    officialPhoneNumber:      number;
    userCategory:             number;
    updated_on:               Date;
    created_on:               Date;
    isValidated:              boolean;
    isActive:                 boolean;
    isPHCNBillVerified:       boolean;
    isIdentificationVerified: boolean;
    user_id:                  number;
}

export enum PhcNbillImageURL {
    Hammer = "Hammer",
    String = "string",
}


export interface UserCategoryCreate{
    occupation:               string;
    address:                  string;
    state:                    PhcNbillImageURL;
    city:                     PhcNbillImageURL;
    about:                    string;
    officialPhoneNumber:      number;
}

export enum usersType {
    Customer= "Customer",
    Artisan = "Artisan",
    Vendor = "Vendor"
}
