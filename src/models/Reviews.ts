import { ReviewData, Rating, Reviewer } from "@/types/reviews";
import { format } from "timeago.js";
// import { format } from "timeago.js";
import Model from "./Model";

export default class Reviews extends Model {
    id!:           number;
    jobId!:        number;
    reviewerId!:   number;
    targetUserId!: number;
    whoRated!:     null;
    rating!:       number;
    message!:      string;
    updatedOn!:    Date;
    createdOn!:    Date;
    reviewer!:     Reviewer;

    constructor(data?: Partial<Rating>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }

    get createdAt() {
        return this.formatDate(this.createdOn);
    }

}