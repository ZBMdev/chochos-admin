/* eslint-disable*/
import { UserData, Profile, Colour } from "@/types/users";

import { format } from "timeago.js";
import Model from "./Model";

export default class Users extends Model {
    _id!:       string;
    createdAt!: Date;
    updatedAt!: Date;
    __v!:       number;
    profile!:   Profile;

    constructor(data?: Partial<UserData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    get mainDate() {
        return format(this.createdAt)
    }
    get Username() {
        return this.profile.username
    }

    // get Usernames() {
    //    return this.profile.map((category) => {
    //        return category.name;
    //    }).join(", ")
    // }

    get colour() {
        return `${this.profile.colour}`
    }

    get user() {
        return `${this.profile.user}`
    }
}


/*
import { UserData, Profile, Colour } from "@/types/users";

import Model from "./Model";

export default class Users extends Model {
    _id!:      string;
    username!: string;
    colour!:   Colour;
    user!:     string;

    constructor(data?: Partial<Profile>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }
}
*/