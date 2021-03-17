/* eslint-disable */

import { AnalyticsSummary, TimeSummary } from '@/types/analytics'
import Model from './Model';

export default class Analytics extends Model {
    name!:           string;
    quantity!:        number;
    totalSales!:     number;
    hourly!:         Date;
    daily!:          Date;
    weekly!:         Date;
    monthly!:        Date;

    constructor(data?: Partial<AnalyticsSummary>) {
        super();
        if (data) {
            Object.assign(this, data);
        }
    }


    toCreateParam() {
        return {
            name: this.name,
            totalSales: this.totalSales,
            quantity: this.quantity
        } as AnalyticsSummary;
    }
      
}
