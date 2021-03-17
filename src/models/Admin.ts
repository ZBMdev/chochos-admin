
// @ts-ignore
import { AdminData, AdminLoginParams, LoginType } from "@/types/admin";
// import { format } from "timeago.js";
import Model from "./Model";

export default class Admin extends Model {
    id!: number;
    email!: null | string;
    user_name!: string;
    first_name!: string;
    last_name!: string;
    login_type!: string;
    gender!: string;
    address!: string;
    push_token!: string;
    uuid!: string;
    last_login_date!: Date;
    disabled!: boolean;
    created_at!: Date;
    updated_at!: Date;

    constructor(data?: Partial<AdminData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    get name() {
        return `${this.first_name} ${this.last_name}`.trim();
    }

    get dateRegistered() {
        return this.formatDate(this.created_at);
    }

    get last_login() {
        return this.toDaysAgo(this.last_login_date);
    }

    toCreateParam(password: string) {
        return {
            email: this.email,
            password: password,
            first_name: this.first_name,
            last_name: this.last_name,
            user_name: this.user_name,
            gender: this.gender,
            address: this.address,
            push_token: this.push_token,
            last_login_date: this.last_login_date,
            login_type: this.login_type,
        } as AdminLoginParams;
    }

}