// import { RoleData } from "./roles";

/* export interface LoginData {
    token: string;
    admin: AdminData;
    message: string;
    devMessage?: string;
} */

export interface AdminData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    /* oldPassword: string;
    login_type: string;
    push_token: string;
    last_login_date: Date;
    activated: boolean;
    role_id: number;
    role: RoleData; */
    updated_at: Date;
    created_at: Date;
}

export interface AdminCreateParam{
    firstName:       string;
    lastName:       string;
    email:           string;
    username:        string;
    password:        string;
}

export interface AdminUpdateParam{
    // id?:            number;
    id:             number;
    firstName:      string;
    lastName:       string;
    email:          string;
    username:       string;
}

export interface AdminLoginParam {
    email: string;
    password: string;
}
export interface AdminInitResetPassParam {
    email: string;
}

export interface AdminResetPassParam {
    email: string;
    new_password: string;
    confirm_password: string;
    otp: string;
}

export interface AdminChangePassword{
    email: string;
    old_password: string;
    new_password: string;
    confirm_password: string;
}


export interface LoginData {
    token: string;
    admin: AdminsData;
    message: string;
    devMessage?: string;
}

export interface RegisterObject{
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
}

export interface LoginObject {
    email: string;
    password: string;
}

export interface ResetPasswordObject {
    email: string;
    password: string;
}

export interface Admins {
    user:  AdminsData;
    token: string;
}

export interface AdminsData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    updated_at: Date;
    created_at: Date;
}

/* export interface AdminsData {
    fullName:           string;
    id:                 number;
    lastName:           string;
    firstName:          string;
    email:              string;
    password:           string;
    oldPassword:        string;
    username:           string;
    userCategory:       number;
    longitude:          number;
    latitude:           number;
    rating:             number;
    totalRatingValue:   number;
    totalRatingCount:   number;
    address:            string;
    mobile:             string;
    isValidated:        null;
    isActive:           boolean;
    push_token:         string;
    photoUrl:           string;
    last_login:         Date;
    updated_on:         Date;
    created_on:         Date;
    deletionDate:       null;
    passwordUpdated_on: Date;
    refreshToken:       null;
    about:              null;
    languages:          string;
    categoryId:         number;
    skills:             any[];
}
*/

