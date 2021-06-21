import { ArtisanData, ArtisanRegisterParams, Languages, UserCategoryRecord, Portfolio } from "@/types/artisan";
// import { format } from "timeago.js";
import Model from "./Model";

export default class Artisan extends Model {
    // fullName!:         string;
    // id!:               number;
    // lastName!:         string;
    // firstName!:        string;
    // email!:            string;
    // username!:         string;
    // userCategory!:     number ;
    // longitude!:        number ;
    // latitude!:         number ;
    // rating!:           number;
    // totalRatingValue!: number ;
    // address!:          string;
    // mobile!:           string;
    // photoUrl!:         string;
    // last_login!:      Date;
    // about!:            string;
    // languages!:        Languages;
    // categoryId!:       number ;

    fullName!:           string;
    id!:                 number;
    userCategory!:       number;
    lastName!:           string;
    firstName!:          string;
    email!:              string;
    username!:           string;
    longitude!:          number;
    latitude!:           number;
    rating!:             number;
    totalRatingValue!:   number;
    address!:            string;
    mobile!:             string;
    photoUrl!:           string;
    last_login!:         Date;
    about!:              string;
    languages!:          null;
    categoryId!:         number;
    userCategoryRecord!: UserCategoryRecord;
    skills!:             any[];
    portfolios!:         Portfolio[];

    constructor(data?: Partial<ArtisanData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
        // if (data && data.portfolios) {
        //     this.portfolios = data.portfolios.map((port) => new Portfolio(port));
        // }else {
        //     this.portfolios = []
        // }
    }

    get name() {
        return `${this.firstName} ${this.lastName}`.trim();
    }

    get aboutArtisan() {
        return this.about;
    }

    /* get last_login_date() {
        return this.toDaysAgo(this.last_login);
    } */

    get lastLogin() {
        return this.formatDate(this.last_login)
    }

    // get jobName() {
    //     return this.userCategoryRecord.occupationName;
    // }

    toCreateParam(password: string) {
        return {
            email: this.email,
            password: password,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.fullName,
            username: this.username,
            address: this.address
        } as ArtisanRegisterParams;
    }

}