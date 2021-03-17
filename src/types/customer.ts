export interface CustomerData {
    id: number;
    email: null | string;
    user_name: string;
    first_name: string;
    last_name: string;
    login_type: LoginType;
    gender: string;
    address: string;
    push_token: string;
    uuid: string;
    last_login_date: Date;
    disabled: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface CustomerRegisterParams {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    user_name: string;
    gender: string;
    address: string;
    push_token: string;
    last_login_date: Date;
    login_type: LoginType;
}

export enum LoginType {
    FACEBOOK = "facebook",
    GOOGLE = "google",
    EMAIL_N_PASSWORD = "email_and_password",
    TWITTER = "twitter",
    LINKEDLN = "linkedln",
    GITHUB = "github",
    APPLE = "apple",
    ANONYMOUS = "anonymous"
}

export enum CustomerFilter {
    ALL = "All",
    REGISTERED = "Registered Customers",
    ANONYMOUS = "Anonymous Customers",
}