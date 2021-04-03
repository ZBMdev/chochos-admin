/* export interface ArtisanData{
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

export interface ArtisanRegisterParams {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    gender: string;
    address: string;
    push_token: string;
    last_login_date: Date;
}

export interface Skill{
    name:	string;
    description:	string;
    id:	number;
}

export interface NewSkill{
    name:	string;
    description:	string;
}

*/

export interface ArtisanRegisterParams {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    username: string;
    address: string;
}
export interface Data {
    page:       number;
    pageSize:   number;
    items:      ArtisanData[];
    totalCount: number;
}

export interface ArtisanData {
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


