import {  OccupationArtisanData, UserCategoryRecord } from '@/types/occupationArtisan'
// eslint-disable-next-line
// @ts-ignore
import { format } from "timeago.js";

export default class OccupationArtisan {
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
    totalRatingCount!:   number;
    address!:            string;
    mobile!:             string;
    isValidated!:        null;
    isActive!:           boolean;
    push_token!:         null;
    photoUrl!:           string;
    last_login!:         Date;
    about!:              string;
    languages!:          null;
    categoryId!:         number;
    userCategoryRecord!: UserCategoryRecord;
    skills!:             any[];
    portfolios!:         any[];

    constructor(data?: Partial<OccupationArtisanData>) {
        if (data) {
            Object.assign(this, data);
        }
    }

}