export interface ArtisanSummary{
    page:       number;
    pageSize:   number;
    items:      ArtisanData[];
    totalCount: number;
}

export interface ArtisanRegisterParams {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    address: string;
    userCategory: number;


    // email:                  string;
    // password:               string;
    // firstName:              string;
    // lastName:               string;
    // username:               string;
    // address:                string;
    // userCategory:           number;
    // categoryId?:            number;
    // fullName?:              string;
    // name?:                  string;
    // id?:                    number;
    // longitude?:             number ;
    // latitude?:              number ;
    // rating?:                number;
    // totalRatingValue?:      number ;
    // mobile?:                string;
    // photoUrl?:              string;
    // last_login?:            Date;
    // lastLogin?:             Date;
    // created_at?:            Date;
    // updated_at?:            Date;
    // createdAtFormatted?:    Date;
    // updatedAtFormatted?:    Date;
    // about?:                 string;
    // languages?:             Languages;

}

export interface ArtisanData{
    fullName:           string;
    id:                 number;
    userCategory:       number;
    lastName:           string;
    firstName:          string;
    email:              string;
    username:           string;
    longitude:          number;
    latitude:           number;
    rating:             number;
    totalRatingValue:   number;
    address:            string;
    mobile:             string;
    photoUrl:           string;
    last_login:         Date;
    about:              string;
    languages:          null;
    categoryId:         number;
    userCategoryRecord: UserCategoryRecord;
    skills:             any[];
    portfolios:         Portfolio[];
}

export interface Portfolio {
    id:          number;
    name:        string;
    url:         string;
    description: string;
    user_id:     number;
}

export interface UserCategoryRecord {
    id:                    number;
    userId:                number;
    occupationId:          number;
    occupationName:        string;
    feeRate:               number;
    fee:                   number;
    jobsCompleted:         number;
    businessEmail:         null;
    address:               string;
    state:                 null;
    city:                  null;
    about:                 string;
    idImageUrl:            null;
    utilityBillImageUrl:   null;
    officialPhoneNumber:   null;
    userCategory:          number;
    isValidated:           null;
    isActive:              null;
    isUtilityBillVerified: null;
    isIdVerified:          null;
    tools:                 null;
    updated_on:            Date;
    created_on:            Date;
    deletedAt:             null;
}

export enum Languages {
    English = "English",
    Igbo = "Igbo",
}

export interface ArtisanCategoryData {
    id:          number;
    name:        string;
    description: string;
    updated_on:  Date;
    created_on:  Date;
}

export interface ArtisanCategoryCreate {
    name:        string;
    description: string;
}

