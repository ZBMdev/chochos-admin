export interface LoginData {
    token:   string;
    admin:   AdminData;
    message: string;
}

export interface AdminData {
    id:              number;
    name:            string;
    email:           string;
    username:        string;
    login_type:      string;
    push_token:      string;
    last_login_date: Date;
    activated:       boolean;
    updated_at:      Date;
    created_at:      Date;
}
export interface AdminCreateParam{
    name:            string;
    email:           string;
    username:        string;
    password:        string;
}

export interface AdminLoginParam{
    email:           string;
    password:        string;
}

export interface AdminImageData {
    id: number;
    url: string;
    associate_model_id: number;
    associate_model_name: string;
    updated_on: Date | null;
    created_on: Date | null;
}






