
export interface OccupationArtisan {
    items: OccupationArtisanData[];
}

export interface OccupationArtisanData {
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
    totalRatingCount:   number;
    address:            string;
    mobile:             string;
    isValidated:        null;
    isActive:           boolean;
    push_token:         null;
    photoUrl:           string;
    last_login:         Date;
    about:              string;
    languages:          null;
    categoryId:         number;
    userCategoryRecord: UserCategoryRecord;
    skills:             any[];
    portfolios:         any[];
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
