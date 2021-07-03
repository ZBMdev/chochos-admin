import { Portfolio, PortfolioSummary, Row  } from "@/types/portfolio";
// import { format } from "timeago.js";
import Model from "./Model";

export default class PortfolioModel extends Model {
    id!:          number;
    name!:        string;
    url!:         string;
    description!: string;
    user_id!:     number;

    constructor(data?: Partial<Row>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
        
    }

}

