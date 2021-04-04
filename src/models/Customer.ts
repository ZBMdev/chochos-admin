import { CustomerData, RegisterObject, Languages } from "@/types/customer";
// import { format } from "timeago.js";
import Model from "./Model";

export default class Customer extends Model {
    fullName!:         string;
    id!:               number;
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
    last_login!:      string;
    about!:            string;
    languages!:        Languages;
    categoryId!:       number ;

    constructor(data?: Partial<CustomerData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    get name() {
        return `${this.firstName} ${this.lastName}`.trim();
    }

    get userName() {
        return this.username;
    }

    get userEmail() {
        return this.email;
    }

    get houseAddress() {
        return this.address;
    }

    get userLanguages() {
        return this.languages;
    }

    get last_login_date() {
        return this.toDaysAgo(this.last_login);
    }

    toCreateParam(password: string) {
        return {
            email: this.email,
            password: password,
            firstName: this.firstName,
            lastName: this.lastName,
            fullName: this.fullName,
            username: this.username,
            userCategory: this.userCategory,
        } as RegisterObject;
    }

}