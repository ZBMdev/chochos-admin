import { VendorData, VendorRegisterParams, Languages } from "@/types/vendors";
// import { format } from "timeago.js";
import Model from "./Model";

export default class Vendor extends Model {
    fullName!:         string;
    // id!:               number;
    lastName!:         string;
    firstName!:        string;
    email!:            string;
    username!:         string;
    userCategory!:     number ;
    longitude!:        number ;
    latitude!:         number ;
    rating!:           number;
    totalRatingValue!: number ;
    address!:          string;
    mobile!:           string;
    photoUrl!:         string;
    last_login!:       Date;
    about!:            string;
    languages!:        Languages;
    categoryId!:       number ;

    constructor(data?: Partial<VendorData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    get name() {
        return `${this.firstName} ${this.lastName}`.trim();
    }

    get lastLogin() {
        return this.formatDate(this.last_login)
    }

    toCreateParam(password: string) {
        return {
            email: this.email,
            password: password,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.fullName,
            username: this.username,
            address: this.address
        } as VendorRegisterParams;
    }

}