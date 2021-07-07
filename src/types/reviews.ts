export interface ReviewData {
    ratings: Rating[];
}

export interface Rating {
    id:           number;
    jobId:        number;
    reviewerId:   number;
    targetUserId: number;
    whoRated:     null;
    rating:       number;
    message:      string;
    updatedOn:    Date;
    createdOn:    Date;
    reviewer:     Reviewer;
}

export interface Reviewer {
    fullName:         string;
    id:               number;
    userCategory:     number;
    loginType:        string;
    lastName:         string;
    firstName:        string;
    email:            string;
    username:         string;
    longitude:        number;
    latitude:         number;
    rating:           number;
    totalRatingValue: number;
    totalRatingCount: number;
    address:          string;
    mobile:           string;
    isValidated:      null;
    isActive:         boolean;
    push_token:       string;
    photoUrl:         string;
    last_login:       Date;
    about:            null;
    languages:        null;
    categoryId:       null;
}