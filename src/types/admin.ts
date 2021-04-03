// import { RoleData } from "./roles";

export interface LoginData {
    token: string;
    admin: AdminData;
    message: string;
    devMessage?: string;
}

export interface AdminData {
    id: number;
    name: string;
    email: string;
    username: string;
    login_type: string;
    push_token: string;
    last_login_date: Date;
    activated: boolean;
    role_id: number;
    // role: RoleData;
    updated_at: Date;
    created_at: Date;
}

export interface AdminCreateParam{
    name:            string;
    email:           string;
    username:        string;
    password:        string;
    role_id:        number;
}

export interface AdminUpdateParam{
    id?: number
    activated?: boolean;
    name: string;
    username: string;
    push_token: string;
    role_id?:        number;
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

export interface RegisterObject{
    email:	string;
    password:	string;
    firstName:	string;
    lastName:	string;
    fullName:	string;
    username:	string;
    userCategory:	number;
}

export interface LoginObject {
    email: string;
    password: string;
}

export interface ResetPasswordObject {
    email: string;
    password: string;
}
