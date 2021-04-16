import { UserCategoryData, UserCategoryCreate, PhcNbillImageURL, usersType } from "@/types/customer";
// import { format } from "timeago.js";
import Model from "./Model";

export default class UserCategory extends Model {
    id!:                       number;
    tools!:                    PhcNbillImageURL;
    occupation!:               string;
    occupationCategory_id!:    number;
    feeRate!:                  number;
    fee!:                      number;
    jobsCompleted!:            number;
    businessEmail!:            PhcNbillImageURL;
    address!:                  string;
    state!:                    PhcNbillImageURL;
    city!:                     PhcNbillImageURL;
    about!:                    string;
    identificationImageUrl!:   PhcNbillImageURL;
    PHCNbillImageUrl!:         PhcNbillImageURL;
    officialPhoneNumber!:      number;
    userCategory!:             number;
    updated_on!:               Date;
    created_on!:               Date;
    isValidated!:              boolean;
    isActive!:                 boolean;
    isPHCNBillVerified!:       boolean;
    isIdentificationVerified!: boolean;
    user_id!:                  number;

    constructor(data?: Partial<UserCategoryData>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    get createdAt() {
        return this.formatDate(this.created_on)
    }

    get userType() {
        return (this.userCategory === 0) ? usersType.Customer : (this.userCategory === 1) ? usersType.Artisan : usersType.Vendor;
    }

    toCreateParam(password: string) {
        return {
            occupation: this.occupation,
            address: this.address,
            state: this.state,
            city: this.city,
            about: this.about,
            officialPhoneNumber: this.officialPhoneNumber
        } as UserCategoryCreate;
    }

}